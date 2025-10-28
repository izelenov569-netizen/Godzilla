"""Telegram bot that tracks table tennis betting markets.

The bot is built on the python-telegram-bot v20 API and persists its state in
``data/cup_state.json``.  It allows an organiser to publish upcoming table
tennis matches, configure decimal odds, accept bets from participants and then
settle those bets once the results are known.

Usage
-----
1. Install dependencies::

       pip install python-telegram-bot==20.6

2. Export your bot token::

       export TELEGRAM_BOT_TOKEN=123456:ABC...

3. Run the bot::

       python table_tennis_bot.py

Command summary
---------------
* /start – greeting and short help.
* /help – detailed instructions.
* /addmatch <игрок1> vs <игрок2> – создать новую линию ставок.
* /setodds <id> <коэф1> <коэф2> – задать коэффициенты для матча.
* /listmatches – показать все матчи и их статус.
* /bet <id> <игрок> <сумма> – сделать ставку на конкретного игрока.
* /mybets – показать ставки текущего пользователя.
* /result <id> <победитель> – завершить матч и рассчитать выплаты.
"""

from __future__ import annotations

import json
import logging
import os
import re
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional

from telegram import Update # type: ignore
from telegram.ext import (Application, CommandHandler, ContextTypes, # pyright: ignore[reportMissingImports]
                          MessageHandler, filters)


DATA_DIR = Path("data")
STATE_FILE = DATA_DIR / "cup_state.json"


def ensure_data_dir() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)


def load_state() -> Dict:
    if STATE_FILE.exists():
        with STATE_FILE.open("r", encoding="utf-8") as fh:
            return json.load(fh)
    return {
        "matches": [],
        "bets": [],
        "next_match_id": 1,
    }


def save_state(state: Dict) -> None:
    ensure_data_dir()
    with STATE_FILE.open("w", encoding="utf-8") as fh:
        json.dump(state, fh, ensure_ascii=False, indent=2)


@dataclass
class Match:
    match_id: int
    player1: str
    player2: str
    odds_player1: float = 1.9
    odds_player2: float = 1.9
    status: str = "open"
    winner: Optional[str] = None

    def to_dict(self) -> Dict:
        return {
            "id": self.match_id,
            "player1": self.player1,
            "player2": self.player2,
            "odds": {
                "player1": self.odds_player1,
                "player2": self.odds_player2,
            },
            "status": self.status,
            "winner": self.winner,
        }


@dataclass
class Bet:
    match_id: int
    user_id: int
    username: str
    selection: str
    amount: float
    odds: float
    status: str = "pending"
    payout: Optional[float] = None
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self) -> Dict:
        return {
            "match_id": self.match_id,
            "user_id": self.user_id,
            "username": self.username,
            "selection": self.selection,
            "amount": self.amount,
            "odds": self.odds,
            "status": self.status,
            "payout": self.payout,
            "created_at": self.created_at,
        }


