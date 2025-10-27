"""Telegram bot that delivers table tennis match predictions.

The bot is built on top of the ``python-telegram-bot`` v20 asynchronous API.
It loads a curated list of top professional players and, given two names,
calculates a probability-based prediction using a lightweight rating + form
model. The command set focuses on quickly checking available players and
requesting head-to-head forecasts.

Usage
-----
1. Install the dependency::

       pip install python-telegram-bot==20.6

2. Export the bot token::

       export TELEGRAM_BOT_TOKEN=123456:ABC...

3. Run the bot::

       python table_tennis_bot.py

Commands
--------
* /start – greeting and quick tips.
* /help – detailed instructions and examples.
* /players – list the players available for predictions.
* /player <name> – show a short profile for a specific player.
* /predict <player1> vs <player2> – generate a prediction for the matchup.

Player data is stored inside ``data/players.json`` so you can extend the
library with your own ratings.
"""

from __future__ import annotations

import difflib
import json
import logging
import math
import os
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple

from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)


DATA_DIR = Path("data")
PLAYERS_FILE = DATA_DIR / "players.json"

DEFAULT_PLAYERS: List[Dict[str, object]] = [
    {
        "name": "Fan Zhendong",
        "country": "Китай",
        "rating": 2890,
        "style": "агрессивный топ-спин",
        "hand": "правша",
        "form": 0.91,
        "serve": 0.93,
        "receive": 0.90,
    },
    {
        "name": "Ma Long",
        "country": "Китай",
        "rating": 2845,
        "style": "универсальный атакующий",
        "hand": "правша",
        "form": 0.86,
        "serve": 0.88,
        "receive": 0.89,
    },
    {
        "name": "Wang Chuqin",
        "country": "Китай",
        "rating": 2820,
        "style": "левша, агрессия у стола",
        "hand": "левша",
        "form": 0.88,
        "serve": 0.90,
        "receive": 0.87,
    },
    {
        "name": "Tomokazu Harimoto",
        "country": "Япония",
        "rating": 2755,
        "style": "скоростной контратакующий",
        "hand": "правша",
        "form": 0.80,
        "serve": 0.82,
        "receive": 0.81,
    },
    {
        "name": "Hugo Calderano",
        "country": "Бразилия",
        "rating": 2720,
        "style": "атакующий с глубины",
        "hand": "правша",
        "form": 0.78,
        "serve": 0.79,
        "receive": 0.77,
    },
    {
        "name": "Truls Moregard",
        "country": "Швеция",
        "rating": 2685,
        "style": "креативный атакующий",
        "hand": "правша",
        "form": 0.75,
        "serve": 0.76,
        "receive": 0.73,
    },
    {
        "name": "Dimitrij Ovtcharov",
        "country": "Германия",
        "rating": 2660,
        "style": "силовой топ-спин",
        "hand": "правша",
        "form": 0.72,
        "serve": 0.78,
        "receive": 0.74,
    },
    {
        "name": "Lin Yun-Ju",
        "country": "Тайвань",
        "rating": 2695,
        "style": "левша, вращение",
        "hand": "левша",
        "form": 0.76,
        "serve": 0.80,
        "receive": 0.79,
    },
    {
        "name": "Jang Woojin",
        "country": "Южная Корея",
        "rating": 2670,
        "style": "универсальный",
        "hand": "правша",
        "form": 0.74,
        "serve": 0.75,
        "receive": 0.76,
    },
    {
        "name": "Timo Boll",
        "country": "Германия",
        "rating": 2635,
        "style": "левша, контроль",
        "hand": "левша",
        "form": 0.68,
        "serve": 0.72,
        "receive": 0.70,
    },
]


def ensure_data_dir() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)


@dataclass
class Player:
    name: str
    country: str
    rating: int
    style: str
    hand: str
    form: float
    serve: float
    receive: float

    @classmethod
    def from_dict(cls, payload: Dict[str, object]) -> "Player":
        return cls(
            name=str(payload["name"]),
            country=str(payload.get("country", "")),
            rating=int(payload.get("rating", 0)),
            style=str(payload.get("style", "")),
            hand=str(payload.get("hand", "")),
            form=float(payload.get("form", 0.5)),
            serve=float(payload.get("serve", 0.5)),
            receive=float(payload.get("receive", 0.5)),
        )

    def to_dict(self) -> Dict[str, object]:
        return asdict(self)

    def profile(self) -> str:
        return (
            f"{self.name} ({self.country})\n"
            f"Рейтинг ITTF: {self.rating}\n"
            f"Игровой стиль: {self.style}, {self.hand}\n"
            f"Форма: {self.form * 100:.0f}% побед в последних матчах\n"
            f"Качество подачи/приёма: {self.serve * 100:.0f}% / {self.receive * 100:.0f}%"
        )


