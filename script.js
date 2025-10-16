const marketsData = [
  {
    id: 1,
    sport: "Баскетбол",
    tournament: "NBA Плей-офф",
    stage: "4-я четверть · 6:12",
    match: "Денвер Наггетс — Миннесота Тимбервулвз",
    market: "total_goals",
    marketLabel: "Коридор тотала 216.5–221.5",
    loadPercent: 72,
    oddsStart: 1.92,
    oddsCurrent: 1.88,
    loadValue: 342000,
    impact: "Экстремальный",
    time: "05:40 MSK",
    movement: [58, 63, 68, 72],
    windowSize: 5,
    windowLabel: "Запас 5 очков",
    margin: 7.2,
    books: 5
  },
  {
    id: 2,
    sport: "Хоккей",
    tournament: "KHL Плей-офф",
    stage: "3-й период · 11:03",
    match: "Ак Барс — Авангард",
    market: "handicap",
    marketLabel: "Фора -1.5 / -0.5",
    loadPercent: 64,
    oddsStart: 1.83,
    oddsCurrent: 2.12,
    loadValue: 248000,
    impact: "Высокий",
    time: "22:50 MSK",
    movement: [46, 52, 59, 64],
    windowSize: 1,
    windowLabel: "Запас 1 шайба",
    margin: 5.4,
    books: 4
  },
  {
    id: 3,
    sport: "Футбол",
    tournament: "Serie A",
    stage: "2-й тайм · 63'",
    match: "Лацио — Милан",
    market: "total_goals",
    marketLabel: "Тотал 2.0 / 2.5",
    loadPercent: 69,
    oddsStart: 1.98,
    oddsCurrent: 1.76,
    loadValue: 198000,
    impact: "Высокий",
    time: "22:45 MSK",
    movement: [51, 58, 64, 69],
    windowSize: 0.5,
    windowLabel: "Запас 0.5 мяча",
    margin: 6.8,
    books: 6
  },
  {
    id: 4,
    sport: "Теннис",
    tournament: "WTA Мадрид",
    stage: "1/4 финала",
    match: "Ига Швёнтек — Арина Сабаленка",
    market: "total_goals",
    marketLabel: "Тотал сетов 2.0 / 2.5",
    loadPercent: 57,
    oddsStart: 1.88,
    oddsCurrent: 2.14,
    loadValue: 112000,
    impact: "Средний",
    time: "18:30 MSK",
    movement: [39, 45, 51, 57],
    windowSize: 1,
    windowLabel: "Запас 1 сет",
    margin: 4.9,
    books: 4
  },
  {
    id: 5,
    sport: "Киберспорт",
    tournament: "CS:GO Major",
    stage: "Гранд-финал · карта 2",
    match: "Vitality — FaZe Clan",
    market: "match_winner",
    marketLabel: "Победа Vitality / FaZe",
    loadPercent: 61,
    oddsStart: 1.91,
    oddsCurrent: 2.08,
    loadValue: 174000,
    impact: "Высокий",
    time: "20:10 MSK",
    movement: [43, 49, 55, 61],
    windowSize: 0.35,
    windowLabel: "Диапазон 3.5%",
    margin: 3.5,
    books: 5
  },
  {
    id: 6,
    sport: "Футбол",
    tournament: "MLS",
    stage: "1-й тайм · 28'",
    match: "Интер Майами — Орландо Сити",
    market: "both_score",
    marketLabel: "Обе забьют Да / Нет",
    loadPercent: 54,
    oddsStart: 1.88,
    oddsCurrent: 2.06,
    loadValue: 126000,
    impact: "Средний",
    time: "03:15 MSK",
    movement: [36, 41, 48, 54],
    windowSize: 0.18,
    windowLabel: "Маржа 3.2%",
    margin: 3.2,
    books: 4
  },
  {
    id: 7,
    sport: "Баскетбол",
    tournament: "Евролига",
    stage: "3-я четверть · 3:41",
    match: "Панатинаикос — Монако",
    market: "handicap",
    marketLabel: "Фора -2.5 / +5.5",
    loadPercent: 66,
    oddsStart: 1.90,
    oddsCurrent: 1.84,
    loadValue: 152000,
    impact: "Высокий",
    time: "21:30 MSK",
    movement: [48, 52, 60, 66],
    windowSize: 8,
    windowLabel: "Запас 8 очков",
    margin: 5.9,
    books: 5
  },
  {
    id: 8,
    sport: "Хоккей",
    tournament: "NHL",
    stage: "2-й период · 14:27",
    match: "Торонто Мэйпл Лифс — Флорида Пантерз",
    market: "total_goals",
    marketLabel: "Тотал 5.0 / 6.0",
    loadPercent: 59,
    oddsStart: 1.82,
    oddsCurrent: 1.96,
    loadValue: 165000,
    impact: "Средний",
    time: "02:05 MSK",
    movement: [42, 47, 53, 59],
    windowSize: 1,
    windowLabel: "Запас 1 шайба",
    margin: 4.6,
    books: 5
  }
];

