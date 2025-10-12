const marketsData = [
  {
    id: 1,
    sport: "football",
    tournament: "Лига чемпионов",
    stage: "Четвертьфинал",
    match: "Реал Мадрид — Манчестер Сити",
    market: "match_winner",
    marketLabel: "Победа Реал Мадрид",
    loadPercent: 76,
    oddsStart: 2.15,
    oddsCurrent: 1.95,
    loadValue: 182000,
    impact: "Высокий",
    time: "21:45 MSK",
    movement: [48, 55, 63, 76]
  },
  {
    id: 2,
    sport: "hockey",
    tournament: "КХЛ Плей-офф",
    stage: "Финал конференции",
    match: "Ак Барс — СКА",
    market: "total_points",
    marketLabel: "Тотал больше 4.5",
    loadPercent: 64,
    oddsStart: 1.98,
    oddsCurrent: 1.82,
    loadValue: 124000,
    impact: "Средний",
    time: "19:30 MSK",
    movement: [44, 51, 58, 64]
  },
  {
    id: 3,
    sport: "basketball",
    tournament: "Евролига",
    stage: "Регулярный сезон",
    match: "Барселона — Олимпиакос",
    market: "handicap",
    marketLabel: "Фора (-5.5) Барселона",
    loadPercent: 81,
    oddsStart: 1.92,
    oddsCurrent: 1.68,
    loadValue: 98000,
    impact: "Экстремальный",
    time: "22:05 MSK",
    movement: [60, 66, 74, 81]
  },
  {
    id: 4,
    sport: "tennis",
    tournament: "ATP Монте-Карло",
    stage: "1/4 финала",
    match: "Андрей Рублёв — Янник Синнер",
    market: "match_winner",
    marketLabel: "Победа Янник Синнер",
    loadPercent: 58,
    oddsStart: 1.88,
    oddsCurrent: 1.74,
    loadValue: 72000,
    impact: "Средний",
    time: "17:10 MSK",
    movement: [42, 49, 54, 58]
  },
  {
    id: 5,
    sport: "esports",
    tournament: "CS2 Major",
    stage: "Полуфинал",
    match: "Natus Vincere — Vitality",
    market: "total_points",
    marketLabel: "Тотал карт больше 2.5",
    loadPercent: 69,
    oddsStart: 2.12,
    oddsCurrent: 1.94,
    loadValue: 56000,
    impact: "Высокий",
    time: "15:00 MSK",
    movement: [48, 55, 62, 69]
  },
  {
    id: 6,
    sport: "volleyball",
    tournament: "Суперлига",
    stage: "Женщины, финал",
    match: "Динамо Москва — Локомотив",
    market: "handicap",
    marketLabel: "Фора (+1.5) Локомотив",
    loadPercent: 62,
    oddsStart: 2.05,
    oddsCurrent: 1.86,
    loadValue: 48000,
    impact: "Высокий",
    time: "18:20 MSK",
    movement: [40, 52, 58, 62]
  }
];

const topLeagues = [
  { name: "КХЛ Плей-офф", stability: "+6.8% ROI", matches: 36 },
  { name: "Евролига", stability: "+5.4% ROI", matches: 28 },
  { name: "Ла Лига", stability: "+4.1% ROI", matches: 42 }
];

const forecasts = [
  { market: "Победа Реал Мадрид", delta: "-0.12", confidence: 84 },
  { market: "Тотал больше 4.5", delta: "-0.05", confidence: 71 },
  { market: "Фора (-5.5) Барселона", delta: "-0.09", confidence: 77 }
];

const state = {
  theme: localStorage.getItem("sportloads-theme") || "light"
};

const SPORT_LABELS = {
  football: "Футбол",
  hockey: "Хоккей",
  basketball: "Баскетбол",
  tennis: "Теннис",
  esports: "Киберспорт",
  volleyball: "Волейбол"
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
  sportSelect.innerHTML = "";

  const sports = ["all", ...new Set(marketsData.map(item => item.sport))];
  sports.forEach(sport => {
    const option = document.createElement("option");
    option.value = sport;
    option.textContent = sport === "all" ? "Все" : formatSportLabel(sport);
    sportSelect.append(option);
  });

  populateTournaments("all");
}

function populateTournaments(sportFilter) {
  const tournamentSelect = document.getElementById("tournament-filter");
  const previousValue = tournamentSelect.value;

  tournamentSelect.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "Все";
  tournamentSelect.append(defaultOption);

  const tournaments = [
    ...new Set(
      marketsData
        .filter(item => sportFilter === "all" || item.sport === sportFilter)
        .map(item => item.tournament)
    )
  ];

  tournaments.forEach(tournament => {
    const option = document.createElement("option");
    option.value = tournament;
    option.textContent = tournament;
    tournamentSelect.append(option);
  });

  if (tournaments.includes(previousValue)) {
    tournamentSelect.value = previousValue;
  } else {
    tournamentSelect.value = "all";
  }
}

function renderMarkets() {
  const grid = document.getElementById("markets-grid");
  const sportFilter = document.getElementById("sport-filter").value;
  const tournamentFilter = document.getElementById("tournament-filter").value;
  const marketFilter = document.getElementById("market-filter").value;

  grid.innerHTML = "";

  marketsData
    .filter(item => sportFilter === "all" || item.sport === sportFilter)
    .filter(item => tournamentFilter === "all" || item.tournament === tournamentFilter)
    .filter(item => marketFilter === "all" || item.market === marketFilter)
    .forEach(item => {
      const card = document.createElement("article");
      card.className = "market-card";
      card.role = "listitem";
      card.innerHTML = `
        <div class="market-card__header">
          <div>
            <h3>${item.match}</h3>
            <div class="market-card__meta">${formatSportLabel(item.sport)} · ${item.tournament} · ${item.stage}</div>
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

  const leaguesList = document.getElementById("top-leagues");
  leaguesList.innerHTML = "";
  topLeagues.forEach(league => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${league.name}</span><span>${league.stability} · ${league.matches} матчей</span>`;
    leaguesList.append(li);
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
  document.getElementById("sport-filter").addEventListener("change", event => {
    populateTournaments(event.target.value);
    renderMarkets();
  });

  document.getElementById("tournament-filter").addEventListener("change", renderMarkets);
  document.getElementById("market-filter").addEventListener("change", renderMarkets);

  document.getElementById("toggle-theme").addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
    document.getElementById("toggle-theme").textContent = isDark ? "Тёмная тема" : "Светлая тема";
    localStorage.setItem("sportloads-theme", isDark ? "light" : "dark");
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

function formatSportLabel(value) {
  return SPORT_LABELS[value] || value;
}
