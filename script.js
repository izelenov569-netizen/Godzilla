const marketsData = [
  {
    id: 1,
    sport: "PS5",
    tournament: "FUT Champions Finals",
    stage: "Раунд 5",
    match: "Mkers_Dani — Fnatic_Tekkz",
    market: "match_winner",
    marketLabel: "Победа Fnatic_Tekkz",
    loadPercent: 72,
    oddsStart: 2.05,
    oddsCurrent: 1.78,
    loadValue: 245000,
    impact: "Высокий",
    time: "21:45 MSK",
    movement: [51, 58, 66, 72]
  },
  {
    id: 2,
    sport: "Xbox",
    tournament: "Global Series Qualifier",
    stage: "1/8 финала",
    match: "RBLZ_Henry — Hashtag Tom",
    market: "total_goals",
    marketLabel: "Тотал больше 3.5",
    loadPercent: 64,
    oddsStart: 2.12,
    oddsCurrent: 1.95,
    loadValue: 183000,
    impact: "Средний",
    time: "19:10 MSK",
    movement: [43, 52, 58, 64]
  },
  {
    id: 3,
    sport: "PS5",
    tournament: "EA SPORTS Cup",
    stage: "Групповой этап",
    match: "FUTWIZ Marko — Ajax Lev",
    market: "handicap",
    marketLabel: "Фора (-1.5) FUTWIZ Marko",
    loadPercent: 59,
    oddsStart: 1.98,
    oddsCurrent: 1.82,
    loadValue: 162000,
    impact: "Средний",
    time: "16:30 MSK",
    movement: [40, 47, 53, 59]
  },
  {
    id: 4,
    sport: "PC",
    tournament: "Weekend League Elite",
    stage: "Топ-32",
    match: "Virtus Pro Andrey — G2 Neat",
    market: "both_score",
    marketLabel: "Обе забьют",
    loadPercent: 68,
    oddsStart: 1.74,
    oddsCurrent: 1.61,
    loadValue: 142000,
    impact: "Высокий",
    time: "00:25 MSK",
    movement: [49, 55, 61, 68]
  },
  {
    id: 5,
    sport: "PS5",
    tournament: "Ultimate Team Cups",
    stage: "Полуфинал",
    match: "SPQR Crazy — Tricked Facito",
    market: "total_goals",
    marketLabel: "Тотал меньше 4.5",
    loadPercent: 53,
    oddsStart: 1.87,
    oddsCurrent: 1.74,
    loadValue: 98000,
    impact: "Низкий",
    time: "13:40 MSK",
    movement: [37, 44, 49, 53]
  },
  {
    id: 6,
    sport: "Xbox",
    tournament: "FIFAe Nations",
    stage: "Раунд 2",
    match: "France eLes Bleus — Germany eNational",
    market: "match_winner",
    marketLabel: "Победа France eLes Bleus",
    loadPercent: 76,
    oddsStart: 1.92,
    oddsCurrent: 1.68,
    loadValue: 273000,
    impact: "Экстремальный",
    time: "18:05 MSK",
    movement: [58, 63, 70, 76]
  },
  {
    id: 7,
    sport: "PS5",
    tournament: "FUT Champions Finals",
    stage: "Раунд 7",
    match: "Aleksey Parshikov — K1llerZlatan",
    market: "handicap",
    marketLabel: "Фора (+1.5) Parshikov",
    loadPercent: 61,
    oddsStart: 2.22,
    oddsCurrent: 2.04,
    loadValue: 117000,
    impact: "Средний",
    time: "23:20 MSK",
    movement: [42, 51, 56, 61]
  },
  {
    id: 8,
    sport: "PC",
    tournament: "Champions Play-In",
    stage: "Финал",
    match: "Team Liquid Levy — Sampi Emerick",
    market: "match_winner",
    marketLabel: "Победа Team Liquid Levy",
    loadPercent: 69,
    oddsStart: 1.88,
    oddsCurrent: 1.71,
    loadValue: 205000,
    impact: "Высокий",
    time: "20:15 MSK",
    movement: [50, 57, 63, 69]
  }
];

const stableTournaments = [
  { name: "FUT Champions (PS5)", stability: "+8.4% ROI", matches: 52 },
  { name: "EA SPORTS Cup (Xbox)", stability: "+6.9% ROI", matches: 38 },
  { name: "FIFAe Nations (онлайн)", stability: "+5.1% ROI", matches: 41 }
];

const forecasts = [
  { market: "Fnatic_Tekkz — победа", delta: "-0.09", confidence: 88 },
  { market: "RBLZ_Henry vs Tom тотал 3.5", delta: "-0.06", confidence: 73 },
  { market: "France eLes Bleus — победа", delta: "-0.11", confidence: 91 }
];

let liveFeedEvents = [
  createFeedEvent({
    minutesAgo: 4,
    type: "alert",
    context: `${marketsData[0].tournament} · ${marketsData[0].sport}`,
    title: marketsData[0].match,
    description: `Резкий прогруз на ${marketsData[0].marketLabel.toLowerCase()} — коэффициент опустился до ${marketsData[0].oddsCurrent.toFixed(2)} при ${marketsData[0].loadPercent}% объёма.`
  }),
  createFeedEvent({
    minutesAgo: 9,
    type: "trend",
    context: `${marketsData[1].tournament} · ${marketsData[1].sport}`,
    title: marketsData[1].match,
    description: `Ставки на ${marketsData[1].marketLabel.toLowerCase()} увеличились: вероятность пробития выросла, коэффициент теперь ${marketsData[1].oddsCurrent.toFixed(2)}.`
  }),
  createFeedEvent({
    minutesAgo: 12,
    type: "live",
    context: `${marketsData[5].tournament} · ${marketsData[5].sport}`,
    title: marketsData[5].match,
    description: `Команда France eLes Bleus лидирует в голосовании капперов, ${marketsData[5].loadPercent}% ставок за победу и объём ${formatCurrency(marketsData[5].loadValue)}.`
  }),
  createFeedEvent({
    minutesAgo: 15,
    type: "trend",
    context: `${marketsData[7].tournament} · ${marketsData[7].sport}`,
    title: marketsData[7].match,
    description: `Игроки поддерживают фаворита: ${marketsData[7].marketLabel} держится на ${marketsData[7].loadPercent}% прогруза.`
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
