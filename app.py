from __future__ import annotations

from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
from typing import List

from flask import Flask, jsonify, render_template

app = Flask(__name__)


@dataclass
class LoadItem:
    id: int
    sport: str
    tournament: str
    stage: str
    match: str
    market: str
    market_label: str
    load_percent: int
    odds_start: float
    odds_current: float
    load_value: int
    impact: str
    time: str
    movement: List[int]


LOADS: List[LoadItem] = [
    LoadItem(
        id=1,
        sport="Футбол",
        tournament="Серия А",
        stage="Тур 27",
        match="Интер — Аталанта",
        market="match_winner",
        market_label="Победа Интера",
        load_percent=74,
        odds_start=1.88,
        odds_current=1.72,
        load_value=186_000,
        impact="Высокий",
        time="14:20 MSK",
        movement=[55, 63, 70, 74],
    ),
    LoadItem(
        id=2,
        sport="Баскетбол",
        tournament="NBA",
        stage="Регулярный сезон",
        match="Boston Celtics — Miami Heat",
        market="total_points",
        market_label="Тотал больше 221.5",
        load_percent=68,
        odds_start=1.95,
        odds_current=1.82,
        load_value=152_000,
        impact="Средний",
        time="03:05 MSK",
        movement=[48, 58, 64, 68],
    ),
    LoadItem(
        id=3,
        sport="Теннис",
        tournament="Ролан Гаррос",
        stage="1/4 финала",
        match="Ига Свёнтек — Арина Соболенко",
        market="match_winner",
        market_label="Победа Иги Свёнтек",
        load_percent=81,
        odds_start=1.62,
        odds_current=1.48,
        load_value=97_000,
        impact="Экстремальный",
        time="18:40 MSK",
        movement=[60, 68, 76, 81],
    ),
    LoadItem(
        id=4,
        sport="Хоккей",
        tournament="КХЛ",
        stage="Плей-офф",
        match="СКА — Локомотив",
        market="handicap",
        market_label="Фора (-1.5) СКА",
        load_percent=57,
        odds_start=2.05,
        odds_current=1.92,
        load_value=83_000,
        impact="Средний",
        time="19:30 MSK",
        movement=[42, 49, 54, 57],
    ),
    LoadItem(
        id=5,
        sport="Футбол",
        tournament="АПЛ",
        stage="Тур 31",
        match="Ливерпуль — Манчестер Сити",
        market="both_score",
        market_label="Обе забьют",
        load_percent=66,
        odds_start=1.71,
        odds_current=1.62,
        load_value=175_000,
        impact="Высокий",
        time="22:15 MSK",
        movement=[52, 58, 62, 66],
    ),
    LoadItem(
        id=6,
        sport="Киберспорт",
        tournament="Dota 2 Major",
        stage="Групповой этап",
        match="Team Spirit — PSG.LGD",
        market="match_winner",
        market_label="Победа Team Spirit",
        load_percent=71,
        odds_start=2.12,
        odds_current=1.96,
        load_value=64_000,
        impact="Высокий",
        time="11:00 MSK",
        movement=[51, 59, 66, 71],
    ),
    LoadItem(
        id=7,
        sport="Волейбол",
        tournament="Лига чемпионов",
        stage="Полуфинал",
        match="Зенит — Перуджа",
        market="total_points",
        market_label="Тотал меньше 183.5",
        load_percent=54,
        odds_start=1.98,
        odds_current=1.88,
        load_value=42_000,
        impact="Низкий",
        time="17:10 MSK",
        movement=[40, 46, 51, 54],
    ),
    LoadItem(
        id=8,
        sport="Теннис",
        tournament="ATP Майами",
        stage="Финал",
        match="Янник Синнер — Карлос Алькарас",
        market="handicap",
        market_label="Фора (-1.5) Синнер",
        load_percent=63,
        odds_start=1.92,
        odds_current=1.81,
        load_value=58_000,
        impact="Средний",
        time="21:05 MSK",
        movement=[47, 54, 59, 63],
    ),
]

STABLE_TOURNAMENTS = [
    {"name": "Серия А", "stability": "84% подтверждений", "matches": 12},
    {"name": "NBA", "stability": "78% подтверждений", "matches": 15},
    {"name": "КХЛ", "stability": "75% подтверждений", "matches": 9},
]

FORECASTS = [
    {"market": "Футбол · тотал больше 2.5", "delta": "+4.2%", "confidence": 82},
    {"market": "NBA · победа фаворита", "delta": "+3.1%", "confidence": 74},
    {"market": "КХЛ · фора -1.5", "delta": "+2.7%", "confidence": 68},
]

FAQS = [
    {
        "question": "Что такое прогруз?",
        "answer": "Прогруз — это значительный объём ставок на определённый исход, который приводит к изменению коэффициента букмекером.",
    },
    {
        "question": "Как часто обновляется информация?",
        "answer": "Мы обновляем данные каждые 15 минут. При обнаружении резких изменений информация появляется в ленте в течение нескольких секунд.",
    },
    {
        "question": "Можно ли экспортировать данные?",
        "answer": "Да, данные можно экспортировать в формате CSV или подключить через API. Для доступа свяжитесь с нами по электронной почте.",
    },
]

TICKER_MESSAGES = [
    {"label": "LIVE", "text": "Рост объёма · Серия А"},
    {"label": "ALERT", "text": "NBA · тотал повысился на 7%"},
    {"label": "TREND", "text": "KHL · фора 1.5 просела до 1.62"},
]


def serialize_loads() -> list[dict]:
    serialized: list[dict] = []
    for item in LOADS:
        data = asdict(item)
        serialized.append(
            {
                "id": data["id"],
                "sport": data["sport"],
                "tournament": data["tournament"],
                "stage": data["stage"],
                "match": data["match"],
                "market": data["market"],
                "marketLabel": data["market_label"],
                "loadPercent": data["load_percent"],
                "oddsStart": data["odds_start"],
                "oddsCurrent": data["odds_current"],
                "loadValue": data["load_value"],
                "impact": data["impact"],
                "time": data["time"],
                "movement": data["movement"],
            }
        )
    return serialized


def collect_filters() -> tuple[list[str], list[str]]:
    sports = sorted({item.sport for item in LOADS})
    tournaments = sorted({item.tournament for item in LOADS})
    return sports, tournaments


def total_volume() -> int:
    return sum(item.load_value for item in LOADS)


@app.route("/")
def index():
    sports, tournaments = collect_filters()
    return render_template(
        "index.html",
        loads=serialize_loads(),
        sports=sports,
        tournaments=tournaments,
        stable_tournaments=STABLE_TOURNAMENTS,
        forecasts=FORECASTS,
        faqs=FAQS,
        ticker_messages=TICKER_MESSAGES,
    )


@app.route("/api/loads")
def api_loads():
    """Возвращает данные о текущих прогрузах и метриках."""
    last_updated = datetime.utcnow()
    return jsonify(
        {
            "updated_at": last_updated.isoformat() + "Z",
            "next_update_at": (last_updated + timedelta(minutes=15)).isoformat() + "Z",
            "total_volume": total_volume(),
            "items": serialize_loads(),
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