class PlayerDatabase:
    def __init__(self) -> None:
        self._players = self._load_players()

    def _load_players(self) -> Dict[str, Player]:
        ensure_data_dir()
        if not PLAYERS_FILE.exists():
            with PLAYERS_FILE.open("w", encoding="utf-8") as fh:
                json.dump(DEFAULT_PLAYERS, fh, ensure_ascii=False, indent=2)

        with PLAYERS_FILE.open("r", encoding="utf-8") as fh:
            raw_data = json.load(fh)

        players: Dict[str, Player] = {}
        for entry in raw_data:
            player = Player.from_dict(entry)
            players[player.name.casefold()] = player
        return players

    def list_players(self) -> List[Player]:
        return sorted(self._players.values(), key=lambda p: p.rating, reverse=True)

    def find_player(self, name: str) -> Optional[Player]:
        key = name.casefold().strip()
        if key in self._players:
            return self._players[key]
        for candidate in self._players.values():
            if candidate.name.casefold() == key:
                return candidate
        return None

    def suggestions(self, query: str, limit: int = 3) -> List[str]:
        names = [player.name for player in self._players.values()]
        return difflib.get_close_matches(query, names, n=limit, cutoff=0.5)


class PredictionEngine:
    def __init__(self, database: PlayerDatabase) -> None:
        self.database = database

    def predict(self, player_one: Player, player_two: Player) -> Dict[str, object]:
        probability_one = self._win_probability(player_one, player_two)
        probability_two = 1 - probability_one
        winner, winner_prob = (
            (player_one, probability_one)
            if probability_one >= probability_two
            else (player_two, probability_two)
        )
        expected_score = self._expected_score(winner_prob)
        return {
            "probability_player1": probability_one,
            "probability_player2": probability_two,
            "predicted_winner": winner.name,
            "expected_score": expected_score,
            "confidence_text": self._confidence_text(winner.name, winner_prob),
        }

    @staticmethod
    def _clamp(value: float, minimum: float = 0.0, maximum: float = 1.0) -> float:
        return max(minimum, min(maximum, value))

    def _win_probability(self, player_one: Player, player_two: Player) -> float:
        rating_component = 1 / (
            1 + math.pow(10, (player_two.rating - player_one.rating) / 350)
        )
        form_component = 0.5 + (player_one.form - player_two.form) * 0.5
        serve_component = 0.5 + (
            (player_one.serve + player_one.receive)
            - (player_two.serve + player_two.receive)
        ) * 0.25

        combined = (
            rating_component * 0.6
            + self._clamp(form_component) * 0.25
            + self._clamp(serve_component) * 0.15
        )
        return self._clamp(combined)

    def _expected_score(self, winner_probability: float) -> str:
        if winner_probability >= 0.8:
            return "3:0"
        if winner_probability >= 0.65:
            return "3:1"
        if winner_probability >= 0.55:
            return "3:2"
        if winner_probability >= 0.45:
            return "3:2"
        if winner_probability >= 0.35:
            return "2:3"
        if winner_probability >= 0.2:
            return "1:3"
        return "0:3"

    def _confidence_text(self, winner_name: str, probability: float) -> str:
        if probability >= 0.8:
            return f"{winner_name} — явный фаворит"
        if probability >= 0.65:
            return f"{winner_name} имеет ощутимое преимущество"
        if probability >= 0.55:
            return f"{winner_name} чуть ближе к победе"
        return "Матч обещает быть очень ровным"