const stableTournaments = [
  { name: "NBA Плей-офф", stability: "Охват 92%", matches: 26 },
  { name: "KHL плей-офф", stability: "Маржа +6.1%", matches: 18 },
  { name: "Serie A", stability: "Ширина 0.45 мяча", matches: 27 }
];

const forecasts = [
  { market: "Наггетс — Тимбервулвз тотал", delta: "-0.7 очка", confidence: 88 },
  { market: "Ак Барс — Авангард фора", delta: "-0.4 шайбы", confidence: 74 },
  { market: "Лацио — Милан тотал", delta: "-0.2 мяча", confidence: 81 }
];

const parlayIdeas = [
  {
    id: "combo-1",
    title: "Коридорный вечер",
    risk: "Сбалансированный",
    confidence: 85,
    totalOdds: 3.46,
    edge: "+6% запас",
    legs: [
      { match: marketsData[0].match, pick: marketsData[0].marketLabel, sport: marketsData[0].sport },
      { match: marketsData[2].match, pick: marketsData[2].marketLabel, sport: marketsData[2].sport }
    ],
    comment: "Сочетание NBA тотала и футбольного коридора из Серии A с устойчивым охватом."
  },
  {
    id: "combo-2",
    title: "Ночной поток",
    risk: "Агрессивный",
    confidence: 78,
    totalOdds: 4.58,
    edge: "+9% запас",
    legs: [
      { match: marketsData[1].match, pick: marketsData[1].marketLabel, sport: marketsData[1].sport },
      { match: marketsData[5].match, pick: marketsData[5].marketLabel, sport: marketsData[5].sport },
      { match: marketsData[7].match, pick: marketsData[7].marketLabel, sport: marketsData[7].sport }
    ],
    comment: "Коридоры по хоккею, MLS и NHL закрывают ночной слот и диверсифицируют риск."
  },
  {
    id: "combo-3",
    title: "Прайм-тайм защита",
    risk: "Консервативный",
    confidence: 90,
    totalOdds: 2.94,
    edge: "+4% запас",
    legs: [
      { match: marketsData[3].match, pick: marketsData[3].marketLabel, sport: marketsData[3].sport },
      { match: marketsData[6].match, pick: marketsData[6].marketLabel, sport: marketsData[6].sport }
    ],
    comment: "Теннис и Евролигу объединяем для стабильного окна в вечернем прайме."
  }
];

const comboFeedbackTimers = new Map();

