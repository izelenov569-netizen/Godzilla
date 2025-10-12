"""Telegram bot for managing a table tennis cup bracket.

The bot is built on top of the python-telegram-bot v20 API and keeps all
state inside a JSON file.  The design focuses on running a single cup at a
time and guiding the organiser through registration, bracket creation and
score reporting.

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
* /start – greeting and current cup status.
* /help – detailed instructions.
* /newcup <name> – reset state and start a new cup registration.
* /addplayer <name> – register a participant.
* /listplayers – list the current player pool.
* /startcup – lock registration and generate the opening bracket.
* /bracket – show the current round matches and results.
* /result <match_id> <winner> <score> – report a finished match.

All state is persisted in ``data/cup_state.json`` so the bot can be stopped
and resumed without data loss.
"""

from __future__ import annotations

import json
import logging
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional

from telegram import Update
from telegram.ext import (Application, CommandHandler, ContextTypes,
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
        "cup": {
            "name": None,
            "status": "idle",
            "players": [],
            "rounds": [],
            "current_round": 0,
            "next_match_id": 1,
        }
    }


def save_state(state: Dict) -> None:
    ensure_data_dir()
    with STATE_FILE.open("w", encoding="utf-8") as fh:
        json.dump(state, fh, ensure_ascii=False, indent=2)


def pairwise(items: List[Optional[str]]) -> List[List[Optional[str]]]:
    return [items[i : i + 2] for i in range(0, len(items), 2)]


def expand_to_power_of_two(players: List[str]) -> List[Optional[str]]:
    """Expand the player list with None placeholders until it reaches 2**n."""

    filled = list(players)
    target = 1
    while target < max(2, len(players)):
        target *= 2
    while len(filled) < target:
        filled.append(None)
    return filled


@dataclass
class Match:
    match_id: int
    round_no: int
    player1: Optional[str]
    player2: Optional[str]
    winner: Optional[str] = None
    score: Optional[str] = None

    def to_dict(self) -> Dict:
        return {
            "id": self.match_id,
            "round": self.round_no,
            "player1": self.player1,
            "player2": self.player2,
            "winner": self.winner,
            "score": self.score,
        }


@dataclass
class CupManager:
    state: Dict = field(default_factory=load_state)

    # --- convenience properties -------------------------------------------------
    @property
    def cup(self) -> Dict:
        return self.state["cup"]

    @property
    def status(self) -> str:
        return self.cup.get("status", "idle")

    @property
    def players(self) -> List[str]:
        return self.cup.setdefault("players", [])

    @property
    def rounds(self) -> List[List[Dict]]:
        return self.cup.setdefault("rounds", [])

    @property
    def current_round(self) -> int:
        return self.cup.get("current_round", 0)

    # --- state persistence ------------------------------------------------------
    def save(self) -> None:
        save_state(self.state)

    # --- business logic --------------------------------------------------------
    def new_cup(self, name: str) -> None:
        self.state["cup"] = {
            "name": name,
            "status": "registration",
            "players": [],
            "rounds": [],
            "current_round": 0,
            "next_match_id": 1,
        }
        self.save()

    def add_player(self, player: str) -> str:
        if self.status not in {"registration"}:
            return "Сейчас нельзя добавлять игроков: регистрация закрыта."
        player = player.strip()
        if not player:
            return "Имя игрока не должно быть пустым."
        if player in self.players:
            return "Такой игрок уже зарегистрирован."
        self.players.append(player)
        self.save()
        return f"Игрок {player} добавлен."

    def list_players(self) -> str:
        if not self.players:
            return "Пока нет зарегистрированных игроков."
        header = f"Всего игроков: {len(self.players)}"
        body = "\n".join(f"• {name}" for name in self.players)
        return f"{header}\n{body}"

    def start_cup(self) -> str:
        if self.status != "registration":
            return "Нельзя начать турнир: либо он уже идёт, либо не создан."
        if len(self.players) < 2:
            return "Чтобы начать турнир, добавьте минимум двух игроков."

        expanded = expand_to_power_of_two(self.players)
        pairs = pairwise(expanded)
        round_matches = []
        for player1, player2 in pairs:
            match = Match(
                match_id=self._next_match_id(),
                round_no=1,
                player1=player1,
                player2=player2,
            )
            if player2 is None:
                match.winner = player1
                match.score = "BYE"
            round_matches.append(match.to_dict())

        self.rounds.append(round_matches)
        self.cup["status"] = "in_progress"
        self.cup["current_round"] = 1
        self.save()

        auto_advances = [m for m in round_matches if m["winner"]]
        message = "Турнир начат! Сетка первого раунда сформирована."
        if auto_advances:
            names = ", ".join(m["winner"] for m in auto_advances if m["winner"])
            message += f"\nСледующие игроки прошли дальше автоматически: {names}."
        return message

    def bracket_summary(self) -> str:
        if self.status == "idle" or not self.rounds:
            return "Сетка пока не создана."

        lines = [f"Текущий статус: {self.status}"]
        for round_idx, matches in enumerate(self.rounds, start=1):
            lines.append(f"\nРаунд {round_idx}:")
            for match in matches:
                p1 = match.get("player1") or "BYE"
                p2 = match.get("player2") or "BYE"
                winner = match.get("winner")
                score = match.get("score")
                if winner:
                    lines.append(
                        f"#{match['id']} {p1} vs {p2} — победил {winner} ({score})"
                    )
                else:
                    lines.append(f"#{match['id']} {p1} vs {p2} — в ожидании")
        return "\n".join(lines)

    def report_result(self, match_id: int, winner: str, score: str) -> str:
        match = self._find_match(match_id)
        if not match:
            return "Матч с таким номером не найден."
        if match.get("winner"):
            return "Результат этого матча уже зафиксирован."

        players = {match.get("player1"), match.get("player2")}
        players.discard(None)
        if winner not in players:
            return "Победитель должен быть одним из участников матча."

        match["winner"] = winner
        match["score"] = score
        self.save()

        self._update_next_round(match)
        return "Результат принят."

    # --- helpers ----------------------------------------------------------------
    def _next_match_id(self) -> int:
        next_id = self.cup.get("next_match_id", 1)
        self.cup["next_match_id"] = next_id + 1
        return next_id

    def _find_match(self, match_id: int) -> Optional[Dict]:
        for matches in self.rounds:
            for match in matches:
                if match.get("id") == match_id:
                    return match
        return None

    def _update_next_round(self, completed_match: Dict) -> None:
        round_no = completed_match["round"]
        matches = self.rounds[round_no - 1]
        all_finished = all(m.get("winner") for m in matches)
        if not all_finished:
            self.save()
            return

        winners = [m.get("winner") for m in matches]
        if len(winners) == 1:
            self.cup["status"] = "finished"
            self.save()
            return

        next_round_index = round_no
        if len(self.rounds) <= next_round_index:
            self.rounds.append([])

        next_round_matches = self.rounds[next_round_index]
        if next_round_matches:
            # round already prepared, just fill placeholders
            self.save()
            return

        for player1, player2 in pairwise(winners):
            match = Match(
                match_id=self._next_match_id(),
                round_no=round_no + 1,
                player1=player1,
                player2=player2,
            )
            next_round_matches.append(match.to_dict())

        self.cup["current_round"] = round_no + 1
        self.save()


