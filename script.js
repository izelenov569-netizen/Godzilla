const marketsData = [
  {
    id: 1,
    sport: "Футбол",
    tournament: "Лига чемпионов УЕФА",
    stage: "1/2 финала",
    match: "Манчестер Сити — Реал Мадрид",
    market: "match_winner",
    marketLabel: "Победа Манчестер Сити",
    loadPercent: 74,
    oddsStart: 1.95,
    oddsCurrent: 1.68,
    loadValue: 325000,
    impact: "Высокий",
    time: "22:00 MSK",
    movement: [52, 61, 68, 74],
    modelProbability: 0.64
  },
  {
    id: 2,
    sport: "Баскетбол",
    tournament: "NBA Плей-офф",
    stage: "Матч 5",
    match: "Лос-Анджелес Лейкерс — Голден Стэйт Уорриорз",
    market: "total_goals",
    marketLabel: "Тотал очков больше 223.5",
    loadPercent: 61,
    oddsStart: 1.92,
    oddsCurrent: 1.81,
    loadValue: 214000,
    impact: "Высокий",
    time: "05:30 MSK",
    movement: [45, 52, 57, 61],
    modelProbability: 0.58
  },
  {
    id: 3,
    sport: "Хоккей",
    tournament: "NHL",
    stage: "Регулярный сезон",
    match: "Торонто Мэйпл Лифс — Бостон Брюинз",
    market: "handicap",
    marketLabel: "Фора (-1.5) Торонто",
    loadPercent: 58,
    oddsStart: 2.15,
    oddsCurrent: 1.94,
    loadValue: 186000,
    impact: "Средний",
    time: "02:10 MSK",
    movement: [41, 47, 53, 58],
    modelProbability: 0.55
  },
  {
    id: 4,
    sport: "Теннис",
    tournament: "ATP Masters Рим",
    stage: "Полуфинал",
    match: "Новак Джокович — Карлос Алькарас",
    market: "total_goals",
    marketLabel: "Тотал сетов больше 2.5",
    loadPercent: 55,
    oddsStart: 2.25,
    oddsCurrent: 2.02,
    loadValue: 98000,
    impact: "Средний",
    time: "17:30 MSK",
    movement: [38, 44, 50, 55],
    modelProbability: 0.5
  },
  {
    id: 5,
    sport: "Единоборства",
    tournament: "UFC 300",
    stage: "Главный бой",
    match: "Ислам Махачев — Чарльз Оливейра",
    market: "match_winner",
    marketLabel: "Победа Ислам Махачев",
    loadPercent: 73,
    oddsStart: 1.85,
    oddsCurrent: 1.64,
    loadValue: 248000,
    impact: "Экстремальный",
    time: "07:15 MSK",
    movement: [55, 61, 67, 73],
    modelProbability: 0.69
  },
  {
    id: 6,
    sport: "Киберспорт",
    tournament: "The International",
    stage: "Гранд-финал",
    match: "Team Spirit — Gaimin Gladiators",
    market: "match_winner",
    marketLabel: "Победа Team Spirit",
    loadPercent: 67,
    oddsStart: 2.10,
    oddsCurrent: 1.88,
    loadValue: 198000,
    impact: "Высокий",
    time: "14:00 MSK",
    movement: [49, 55, 62, 67],
    modelProbability: 0.62
  },
  {
    id: 7,
    sport: "Футбол",
    tournament: "Мир РПЛ",
    stage: "Тур 26",
    match: "Зенит — ЦСКА",
    market: "both_score",
    marketLabel: "Обе забьют — Да",
    loadPercent: 63,
    oddsStart: 1.95,
    oddsCurrent: 1.82,
    loadValue: 156000,
    impact: "Средний",
    time: "19:00 MSK",
    movement: [44, 49, 56, 63],
    modelProbability: 0.57
  },
  {
    id: 8,
    sport: "Баскетбол",
    tournament: "Евролига",
    stage: "Финал четырёх",
    match: "Фенербахче — Олимпиакос",
    market: "handicap",
    marketLabel: "Фора (+4.5) Олимпиакос",
    loadPercent: 57,
    oddsStart: 1.98,
    oddsCurrent: 1.86,
    loadValue: 142000,
    impact: "Средний",
    time: "21:45 MSK",
    movement: [39, 45, 51, 57],
    modelProbability: 0.54
  }
];