let liveFeedEvents = [
  createFeedEvent({
    minutesAgo: 4,
    type: "alert",
    context: `${marketsData[0].tournament} · ${marketsData[0].sport}`,
    title: marketsData[0].match,
    description: `Коридор «${marketsData[0].marketLabel}» удерживает ${marketsData[0].windowLabel.toLowerCase()} — верхний коэффициент ${marketsData[0].oddsCurrent.toFixed(2)}, охват ${marketsData[0].loadPercent}% по ${marketsData[0].books} конторам.`
  }),
  createFeedEvent({
    minutesAgo: 8,
    type: "trend",
    context: `${marketsData[1].tournament} · ${marketsData[1].sport}`,
    title: marketsData[1].match,
    description: `Фора держится в коридоре: «${marketsData[1].marketLabel}» даёт ${marketsData[1].windowLabel.toLowerCase()} при марже ${marketsData[1].margin.toFixed(1)}%.`
  }),
  createFeedEvent({
    minutesAgo: 12,
    type: "live",
    context: `${marketsData[5].tournament} · ${marketsData[5].sport}`,
    title: marketsData[5].match,
    description: `MLS окно «${marketsData[5].marketLabel}» собрало банк ${formatCurrency(marketsData[5].loadValue)} и охват ${marketsData[5].loadPercent}% у ${marketsData[5].books} букмекеров.`
  }),
  createFeedEvent({
    minutesAgo: 16,
    type: "trend",
    context: `${marketsData[6].tournament} · ${marketsData[6].sport}`,
    title: marketsData[6].match,
    description: `Евролига: ${marketsData[6].marketLabel} даёт ${marketsData[6].windowLabel.toLowerCase()}, коэффициенты ${marketsData[6].oddsStart.toFixed(2)} / ${marketsData[6].oddsCurrent.toFixed(2)}.`
  })
];

