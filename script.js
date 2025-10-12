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
    movement: [52, 61, 68, 74]
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
    movement: [45, 52, 57, 61]
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
    movement: [41, 47, 53, 58]
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
    movement: [38, 44, 50, 55]
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
    movement: [55, 61, 67, 73]
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
    movement: [49, 55, 62, 67]
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
    movement: [44, 49, 56, 63]
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
    movement: [39, 45, 51, 57]
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

  renderFilters();
  renderMarkets();
  renderAnalytics();
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

  if (!filteredMarkets.length) {
    grid.innerHTML = `<div class="empty-state">Нет прогнозов по выбранным фильтрам</div>`;
  }

  renderSignals(filteredMarkets);
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
