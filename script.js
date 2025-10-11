const marketsData = [
  {
    id: 1,
    tournament: "WTT Contender Doha",
    stage: "1/8 финала",
    match: "Линь Юнжу — Патрик Франциска",
    market: "match_winner",
    marketLabel: "Победа Линь Юнжу",
    loadPercent: 78,
    oddsStart: 1.74,
    oddsCurrent: 1.58,
    loadValue: 126000,
    impact: "Высокий",
    time: "14:20 MSK",
    movement: [68, 70, 74, 78]
  },
  {
    id: 2,
    tournament: "Чемпионат России",
    stage: "Женщины, полуфинал",
    match: "Полина Михайлова — Юлия Привалова",
    market: "total_points",
    marketLabel: "Тотал больше 75.5",
    loadPercent: 64,
    oddsStart: 1.92,
    oddsCurrent: 1.80,
    loadValue: 58000,
    impact: "Средний",
    time: "16:05 MSK",
    movement: [50, 56, 61, 64]
  },
  {
    id: 3,
    tournament: "Bundesliga",
    stage: "Мужчины",
    match: "Боруссия Дюссельдорф — Фюрт",
    market: "handicap",
    marketLabel: "Фора (-2.5) Боруссия",
    loadPercent: 82,
    oddsStart: 1.85,
    oddsCurrent: 1.66,
    loadValue: 91000,
    impact: "Экстремальный",
    time: "19:30 MSK",
    movement: [60, 70, 78, 82]
  },
  {
    id: 4,
    tournament: "TT Cup",
    stage: "Групповой этап",
    match: "Мирослав Урбана — Ян Ковач",
    market: "match_winner",
    marketLabel: "Победа Ян Ковач",
    loadPercent: 55,
    oddsStart: 2.25,
    oddsCurrent: 2.05,
    loadValue: 32000,
    impact: "Средний",
    time: "12:45 MSK",
    movement: [45, 50, 53, 55]
  },
  {
    id: 5,
    tournament: "TT Star Series",
    stage: "Квалификация",
    match: "Анна Жаворонкова — Ванъ Юй",
    market: "total_points",
    marketLabel: "Тотал меньше 73.5",
    loadPercent: 69,
    oddsStart: 1.99,
    oddsCurrent: 1.83,
    loadValue: 47000,
    impact: "Высокий",
    time: "21:10 MSK",
    movement: [54, 58, 65, 69]
  }
];

const officials = [
  { name: "Михаил Сорокин", stability: "+8.6% ROI", matches: 24 },
  { name: "Андреа Морети", stability: "+5.1% ROI", matches: 18 },
  { name: "Лю Мин", stability: "+4.7% ROI", matches: 21 }
];

const forecasts = [
  { market: "Победа Линь Юнжу", delta: "-0.08", confidence: 82 },
  { market: "Тотал больше 75.5", delta: "-0.04", confidence: 68 },
  { market: "Фора (-2.5) Боруссия", delta: "-0.11", confidence: 74 }
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
  const tournamentSelect = document.getElementById("tournament-filter");
  const tournaments = ["all", ...new Set(marketsData.map(item => item.tournament))];

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
  const tournamentFilter = document.getElementById("tournament-filter").value;
  const marketFilter = document.getElementById("market-filter").value;

  grid.innerHTML = "";

  marketsData
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
            <div class="market-card__meta">${item.tournament} · ${item.stage}</div>
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

  const officialsList = document.getElementById("top-officials");
  officialsList.innerHTML = "";
  officials.forEach(official => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${official.name}</span><span>${official.stability} · ${official.matches} матчей</span>`;
    officialsList.append(li);
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