const stableTournaments = [
  { name: "Лига чемпионов УЕФА", stability: "+7.8% ROI", matches: 48 },
  { name: "NBA Плей-офф", stability: "+6.4% ROI", matches: 36 },
  { name: "NHL регулярный сезон", stability: "+5.2% ROI", matches: 41 }
];

const forecasts = [
  { market: "Сити — победа", delta: "-0.11", confidence: 89 },
  { market: "Лейкерс vs Уорриорз тотал 223.5", delta: "-0.07", confidence: 76 },
  { market: "Махачев — победа", delta: "-0.08", confidence: 92 }
];

const parlayIdeas = [
  {
    id: "combo-1",
    title: "Вечерний фаворит",
    risk: "Сбалансированный",
    confidence: 82,
    totalOdds: 3.84,
    edge: "+7% EV",
    legs: [
      { match: marketsData[0].match, pick: marketsData[0].marketLabel, sport: marketsData[0].sport },
      { match: marketsData[3].match, pick: marketsData[3].marketLabel, sport: marketsData[3].sport }
    ],
    comment: "Сочетание топовых линий из футбола и тенниса для вечернего прайм-тайма."
  },
  {
    id: "combo-2",
    title: "Ночная очередь",
    risk: "Агрессивный",
    confidence: 76,
    totalOdds: 4.62,
    edge: "+11% EV",
    legs: [
      { match: marketsData[1].match, pick: marketsData[1].marketLabel, sport: marketsData[1].sport },
      { match: marketsData[2].match, pick: marketsData[2].marketLabel, sport: marketsData[2].sport },
      { match: marketsData[5].match, pick: marketsData[5].marketLabel, sport: marketsData[5].sport }
    ],
    comment: "Риски выше нормы, зато покрываем NBA, NHL и киберспорт в одной связке."
  },
  {
    id: "combo-3",
    title: "Выходной экспресс",
    risk: "Консервативный",
    confidence: 88,
    totalOdds: 2.91,
    edge: "+5% EV",
    legs: [
      { match: marketsData[6].match, pick: marketsData[6].marketLabel, sport: marketsData[6].sport },
      { match: marketsData[7].match, pick: marketsData[7].marketLabel, sport: marketsData[7].sport }
    ],
    comment: "Подборка с упором на стабильные чемпионаты и умеренную волатильность."
  }
];

const comboFeedbackTimers = new Map();

