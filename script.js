const marketsData = [
  {
    id: 1,
    sport: "Футбол",
    tournament: "Серия А",
    stage: "Тур 27",
    match: "Интер — Аталанта",
    market: "match_winner",
    marketLabel: "Победа Интера",
    loadPercent: 74,
    oddsStart: 1.88,
    oddsCurrent: 1.72,
    loadValue: 186000,
    impact: "Высокий",
    time: "14:20 MSK",
    movement: [55, 63, 70, 74]
  },
  {
    id: 2,
    sport: "Баскетбол",
    tournament: "NBA",
    stage: "Регулярный сезон",
    match: "Boston Celtics — Miami Heat",
    market: "total_points",
    marketLabel: "Тотал больше 221.5",
    loadPercent: 68,
    oddsStart: 1.95,
    oddsCurrent: 1.82,
    loadValue: 152000,
    impact: "Средний",
    time: "03:05 MSK",
    movement: [48, 58, 64, 68]
  },
  {
    id: 3,
    sport: "Теннис",
    tournament: "Ролан Гаррос",
    stage: "1/4 финала",
    match: "Ига Свёнтек — Аріна Соболенко",
    market: "match_winner",
    marketLabel: "Победа Иги Свёнтек",
    loadPercent: 81,
    oddsStart: 1.62,
    oddsCurrent: 1.48,
    loadValue: 97000,
    impact: "Экстремальный",
    time: "18:40 MSK",
    movement: [60, 68, 76, 81]
  },
  {
    id: 4,
    sport: "Хоккей",
    tournament: "КХЛ",
    stage: "Плей-офф",
    match: "СКА — Локомотив",
    market: "handicap",
    marketLabel: "Фора (-1.5) СКА",
    loadPercent: 57,
    oddsStart: 2.05,
    oddsCurrent: 1.92,
    loadValue: 83000,
    impact: "Средний",
    time: "19:30 MSK",
    movement: [42, 49, 54, 57]
  },
  {
    id: 5,
    sport: "Футбол",
    tournament: "АПЛ",
    stage: "Тур 31",
    match: "Ливерпуль — Манчестер Сити",
    market: "both_score",
    marketLabel: "Обе забьют",
    loadPercent: 66,
    oddsStart: 1.71,
    oddsCurrent: 1.62,
    loadValue: 175000,
    impact: "Высокий",
    time: "22:15 MSK",
    movement: [52, 58, 62, 66]
  },
  {
    id: 6,
    sport: "Киберспорт",
    tournament: "Dota 2 Major",
    stage: "Групповой этап",
    match: "Team Spirit — PSG.LGD",
    market: "match_winner",
    marketLabel: "Победа Team Spirit",
    loadPercent: 71,
    oddsStart: 2.12,
    oddsCurrent: 1.96,
    loadValue: 64000,
    impact: "Высокий",
    time: "11:00 MSK",
    movement: [51, 59, 66, 71]
  },
  {
    id: 7,
    sport: "Волейбол",
    tournament: "Лига чемпионов",
    stage: "Полуфинал",
    match: "Зенит — Перуджа",
    market: "total_points",
    marketLabel: "Тотал меньше 183.5",
    loadPercent: 54,
    oddsStart: 1.98,
    oddsCurrent: 1.88,
    loadValue: 42000,
    impact: "Низкий",
    time: "17:10 MSK",
    movement: [40, 46, 51, 54]
  },
  {
    id: 8,
    sport: "Теннис",
    tournament: "ATP Майами",
    stage: "Финал",
    match: "Янник Синнер — Карлос Алькарас",
    market: "handicap",
    marketLabel: "Фора (-1.5) Синнер",
    loadPercent: 63,
    oddsStart: 1.92,
    oddsCurrent: 1.79,
    loadValue: 88000,
    impact: "Средний",
    time: "01:30 MSK",
    movement: [47, 55, 59, 63]
  }
];

const stableTournaments = [
  { name: "Серия А (футбол)", stability: "+7.2% ROI", matches: 38 },
  { name: "NBA (баскетбол)", stability: "+5.6% ROI", matches: 42 },
  { name: "КХЛ (хоккей)", stability: "+4.1% ROI", matches: 35 }
];

const forecasts = [
  { market: "Интер — победа", delta: "-0.07", confidence: 84 },
  { market: "NBA тотал 221.5", delta: "-0.05", confidence: 71 },
  { market: "СКА фора -1.5", delta: "-0.03", confidence: 64 }
];

const state = {
  theme: localStorage.getItem("tt-theme") || "light"
};

document.addEventListener("DOMContentLoaded", () => {
  if (state.theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    document.getElementById("toggle-theme").textContent = "Светлая тема";
  }

  renderFilters();
  renderMarkets();
  renderAnalytics();
  attachEventListeners();
});