manager = CupManager()


async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    cup_name = manager.cup.get("name")
    greeting = [
        "Привет! Я бот для ведения сетки настольного тенниса.",
        "Используйте /help, чтобы узнать доступные команды.",
    ]
    if cup_name:
        greeting.append(f"Активный турнир: {cup_name} (статус: {manager.status}).")
    await update.message.reply_text("\n".join(greeting))


async def cmd_help(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "Доступные команды:\n"
        "/newcup <название> — создать новую сетку и открыть регистрацию.\n"
        "/addplayer <имя> — добавить участника.\n"
        "/listplayers — показать зарегистрированных игроков.\n"
        "/startcup — завершить регистрацию и сгенерировать сетку.\n"
        "/bracket — показать текущую сетку и результаты.\n"
        "/result <id> <победитель> <счёт> — зафиксировать матч.\n"
        "Пример: /result 3 Иванов 3:1"
    )
    await update.message.reply_text(text)


async def cmd_newcup(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not context.args:
        await update.message.reply_text("Укажите название турнира после команды.")
        return
    name = " ".join(context.args)
    manager.new_cup(name)
    await update.message.reply_text(
        f"Создан турнир '{name}'. Добавляйте игроков командой /addplayer."
    )


async def cmd_addplayer(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not context.args:
        await update.message.reply_text("Укажите имя игрока после команды.")
        return
    name = " ".join(context.args)
    message = manager.add_player(name)
    await update.message.reply_text(message)


async def cmd_listplayers(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(manager.list_players())


async def cmd_startcup(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    message = manager.start_cup()
    await update.message.reply_text(message)


async def cmd_bracket(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    summary = manager.bracket_summary()
    await update.message.reply_text(summary)


async def cmd_result(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if len(context.args) < 3:
        await update.message.reply_text(
            "Использование: /result <id> <победитель> <счёт>."
        )
        return

    match_id_str, winner, *score_parts = context.args
    try:
        match_id = int(match_id_str)
    except ValueError:
        await update.message.reply_text("Номер матча должен быть числом.")
        return

    score = " ".join(score_parts)
    message = manager.report_result(match_id, winner, score)
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
    application.add_handler(CommandHandler("newcup", cmd_newcup))
    application.add_handler(CommandHandler("addplayer", cmd_addplayer))
    application.add_handler(CommandHandler("listplayers", cmd_listplayers))
    application.add_handler(CommandHandler("startcup", cmd_startcup))
    application.add_handler(CommandHandler("bracket", cmd_bracket))
    application.add_handler(CommandHandler("result", cmd_result))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, fallback))

    application.run_polling()


if __name__ == "__main__":
    main()