def format_prediction(player_one: Player, player_two: Player, result: Dict[str, object]) -> str:
    prob_one = float(result["probability_player1"]) * 100
    prob_two = float(result["probability_player2"]) * 100
    lines = [
        f"{player_one.name} vs {player_two.name}",
        f"Вероятность победы {player_one.name}: {prob_one:.1f}%",
        f"Вероятность победы {player_two.name}: {prob_two:.1f}%",
        "",
        (
            f"Прогноз: {result['predicted_winner']} выиграет со счётом "
            f"{result['expected_score']} (первая цифра — в пользу фаворита)."
        ),
        str(result["confidence_text"]),
        "",
        "Факторы модели:",
        (
            f"• Рейтинг ITTF: {player_one.rating} против {player_two.rating}."
        ),
        (
            "• Форма (последние матчи): "
            f"{player_one.form * 100:.0f}% vs {player_two.form * 100:.0f}%."
        ),
        (
            "• Качество подачи/приёма: "
            f"{player_one.serve * 100:.0f}% / {player_one.receive * 100:.0f}%"
            f" против {player_two.serve * 100:.0f}% / {player_two.receive * 100:.0f}%."
        ),
        "",
        "Модель предназначена для ориентировочных оценок и не заменяет детальный разбор формы игроков.",
    ]
    return "\n".join(lines)


def parse_players_argument(args: Iterable[str]) -> Optional[Tuple[str, str]]:
    text = " ".join(args).strip()
    if not text:
        return None

    separators = [" vs ", " против ", " v ", " - ", " — ", " : ", " ; "]
    for sep in separators:
        if sep in text:
            first, second = text.split(sep, 1)
            first = first.strip()
            second = second.strip()
            if first and second:
                return first, second

    return None


database = PlayerDatabase()
predictor = PredictionEngine(database)


async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Привет! Я подскажу вероятность победы в матчах по настольному теннису.\n"
        "Используйте /predict <игрок1> vs <игрок2>, чтобы получить прогноз.\n"
        "Команда /players покажет доступных игроков."
    )


async def cmd_help(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        "Доступные команды:\n"
        "/players — список игроков в базе.\n"
        "/player <имя> — краткая карточка игрока.\n"
        "/predict <игрок1> vs <игрок2> — прогноз и вероятность победы.\n\n"
        "Пример: /predict Fan Zhendong vs Ma Long\n"
        "Для точного совпадения имён смотрите /players."
    )


async def cmd_players(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    players = database.list_players()
    lines = ["Доступные игроки:"]
    for player in players:
        lines.append(
            f"• {player.name} ({player.country}) — рейтинг {player.rating}"
        )
    await update.message.reply_text("\n".join(lines))


async def cmd_player(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not context.args:
        await update.message.reply_text(
            "Укажите имя игрока после команды, например: /player Ma Long"
        )
        return

    query = " ".join(context.args)
    player = database.find_player(query)
    if player:
        await update.message.reply_text(player.profile())
        return

    suggestions = database.suggestions(query)
    if suggestions:
        await update.message.reply_text(
            "Игрок не найден. Возможно, вы имели в виду: "
            + ", ".join(suggestions)
        )
    else:
        await update.message.reply_text(
            "Игрок не найден. Используйте /players для доступных имён."
        )


async def cmd_predict(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    parsed = parse_players_argument(context.args)
    if not parsed:
        await update.message.reply_text(
            "Использование: /predict <игрок1> vs <игрок2>.\n"
            "Пример: /predict Fan Zhendong vs Ma Long"
        )
        return

    left_name, right_name = parsed
    player_left = database.find_player(left_name)
    player_right = database.find_player(right_name)

    missing: List[str] = []
    if not player_left:
        missing.append(left_name)
    if not player_right:
        missing.append(right_name)

    if missing:
        messages = [
            "Следующие игроки не найдены: " + ", ".join(missing) + ".",
        ]
        suggestions = database.suggestions(missing[0])
        if suggestions:
            messages.append("Возможно, вы имели в виду: " + ", ".join(suggestions))
        messages.append("Проверьте список /players.")
        await update.message.reply_text("\n".join(messages))
        return

    result = predictor.predict(player_left, player_right)
    message = format_prediction(player_left, player_right, result)
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
    application.add_handler(CommandHandler("players", cmd_players))
    application.add_handler(CommandHandler("player", cmd_player))
    application.add_handler(CommandHandler("predict", cmd_predict))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, fallback))

    application.run_polling()


if __name__ == "__main__":
    main()