const state = {
  theme: localStorage.getItem("tt-theme") || "dark",
  lastUpdate: Date.now(),
  refreshIntervalId: null,
  relativeIntervalId: null
};

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("data-theme", state.theme);
  document.getElementById("toggle-theme").textContent =
    state.theme === "dark" ? "Светлая тема" : "Тёмная тема";

  renderHeroStats();
  renderQuickFilters();
  renderFilters();
  renderMarkets();
  renderAnalytics();
  renderInsights();
  renderCombos();
  renderLiveFeed();
  markUpdated();
  scheduleAutoRefresh();
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

  const filteredMarkets = marketsData
    .filter(item => (sportFilter === "all" || item.sport === sportFilter))
    .filter(item => (tournamentFilter === "all" || item.tournament === tournamentFilter))
    .filter(item => (marketFilter === "all" || item.market === marketFilter));

  filteredMarkets.forEach(item => {
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
      <div class="market-card__range">
        <span>${item.marketLabel}</span>
        <span>${item.windowLabel}</span>
      </div>
      <div class="progress">
        <div class="progress__label">
          <span>Охват ${item.loadPercent}% · ${item.books} букмек.</span>
          <span>Маржа ${item.margin.toFixed(1)}%</span>
        </div>
        <div class="progress__bar">
          <span class="progress__fill" style="transform: scaleX(${item.loadPercent / 100})"></span>
        </div>
      </div>
      <div class="market-card__meta">
        Банк: ${(item.loadValue / 1000).toFixed(0)} тыс. ₽ · ${item.stage}
      </div>
      <div class="market-card__meta">
        Коэффициенты: ${item.oddsStart.toFixed(2)} / ${item.oddsCurrent.toFixed(2)} · окно до ${item.time}
      </div>
      <div class="market-card__trend" aria-hidden="true">
        <span class="market-card__trend-label">Стабильность охвата</span>
        ${renderTrendline(item.movement)}
      </div>
    `;
    grid.append(card);
  });

  if (!filteredMarkets.length) {
    grid.innerHTML = `<div class="empty-state">Нет коридоров по выбранным фильтрам</div>`;
  }

  renderSignals(filteredMarkets);
  updateQuickFiltersActiveState();
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

function renderSignals(source = marketsData) {
  const signalList = document.getElementById("signal-list");
  if (!signalList) return;

  signalList.innerHTML = "";

  const candidates = [...source]
    .sort((a, b) => {
      if (b.loadPercent === a.loadPercent) {
        return b.loadValue - a.loadValue;
      }
      return b.loadPercent - a.loadPercent;
    })
    .slice(0, 3);

  if (!candidates.length) {
    const empty = document.createElement("li");
    empty.className = "live-card__item live-card__item--empty";
    empty.textContent = "Нет коридоров по текущим фильтрам";
    signalList.append(empty);
    return;
  }

  candidates.forEach(item => {
    const li = document.createElement("li");
    li.className = "live-card__item";
    const oddsFell = item.oddsCurrent < item.oddsStart;
    const trendClass = `trend ${oddsFell ? "trend--down" : "trend--up"}`;
    const arrow = oddsFell ? "↓" : "↑";
    const direction = oddsFell ? "сужение" : "расширение";
    li.innerHTML = `
      <strong>${item.match}</strong>
      <div class="live-card__meta">
        <span>${item.marketLabel}</span>
        <span class="${trendClass}">${arrow} ${direction}</span>
      </div>
      <div class="live-card__meta">
        <span>Охват ${item.loadPercent}% · ${item.books} букмек.</span>
        <span>Коэфф. ${item.oddsStart.toFixed(2)} / ${item.oddsCurrent.toFixed(2)}</span>
      </div>
    `;
    signalList.append(li);
  });
}

function renderLiveFeed() {
  const feed = document.getElementById("live-feed");
  if (!feed) return;

  feed.innerHTML = "";

  if (!liveFeedEvents.length) {
    const empty = document.createElement("li");
    empty.className = "live-feed__item";
    empty.innerHTML = `
      <div class="live-feed__title">Лента пуста</div>
      <div class="live-feed__text">Ожидаем новые окна от лайв-сканера.</div>
    `;
    feed.append(empty);
    return;
  }

  liveFeedEvents.slice(0, 6).forEach(event => {
    const li = document.createElement("li");
    li.className = "live-feed__item";
    const badgeClass = `live-feed__badge${event.type === "alert" ? " live-feed__badge--alert" : ""}`;
    const badgeLabels = { alert: "АЛЕРТ", trend: "ТРЕНД", live: "LIVE" };
    const badgeLabel = badgeLabels[event.type] || event.type.toUpperCase();
    const timestamp = new Date(event.timestamp);
    li.innerHTML = `
      <header>
        <span>${formatClock(timestamp)}</span>
        <span class="${badgeClass}">${badgeLabel}</span>
      </header>
      <div class="live-feed__title">${event.title}</div>
      <div class="live-feed__text">${event.description}</div>
      <div class="live-card__meta">
        <span>${event.context}</span>
        <span>${formatRelativeTime(timestamp)}</span>
      </div>
    `;
    feed.append(li);
  });
}

function refreshLiveData(source = "auto") {
  const market = pickRandom(marketsData);
  if (!market) return;

  const previousOdds = market.oddsCurrent;
  const oddsShift = (Math.random() * 0.05 + 0.01) * (Math.random() > 0.5 ? -1 : 1);
  const nextOdds = clampOdds(market.oddsCurrent * (1 + oddsShift));
  market.oddsCurrent = Number(nextOdds.toFixed(2));

  const loadShift = Math.round((Math.random() * 5 + 2) * (oddsShift < 0 ? 1 : -1));
  market.loadPercent = clampPercent(market.loadPercent + loadShift);
  const volumeMultiplier = loadShift > 0 ? 1 + Math.random() * 0.05 : 1 + Math.random() * 0.03;
  market.loadValue = Math.max(50000, Math.round(market.loadValue * volumeMultiplier));
  const marginShift = (Math.random() * 0.6 + 0.1) * (oddsShift < 0 ? 1 : -1);
  market.margin = Number(Math.max(1.5, Math.min(12, market.margin + marginShift)).toFixed(1));

  market.movement.push(market.loadPercent);
  market.movement = market.movement.slice(-4);

  const oddsDifference = Math.abs(market.oddsCurrent - previousOdds).toFixed(2);
  const oddsFell = market.oddsCurrent < previousOdds;
  const eventType = source === "manual" ? "live" : oddsFell ? "alert" : "trend";
  const corridorDirection = oddsFell ? "сужается" : "расширяется";
  const description = `Коридор «${market.marketLabel}» ${corridorDirection}: верхний коэффициент ${market.oddsCurrent.toFixed(2)} (Δ ${oddsDifference}). Охват ${market.loadPercent}% по ${market.books} букмекерам, банк ${formatCurrency(market.loadValue)}.`;

  liveFeedEvents.unshift({
    id: `event-${Date.now()}`,
    timestamp: Date.now(),
    type: eventType,
    context: `${market.tournament} · ${market.sport}`,
    title: market.match,
    description
  });

  if (liveFeedEvents.length > 12) {
    liveFeedEvents = liveFeedEvents.slice(0, 12);
  }

  renderMarkets();
  renderAnalytics();
  renderLiveFeed();
  markUpdated();
  renderHeroStats();
  renderInsights();
  renderCombos();
}

function scheduleAutoRefresh() {
  if (state.refreshIntervalId) {
    clearInterval(state.refreshIntervalId);
  }
  if (state.relativeIntervalId) {
    clearInterval(state.relativeIntervalId);
  }

  state.refreshIntervalId = setInterval(() => refreshLiveData("auto"), 45000);
  state.relativeIntervalId = setInterval(updateLastUpdate, 15000);
}

function updateLastUpdate() {
  const label = document.getElementById("last-update");
  if (!label) return;
  label.textContent = `Обновлено ${formatRelativeTime(new Date(state.lastUpdate))}`;
}

function markUpdated() {
  state.lastUpdate = Date.now();
  updateLastUpdate();
}

function attachEventListeners() {
  document.getElementById("sport-filter").addEventListener("change", renderMarkets);
  document.getElementById("tournament-filter").addEventListener("change", renderMarkets);
  document.getElementById("market-filter").addEventListener("change", renderMarkets);

  const quickFilters = document.getElementById("quick-filters");
  if (quickFilters) {
    quickFilters.addEventListener("click", event => {
      const button = event.target.closest(".quick-filter");
      if (!button) return;
      const { value } = button.dataset;
      const sportSelect = document.getElementById("sport-filter");
      if (sportSelect && sportSelect.value !== value) {
        sportSelect.value = value;
        renderMarkets();
      }
      updateQuickFiltersActiveState();
    });
  }

  const comboGrid = document.getElementById("combo-grid");
  if (comboGrid) {
    comboGrid.addEventListener("click", event => {
      const card = event.target.closest(".combo-card");
      if (!card) return;
      handleComboCopy(card);
    });
    comboGrid.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const card = event.target.closest(".combo-card");
      if (!card) return;
      event.preventDefault();
      handleComboCopy(card);
    });
  }

  document.getElementById("manual-refresh").addEventListener("click", () => {
    refreshLiveData("manual");
  });

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

function renderTrendline(values = []) {
  if (!values.length) {
    return `<div class="trendline"><span style="height: 50%"></span><span style="height: 50%"></span><span style="height: 50%"></span><span style="height: 50%"></span></div>`;
  }
  const normalized = normalizeSparkline(values);
  return `
    <div class="trendline">
      ${normalized
        .map(point => `<span style="height: ${Math.max(35, Math.min(point, 95))}%"></span>`)
        .join("")}
    </div>
  `;
}

function clearAdditionalOptions(select) {
  Array.from(select.querySelectorAll("option")).forEach(option => {
    if (option.value !== "all") {
      option.remove();
    }
  });
}

function formatRelativeTime(date) {
  const diffSeconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSeconds < 10) {
    return "только что";
  }
  if (diffSeconds < 60) {
    return `${diffSeconds} сек. назад`;
  }
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} мин. назад`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours} ч. назад`;
}

function formatClock(date) {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function pickRandom(array) {
  if (!array.length) return null;
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function clampPercent(value) {
  return Math.max(35, Math.min(92, value));
}

function clampOdds(value) {
  return Math.max(1.35, Math.min(2.65, value));
}

function createFeedEvent({ minutesAgo, type, context, title, description }) {
  return {
    id: `seed-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now() - minutesAgo * 60 * 1000,
    type,
    context,
    title,
    description
  };
}