function renderFilters() {
  const sportSelect = document.getElementById("sport-filter");
  const tournamentSelect = document.getElementById("tournament-filter");
  const sports = ["all", ...new Set(marketsData.map(item => item.sport))];
  const tournaments = ["all", ...new Set(marketsData.map(item => item.tournament))];

  clearAdditionalOptions(sportSelect);
  clearAdditionalOptions(tournamentSelect);

  sports.forEach(sport => {
    if (sport === "all") return;
    const option = document.createElement("option");
    option.value = sport;
    option.textContent = sport;
    sportSelect.append(option);
  });

  tournaments.forEach(tournament => {
    if (tournament === "all") return;
    const option = document.createElement("option");
    option.value = tournament;
    option.textContent = tournament;
    tournamentSelect.append(option);
  });
}

function renderMarkets() {
  const grid = document.getElementById("markets-grid");
  const sportFilter = document.getElementById("sport-filter").value;
  const tournamentFilter = document.getElementById("tournament-filter").value;
  const marketFilter = document.getElementById("market-filter").value;

  grid.innerHTML = "";

  marketsData
    .filter(item => (sportFilter === "all" || item.sport === sportFilter))
    .filter(item => (tournamentFilter === "all" || item.tournament === tournamentFilter))
    .filter(item => (marketFilter === "all" || item.market === marketFilter))
    .forEach(item => {
      const card = document.createElement("article");
      card.className = "market-card";
      card.role = "listitem";
      card.innerHTML = `
        <div class="market-card__header">
          <div>
            <h3>${item.match}</h3>
            <div class="market-card__meta">${item.sport} · ${item.tournament} · ${item.stage}</div>
          </div>
          <span class="impact">${item.impact}</span>
        </div>
        <div class="progress">
          <div class="progress__label">
            <span>${item.marketLabel}</span>
            <span>${item.loadPercent}%</span>
          </div>
          <div class="progress__bar">
            <span class="progress__fill" style="transform: scaleX(${item.loadPercent / 100})"></span>
          </div>
        </div>
        <div class="market-card__meta">
          Объём: ${(item.loadValue / 1000).toFixed(0)} тыс. ₽ · Ставка в ${item.time}
        </div>
        <div class="market-card__meta">
          Коэффициент: было ${item.oddsStart.toFixed(2)} → сейчас ${item.oddsCurrent.toFixed(2)}
        </div>
      `;
      grid.append(card);
    });

  if (!grid.children.length) {
    grid.innerHTML = `<div class="empty-state">Нет прогрузов по выбранным фильтрам</div>`;
  }
}

function renderAnalytics() {
  const totalVolume = marketsData.reduce((sum, item) => sum + item.loadValue, 0);
  document.getElementById("total-volume").textContent = formatCurrency(totalVolume);

  const sparkline = document.getElementById("sparkline");
  sparkline.innerHTML = "";
  const sparkPoints = normalizeSparkline(marketsData.map(item => item.loadPercent));
  sparkPoints.forEach(point => {
    const bar = document.createElement("span");
    bar.style.height = `${point}%`;
    sparkline.append(bar);
  });

  const tournamentsList = document.getElementById("top-officials");
  tournamentsList.innerHTML = "";
  stableTournaments.forEach(tournament => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${tournament.name}</span><span>${tournament.stability} · ${tournament.matches} матчей</span>`;
    tournamentsList.append(li);
  });

  const forecastList = document.getElementById("forecast");
  forecastList.innerHTML = "";
  forecasts.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.market}</span><span>${item.delta} (уверенность ${item.confidence}%)</span>`;
    forecastList.append(li);
  });
}

function attachEventListeners() {
  document.getElementById("sport-filter").addEventListener("change", renderMarkets);
  document.getElementById("tournament-filter").addEventListener("change", renderMarkets);
  document.getElementById("market-filter").addEventListener("change", renderMarkets);

  document.getElementById("toggle-theme").addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
    document.getElementById("toggle-theme").textContent = isDark ? "Тёмная тема" : "Светлая тема";
    localStorage.setItem("tt-theme", isDark ? "light" : "dark");
  });

  document.getElementById("faq-accordion").addEventListener("click", event => {
    if (!event.target.closest(".accordion__trigger")) return;
    const trigger = event.target.closest(".accordion__trigger");
    const panel = trigger.nextElementSibling;
    const expanded = trigger.getAttribute("aria-expanded") === "true";

    trigger.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
  });
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(amount);
}

function normalizeSparkline(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) {
    return values.map(() => 60);
  }
  return values.map(value => 30 + ((value - min) / (max - min)) * 70);
}

function clearAdditionalOptions(select) {
  Array.from(select.querySelectorAll("option")).forEach(option => {
    if (option.value !== "all") {
      option.remove();
    }
  });
}