@dataclass
class BettingManager:
    state: Dict = field(default_factory=load_state)

    @property
    def matches(self) -> List[Dict]:
        return self.state.setdefault("matches", [])

    @property
    def bets(self) -> List[Dict]:
        return self.state.setdefault("bets", [])

    # --- persistence -----------------------------------------------------------
    def save(self) -> None:
        save_state(self.state)

    # --- match management ------------------------------------------------------
    def add_match(self, player1: str, player2: str) -> str:
        player1 = player1.strip()
        player2 = player2.strip()
        if not player1 or not player2:
            return "Имена игроков не должны быть пустыми."

        match = Match(match_id=self._next_match_id(), player1=player1, player2=player2)
        self.matches.append(match.to_dict())
        self.save()
        return (
            f"Добавлен матч #{match.match_id}: {player1} vs {player2}."
            " Коэффициенты по умолчанию 1.90 / 1.90."
        )

    def list_matches(self) -> str:
        if not self.matches:
            return "Пока нет активных матчей."

        lines = []
        for match in self.matches:
            odds = match.get("odds", {})
            lines.append(
                "#%(id)s %(player1)s vs %(player2)s — статус: %(status)s, "
                "коэффициенты: %(p1).2f / %(p2).2f" % {
                    "id": match.get("id"),
                    "player1": match.get("player1"),
                    "player2": match.get("player2"),
                    "status": match.get("status", "unknown"),
                    "p1": odds.get("player1", 0.0),
                    "p2": odds.get("player2", 0.0),
                }
            )
            if match.get("winner"):
                lines.append(f"    Победитель: {match['winner']}")
        return "\n".join(lines)

    def set_odds(self, match_id: int, odds1: float, odds2: float) -> str:
        match = self._find_match(match_id)
        if not match:
            return "Матч с таким номером не найден."
        if match.get("status") == "finished":
            return "Для завершённого матча нельзя менять коэффициенты."
        if odds1 <= 1.0 or odds2 <= 1.0:
            return "Коэффициенты должны быть больше 1.0."

        match.setdefault("odds", {})["player1"] = round(odds1, 2)
        match.setdefault("odds", {})["player2"] = round(odds2, 2)
        self.save()
        return (
            f"Коэффициенты для матча #{match_id} обновлены: "
            f"{match['player1']} {odds1:.2f}, {match['player2']} {odds2:.2f}."
        )

    # --- betting ---------------------------------------------------------------
    def place_bet(self, *,
                  match_id: int,
                  selection: str,
                  amount: float,
                  user_id: int,
                  username: str) -> str:
        match = self._find_match(match_id)
        if not match:
            return "Матч с таким номером не найден."
        if match.get("status") != "open":
            return "На этот матч нельзя сделать ставку."
        if amount <= 0:
            return "Сумма ставки должна быть положительной."

        normalized_selection = selection.strip().lower()
        players = {
            match["player1"].lower(): match["player1"],
            match["player2"].lower(): match["player2"],
        }
        if normalized_selection not in players:
            return "Ставку можно сделать только на одного из игроков матча."

        player_key = (
            "player1" if players[normalized_selection] == match["player1"] else "player2"
        )
        odds = match.setdefault("odds", {}).get(player_key)
        if odds is None:
            return "Для выбранного игрока ещё не заданы коэффициенты."

        bet = Bet(
            match_id=match_id,
            user_id=user_id,
            username=username,
            selection=players[normalized_selection],
            amount=round(amount, 2),
            odds=float(odds),
        )
        self.bets.append(bet.to_dict())
        self.save()
        return (
            f"Ставка принята: {bet.selection} с коэффициентом {bet.odds:.2f}."
            f" Потенциальная выплата: {bet.amount * bet.odds:.2f}."
        )

    def list_user_bets(self, user_id: int) -> str:
        user_bets = [bet for bet in self.bets if bet.get("user_id") == user_id]
        if not user_bets:
            return "У вас пока нет ставок."

        lines = []
        for bet in user_bets:
            status = bet.get("status", "pending")
            payout = bet.get("payout")
            lines.append(
                "Матч #%(match_id)s — %(selection)s, сумма %(amount).2f, "
                "коэф %(odds).2f, статус %(status)s" % {
                    "match_id": bet.get("match_id"),
                    "selection": bet.get("selection"),
                    "amount": bet.get("amount", 0.0),
                    "odds": bet.get("odds", 0.0),
                    "status": status,
                }
            )
            if payout is not None:
                lines.append(f"    Выплата: {payout:.2f}")
        return "\n".join(lines)

    def record_result(self, match_id: int, winner: str) -> str:
        match = self._find_match(match_id)
        if not match:
            return "Матч с таким номером не найден."
        if match.get("status") == "finished":
            return "Результат матча уже зафиксирован."

        normalized_winner = winner.strip().lower()
        if normalized_winner not in {
            match["player1"].lower(),
            match["player2"].lower(),
        }:
            return "Победитель должен быть одним из игроков матча."

        canonical_winner = (
            match["player1"] if normalized_winner == match["player1"].lower() else match["player2"]
        )
        match["winner"] = canonical_winner
        match["status"] = "finished"

        settled = []
        for bet in self.bets:
            if bet.get("match_id") != match_id:
                continue
            if bet.get("selection") == canonical_winner:
                payout = round(bet.get("amount", 0.0) * bet.get("odds", 0.0), 2)
                bet["status"] = "won"
                bet["payout"] = payout
                settled.append(f"Победитель {bet['username']}: выплата {payout:.2f}")
            else:
                bet["status"] = "lost"
                bet["payout"] = 0.0
                settled.append(f"Ставка {bet['username']} проиграла.")

        self.save()

        summary = [
            f"Матч #{match_id} завершён. Победитель: {canonical_winner}.",
        ]
        if settled:
            summary.extend(settled)
        else:
            summary.append("На этот матч не было ставок.")
        return "\n".join(summary)

    # --- helpers ----------------------------------------------------------------
    def _next_match_id(self) -> int:
        next_id = self.state.get("next_match_id", 1)
        self.state["next_match_id"] = next_id + 1
        return next_id

    def _find_match(self, match_id: int) -> Optional[Dict]:
        for match in self.matches:
            if match.get("id") == match_id:
                return match
        return None