function renderHeroStats() {
  const container = document.getElementById("hero-stats");
  if (!container) return;

  const totalMarkets = marketsData.length;
  if (!totalMarkets) {
    container.innerHTML = "";
    return;
  }
  const averageLoad = Math.round(
    marketsData.reduce((sum, item) => sum + item.loadPercent, 0) / totalMarkets
  );
  const highImpactCount = marketsData.filter(item => item.impact === "Высокий" || item.impact === "Экстремальный").length;
  const averageMargin = (
    marketsData.reduce((sum, item) => sum + item.margin, 0) / totalMarkets
  ).toFixed(1);

  const stats = [
    { label: "Активных коридоров", value: totalMarkets },
    { label: "Средний охват", value: `${averageLoad}%` },
    { label: "Средняя маржа", value: `${averageMargin}%` },
    { label: "Премиум окна", value: `${highImpactCount}` }
  ];

  container.innerHTML = stats
    .map(
      stat => `
        <div class="hero-stat">
          <span class="hero-stat__value">${stat.value}</span>
          <span class="hero-stat__label">${stat.label}</span>
        </div>
      `
    )
    .join("");
}

function renderQuickFilters() {
  const container = document.getElementById("quick-filters");
  if (!container) return;

  const sports = ["all", ...new Set(marketsData.map(item => item.sport))];
  container.innerHTML = "";

  sports.forEach(sport => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quick-filter";
    button.dataset.value = sport;
    button.textContent = sport === "all" ? "Все виды" : sport;
    container.append(button);
  });

  updateQuickFiltersActiveState();
}