let liveFeedEvents = [
  createFeedEvent({
    minutesAgo: 4,
    type: "alert",
    context: `${marketsData[0].tournament} · ${marketsData[0].sport}`,
    title: marketsData[0].match,
    description: `Прогруз на ${marketsData[0].marketLabel.toLowerCase()} усилился — коэффициент упал до ${marketsData[0].oddsCurrent.toFixed(2)} при ${marketsData[0].loadPercent}% объёма.`
  }),
  createFeedEvent({
    minutesAgo: 8,
    type: "trend",
    context: `${marketsData[1].tournament} · ${marketsData[1].sport}`,
    title: marketsData[1].match,
    description: `Ставки на ${marketsData[1].marketLabel.toLowerCase()} растут: вероятность пробития увеличилась, текущий коэффициент ${marketsData[1].oddsCurrent.toFixed(2)}.`
  }),
  createFeedEvent({
    minutesAgo: 12,
    type: "live",
    context: `${marketsData[5].tournament} · ${marketsData[5].sport}`,
    title: marketsData[5].match,
    description: `Team Spirit получает поддержку сообщества: ${marketsData[5].loadPercent}% ставок и объём ${formatCurrency(marketsData[5].loadValue)}.`
  }),
  createFeedEvent({
    minutesAgo: 16,
    type: "trend",
    context: `${marketsData[6].tournament} · ${marketsData[6].sport}`,
    title: marketsData[6].match,
    description: `Игроки ждут обмен голами: ${marketsData[6].marketLabel} держится на ${marketsData[6].loadPercent}% прогруза.`
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
    const { edge, expectedReturn } = calculateEdge(item);
    const edgePercent = edge * 100;
    const evPercent = expectedReturn * 100;
    const valueClass = `market-card__ev-value ${edgePercent >= 0 ? "market-card__ev-value--positive" : "market-card__ev-value--negative"}`;
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
      <div class="market-card__ev">
        <div>
          <span class="market-card__ev-label">Value-индекс</span>
          <span class="${valueClass}">${formatPercent(edgePercent, { sign: true, maximumFractionDigits: 1 })}</span>
        </div>
        <span class="market-card__ev-note">EV ${formatPercent(evPercent, { sign: true, maximumFractionDigits: 1 })}</span>
      </div>
      <div class="market-card__trend" aria-hidden="true">
        <span class="market-card__trend-label">Динамика прогруза</span>
        ${renderTrendline(item.movement)}
      </div>
    `;
    grid.append(card);
  });

  if (!filteredMarkets.length) {
    grid.innerHTML = `<div class="empty-state">Нет прогнозов по выбранным фильтрам</div>`;
  }

  renderSignals(filteredMarkets);
  updateQuickFiltersActiveState();
  renderOptimizer(filteredMarkets);
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
    empty.textContent = "Нет сигналов по текущим фильтрам";
    signalList.append(empty);
    return;
  }

  candidates.forEach(item => {
    const li = document.createElement("li");
    li.className = "live-card__item";
    const oddsFell = item.oddsCurrent < item.oddsStart;
    const trendClass = `trend ${oddsFell ? "trend--down" : "trend--up"}`;
    const arrow = oddsFell ? "↓" : "↑";
    const delta = Math.abs(item.oddsCurrent - item.oddsStart).toFixed(2);
    li.innerHTML = `
      <strong>${item.match}</strong>
      <div class="live-card__meta">
        <span>${item.tournament} · ${item.sport}</span>
        <span class="${trendClass}">${arrow} ${item.oddsCurrent.toFixed(2)}</span>
      </div>
      <div class="live-card__meta">
        <span>Прогруз ${item.loadPercent}%</span>
        <span>Δ ${oddsFell ? "-" : "+"}${delta}</span>
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
      <div class="live-feed__text">Ожидаем новые события перед стартом матчей.</div>
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

  market.movement.push(market.loadPercent);
  market.movement = market.movement.slice(-4);

  const oddsDifference = Math.abs(market.oddsCurrent - previousOdds).toFixed(2);
  const oddsFell = market.oddsCurrent < previousOdds;
  const eventType = source === "manual" ? "live" : oddsFell ? "alert" : "trend";
  const description = `Ставка ${market.marketLabel.toLowerCase()} ${oddsFell ? "получила дополнительный прогруз" : "испытывает коррекцию"}: коэффициент ${oddsFell ? "опустился" : "поднялся"} до ${market.oddsCurrent.toFixed(2)} (Δ ${oddsDifference}). Объём ${formatCurrency(market.loadValue)} при ${market.loadPercent}% ставок.`;

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

  const bankrollForm = document.getElementById("bankroll-form");
  if (bankrollForm) {
    bankrollForm.addEventListener("submit", event => event.preventDefault());
    bankrollForm.addEventListener("input", updateBankrollSuggestion);
    bankrollForm.addEventListener("change", updateBankrollSuggestion);
  }

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

function formatPercent(value, { sign = false, maximumFractionDigits = 1 } = {}) {
  if (!Number.isFinite(value)) {
    return "—";
  }
  const absolute = Math.abs(value);
  const formatted = absolute.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits
  });
  if (sign) {
    if (value > 0) return `+${formatted}%`;
    if (value < 0) return `-${formatted}%`;
    return "0%";
  }
  return `${value < 0 ? "-" : ""}${formatted}%`;
}

function impliedProbability(odds) {
  if (!Number.isFinite(odds) || odds <= 0) {
    return 0;
  }
  return 1 / odds;
}

function calculateEdge(market) {
  const modelProbability = Number(market.modelProbability ?? 0);
  const implied = impliedProbability(market.oddsCurrent);
  const edge = modelProbability - implied;
  const expectedReturn = modelProbability * market.oddsCurrent - 1;
  return { edge, expectedReturn };
}

function getEnrichedMarkets(source = marketsData) {
  const dataset = Array.isArray(source) ? source : marketsData;
  return dataset.map(item => {
    const { edge, expectedReturn } = calculateEdge(item);
    return { ...item, edge, expectedReturn };
  });
}

function calculateKellyFraction(market) {
  const b = Number(market.oddsCurrent) - 1;
  if (!Number.isFinite(b) || b <= 0) {
    return 0;
  }
  const p = Number(market.modelProbability ?? 0);
  if (!Number.isFinite(p) || p <= 0) {
    return 0;
  }
  const q = 1 - p;
  const fraction = (b * p - q) / b;
  return Math.max(0, fraction);
}

function getRiskMultiplier(profile = "balanced") {
  switch (profile) {
    case "conservative":
      return 0.5;
    case "aggressive":
      return 1;
    default:
      return 0.75;
  }
}

function roundToStep(value, step = 100) {
  if (!Number.isFinite(value) || !Number.isFinite(step) || step <= 0) {
    return 0;
  }
  return Math.round(value / step) * step;
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

  const enrichedMarkets = getEnrichedMarkets();
  const totalMarkets = enrichedMarkets.length;
  if (!totalMarkets) {
    container.innerHTML = "";
    return;
  }
  const averageLoad = Math.round(enrichedMarkets.reduce((sum, item) => sum + item.loadPercent, 0) / totalMarkets);
  const valueMarkets = enrichedMarkets.filter(item => item.edge > 0);
  const topEv = enrichedMarkets.reduce((acc, item) => (item.expectedReturn > acc.expectedReturn ? item : acc), enrichedMarkets[0]);
  const stats = [
    { label: "Прогнозов в ленте", value: totalMarkets },
    { label: "Value-линий", value: `${valueMarkets.length}/${totalMarkets}` },
    { label: "Средний прогруз", value: `${averageLoad}%` },
    { label: "Макс. EV", value: formatPercent(topEv.expectedReturn * 100, { sign: true, maximumFractionDigits: 1 }) }
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

  const enriched = getEnrichedMarkets();
  const busiestMarket = enriched.reduce((acc, item) => (item.loadPercent > acc.loadPercent ? item : acc), enriched[0]);
  const sharpestMove = enriched
    .map(item => ({ ...item, delta: Math.abs(item.oddsCurrent - item.oddsStart) }))
    .sort((a, b) => b.delta - a.delta)[0];
  const heaviestVolume = enriched.reduce((acc, item) => (item.loadValue > acc.loadValue ? item : acc), enriched[0]);
  const averageLoad = Math.round(enriched.reduce((sum, item) => sum + item.loadPercent, 0) / enriched.length);
  const valueMarkets = enriched.filter(item => item.edge > 0);
  const topValue = valueMarkets.length
    ? valueMarkets.sort((a, b) => b.edge - a.edge)[0]
    : enriched[0];
  const averageEv = valueMarkets.length
    ? valueMarkets.reduce((sum, item) => sum + item.expectedReturn, 0) / valueMarkets.length
    : 0;

  const cards = [
    {
      title: "Максимальный прогруз",
      value: `${busiestMarket.loadPercent}%`,
      caption: `${busiestMarket.match}`,
      detail: `${busiestMarket.tournament} · ${busiestMarket.sport}`
    },
    {
      title: "Резкое движение линии",
      value: `${sharpestMove.delta.toFixed(2)}`,
      caption: `${sharpestMove.oddsStart.toFixed(2)} → ${sharpestMove.oddsCurrent.toFixed(2)}`,
      detail: `${sharpestMove.match}`
    },
    {
      title: "Пул объёма 24ч",
      value: `${formatCurrency(heaviestVolume.loadValue)}`,
      caption: `${heaviestVolume.match}`,
      detail: `${heaviestVolume.tournament}`
    },
    {
      title: "Value-индекс",
      value: valueMarkets.length ? formatPercent(topValue.edge * 100, { sign: true, maximumFractionDigits: 1 }) : "—",
      caption: valueMarkets.length ? `${topValue.match}` : "Ожидаем новые value-сценарии",
      detail: `Value-линий ${valueMarkets.length}/${enriched.length}`
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

  if (meta) {
    meta.textContent = `Отслеживаем ${enriched.length} событий · средний прогруз ${averageLoad}% · value-линий ${valueMarkets.length}/${
      enriched.length
    } · средний EV ${formatPercent(averageEv * 100, { maximumFractionDigits: 1 })} · ${new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit"
    })}`;
  }
}

function renderOptimizer(source = marketsData) {
  const tableBody = document.getElementById("value-table");
  const meta = document.getElementById("value-meta");
  const marketSelect = document.getElementById("bankroll-market");
  if (!tableBody) return;

  const dataset = Array.isArray(source) && source.length ? source : marketsData;
  const enriched = getEnrichedMarkets(dataset).sort((a, b) => b.edge - a.edge);

  if (!enriched.length) {
    tableBody.innerHTML = `<tr><td colspan="4" class="value-table__empty">Нет линий для анализа</td></tr>`;
    if (meta) {
      meta.textContent = "Нет активных событий";
    }
    if (marketSelect) {
      marketSelect.innerHTML = "";
    }
    updateBankrollSuggestion();
    return;
  }

  tableBody.innerHTML = enriched
    .slice(0, 4)
    .map(item => `
      <tr>
        <td>
          <div class="value-table__title">
            <strong>${item.match}</strong>
            <span class="value-table__meta">${item.sport} · ${item.tournament}</span>
          </div>
        </td>
        <td>${item.oddsCurrent.toFixed(2)}</td>
        <td>
          <span class="value-chip${item.edge >= 0 ? "" : " value-chip--negative"}">
            ${formatPercent(item.edge * 100, { sign: true, maximumFractionDigits: 1 })}
          </span>
        </td>
        <td>${formatPercent(item.expectedReturn * 100, { sign: true, maximumFractionDigits: 1 })}</td>
      </tr>
    `)
    .join("");

  const positive = enriched.filter(item => item.edge > 0);
  const averageEv = positive.length
    ? positive.reduce((sum, item) => sum + item.expectedReturn, 0) / positive.length
    : 0;

  if (meta) {
    meta.textContent = `Value-линий ${positive.length}/${enriched.length} · средний EV ${formatPercent(averageEv * 100, {
      maximumFractionDigits: 1
    })}`;
  }

  if (marketSelect) {
    const previousValue = marketSelect.value;
    const fullEnriched = getEnrichedMarkets();
    marketSelect.innerHTML = fullEnriched
      .map(item => `<option value="${item.id}">${item.match} · ${item.marketLabel} (${item.oddsCurrent.toFixed(2)})</option>`)
      .join("");

    if (previousValue && fullEnriched.some(item => String(item.id) === previousValue)) {
      marketSelect.value = previousValue;
    } else if (fullEnriched.length) {
      const fallback = fullEnriched.find(item => item.edge > 0) || fullEnriched[0];
      marketSelect.value = String(fallback.id);
    }
  }

  updateBankrollSuggestion();
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

function updateBankrollSuggestion() {
  const result = document.getElementById("bankroll-result");
  if (!result) return;
  const bankrollInput = document.getElementById("bankroll-amount");
  const marketSelect = document.getElementById("bankroll-market");
  const riskSelect = document.getElementById("risk-profile");
  const note = document.getElementById("bankroll-note");

  const bankroll = Number(bankrollInput?.value || 0);
  const selectedId = marketSelect?.value;
  const selectedMarket = marketsData.find(item => String(item.id) === selectedId);

  if (!bankroll || bankroll <= 0 || !selectedMarket) {
    result.textContent = "Введите банк и выберите событие для расчёта рекомендации.";
    if (note) {
      note.textContent = "Фракция рассчитывается по текущему коэффициенту и нашей модели вероятностей.";
    }
    return;
  }

  const { edge, expectedReturn } = calculateEdge(selectedMarket);
  const kellyFraction = calculateKellyFraction(selectedMarket);
  const riskMultiplier = getRiskMultiplier(riskSelect?.value);
  const adjustedFraction = kellyFraction * riskMultiplier;

  if (edge <= 0 || adjustedFraction <= 0) {
    result.textContent = `По выбранной линии нет value — ставка не рекомендована.`;
    if (note) {
      note.textContent = `Value ${formatPercent(edge * 100, { sign: true, maximumFractionDigits: 1 })}, базовая фракция Келли ${formatPercent(
        kellyFraction * 100,
        { maximumFractionDigits: 1 }
      )}.`;
    }
    return;
  }

  const stake = Math.max(0, roundToStep(bankroll * adjustedFraction, 100));

  if (!stake) {
    result.textContent = "Value подтверждена, но размер банка слишком мал для ставки.";
    if (note) {
      note.textContent = `Базовая фракция Келли ${formatPercent(kellyFraction * 100, { maximumFractionDigits: 1 })}.`;
    }
    return;
  }

  const valueText = formatPercent(edge * 100, { sign: true, maximumFractionDigits: 1 });
  const evText = formatPercent(expectedReturn * 100, { sign: true, maximumFractionDigits: 1 });
  const fractionText = formatPercent(adjustedFraction * 100, { maximumFractionDigits: 1 });

  result.innerHTML = `
    <strong>${formatCurrency(stake)}</strong>
    <div class="bankroll-result__meta">
      Value ${valueText} · EV ${evText} · Фракция ${fractionText}
    </div>
  `;

  if (note) {
    note.textContent = `Базовая фракция Келли ${formatPercent(kellyFraction * 100, { maximumFractionDigits: 1 })}, выбранный профиль умножает её на ${riskMultiplier}.`;
  }
}