manager = BettingManager()


async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    greeting = [
        "Привет! Я бот для ставок на матчи по настольному теннису.",
        "Используйте /help, чтобы узнать доступные команды.",
    ]
    await update.message.reply_text("\n".join(greeting))


async def cmd_help(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "Доступные команды:\n"
        "/addmatch <игрок1> vs <игрок2> — создать матч для ставок.\n"
        "/setodds <id> <коэф1> <коэф2> — обновить коэффициенты.\n"
        "/listmatches — показать список матчей и их статус.\n"
        "/bet <id> <игрок> <сумма> — сделать ставку.\n"
        "/mybets — посмотреть свои ставки.\n"
        "/result <id> <победитель> — завершить матч и рассчитать выплаты."
    )
    await update.message.reply_text(text)


async def cmd_addmatch(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not context.args:
        await update.message.reply_text(
            "Использование: /addmatch Игрок1 vs Игрок2"
        )
        return

    joined = " ".join(context.args)
    parts = re.split(r"\s+vs\s+", joined, flags=re.IGNORECASE)
    if len(parts) != 2:
        await update.message.reply_text(
            "Не удалось распознать игроков. Используйте формат 'Игрок1 vs Игрок2'."
        )
        return

    player1, player2 = parts
    message = manager.add_match(player1, player2)
    await update.message.reply_text(message)


async def cmd_setodds(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if len(context.args) != 3:
        await update.message.reply_text(
            "Использование: /setodds <id> <коэф игрока1> <коэф игрока2>"
        )
        return

    match_id_str, odds1_str, odds2_str = context.args
    try:
        match_id = int(match_id_str)
        odds1 = float(odds1_str.replace(",", "."))
        odds2 = float(odds2_str.replace(",", "."))
    except ValueError:
        await update.message.reply_text("Не удалось распознать числа. Проверьте ввод.")
        return

    message = manager.set_odds(match_id, odds1, odds2)
    await update.message.reply_text(message)


async def cmd_listmatches(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(manager.list_matches())


async def cmd_bet(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if len(context.args) < 3:
        await update.message.reply_text(
            "Использование: /bet <id> <игрок> <сумма>"
        )
        return

    match_id_str, selection, *amount_parts = context.args
    try:
        match_id = int(match_id_str)
    except ValueError:
        await update.message.reply_text("Номер матча должен быть числом.")
        return

    amount_str = " ".join(amount_parts).replace(",", ".")
    try:
        amount = float(amount_str)
    except ValueError:
        await update.message.reply_text("Сумма ставки должна быть числом.")
        return

    user = update.effective_user
    username = user.username or user.full_name or "unknown"
    message = manager.place_bet(
        match_id=match_id,
        selection=selection,
        amount=amount,
        user_id=user.id,
        username=username,
    )
    await update.message.reply_text(message)


async def cmd_mybets(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = update.effective_user.id
    await update.message.reply_text(manager.list_user_bets(user_id))


async def cmd_result(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if len(context.args) < 2:
        await update.message.reply_text(
            "Использование: /result <id> <победитель>"
        )
        return

    match_id_str, *winner_parts = context.args
    try:
        match_id = int(match_id_str)
    except ValueError:
        await update.message.reply_text("Номер матча должен быть числом.")
        return

    winner = " ".join(winner_parts)
    message = manager.record_result(match_id, winner)
    await update.message.reply_text(message)


async def fallback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Не понимаю сообщение. Используйте /help, чтобы увидеть команды."
    )


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(message)s")
    token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not token:
        raise RuntimeError(
            "Переменная окружения TELEGRAM_BOT_TOKEN не задана."
        )

    application = Application.builder().token(token).build()

    application.add_handler(CommandHandler("start", cmd_start))
    application.add_handler(CommandHandler("help", cmd_help))
    application.add_handler(CommandHandler("addmatch", cmd_addmatch))
    application.add_handler(CommandHandler("setodds", cmd_setodds))
    application.add_handler(CommandHandler("listmatches", cmd_listmatches))
    application.add_handler(CommandHandler("bet", cmd_bet))
    application.add_handler(CommandHandler("mybets", cmd_mybets))
    application.add_handler(CommandHandler("result", cmd_result))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, fallback))

    application.run_polling()


if __name__ == "__main__":
    main()