function updateQuickFiltersActiveState() {
  const container = document.getElementById("quick-filters");
  const sportSelect = document.getElementById("sport-filter");
  if (!container || !sportSelect) return;
  const currentValue = sportSelect.value;
  container.querySelectorAll(".quick-filter").forEach(button => {
    button.classList.toggle("quick-filter--active", button.dataset.value === currentValue);
  });
}

function renderInsights() {
  const grid = document.getElementById("insights-grid");
  const meta = document.getElementById("insights-meta");
  if (!grid) return;

  if (!marketsData.length) {
    grid.innerHTML = `<div class="empty-state">Инсайтов пока нет — ждём новые данные</div>`;
    if (meta) {
      meta.textContent = "Нет активных событий";
    }
    return;
  }

  const widestWindow = marketsData.reduce(
    (acc, item) => (item.windowSize > acc.windowSize ? item : acc),
    marketsData[0]
  );
  const bestCoverage = marketsData.reduce(
    (acc, item) => (item.loadPercent > acc.loadPercent ? item : acc),
    marketsData[0]
  );
  const heaviestVolume = marketsData.reduce(
    (acc, item) => (item.loadValue > acc.loadValue ? item : acc),
    marketsData[0]
  );
  const averageLoad = Math.round(
    marketsData.reduce((sum, item) => sum + item.loadPercent, 0) / marketsData.length
  );
  const averageMargin = (
    marketsData.reduce((sum, item) => sum + item.margin, 0) / marketsData.length
  ).toFixed(1);

  const cards = [
    {
      title: "Самый широкий коридор",
      value: `${widestWindow.windowLabel}`,
      caption: `${widestWindow.match}`,
      detail: `${widestWindow.tournament} · ${widestWindow.sport}`
    },
    {
      title: "Лучший охват",
      value: `${bestCoverage.loadPercent}%`,
      caption: `${bestCoverage.marketLabel}`,
      detail: `${bestCoverage.match}`
    },
    {
      title: "Банк под контролем",
      value: `${formatCurrency(heaviestVolume.loadValue)}`,
      caption: `${heaviestVolume.marketLabel}`,
      detail: `${heaviestVolume.tournament}`
    }
  ];

  grid.innerHTML = cards
    .map(
      card => `
        <article class="insight-card">
          <h3>${card.title}</h3>
          <div class="insight-card__value">${card.value}</div>
          <div class="insight-card__meta">${card.caption}</div>
          <div class="insight-card__meta insight-card__meta--muted">${card.detail}</div>
        </article>
      `
    )
    .join("");

  const timestampLabel = new Date().toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  });

  if (meta) {
    meta.textContent = `Активно ${marketsData.length} коридоров · средний охват ${averageLoad}% · маржа ${averageMargin}% · ${timestampLabel}`;
  }
}

function renderCombos() {
  const grid = document.getElementById("combo-grid");
  if (!grid) return;

  grid.innerHTML = "";

  parlayIdeas.forEach(combo => {
    const card = document.createElement("article");
    card.className = "combo-card";
    card.dataset.comboId = combo.id;
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute(
      "aria-label",
      `Скопировать экспресс «${combo.title}» с итоговым коэффициентом ${combo.totalOdds.toFixed(2)}`
    );
    card.innerHTML = `
      <header class="combo-card__header">
        <div>
          <h3>${combo.title}</h3>
          <div class="combo-card__meta">${combo.risk} риск · уверенность ${combo.confidence}%</div>
        </div>
        <span class="combo-card__edge ${combo.edge.startsWith("+") ? "combo-card__edge--positive" : ""}">${combo.edge}</span>
      </header>
      <ul class="combo-card__legs">
        ${combo.legs
          .map(
            leg => `
              <li>
                <strong>${leg.match}</strong>
                <span>${leg.pick}</span>
                <span class="combo-card__tag">${leg.sport}</span>
              </li>
            `
          )
          .join("")}
      </ul>
      <p class="combo-card__comment">${combo.comment}</p>
      <footer class="combo-card__footer">
        <span class="combo-card__odds">Итоговый коэфф. ${combo.totalOdds.toFixed(2)}</span>
        <span class="combo-card__hint" data-default="Нажмите, чтобы скопировать" data-success="Экспресс скопирован!">Нажмите, чтобы скопировать</span>
      </footer>
    `;
    grid.append(card);
  });
}

function handleComboCopy(card) {
  const comboId = card.dataset.comboId;
  const combo = parlayIdeas.find(item => item.id === comboId);
  if (!combo) return;

  const text = [
    `Экспресс «${combo.title}» (${combo.edge})`,
    ...combo.legs.map((leg, index) => `${index + 1}. ${leg.match} — ${leg.pick}`),
    `Итоговый коэффициент: ${combo.totalOdds.toFixed(2)}`
  ].join("\n");

  const hint = card.querySelector(".combo-card__hint");

  const finalize = () => {
    if (!hint) return;
    hint.textContent = hint.dataset.success || "Скопировано";
    card.classList.add("combo-card--copied");
    if (comboFeedbackTimers.has(comboId)) {
      clearTimeout(comboFeedbackTimers.get(comboId));
    }
    comboFeedbackTimers.set(
      comboId,
      setTimeout(() => {
        card.classList.remove("combo-card--copied");
        hint.textContent = hint.dataset.default || "Нажмите, чтобы скопировать";
      }, 2200)
    );
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(finalize).catch(() => {
      copyTextFallback(text);
      finalize();
    });
  } else {
    copyTextFallback(text);
    finalize();
  }
}

function copyTextFallback(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
  } catch (error) {
    console.error("Не удалось скопировать экспресс", error);
  }
  textarea.remove();
}
