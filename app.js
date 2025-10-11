const EVENTS_ENDPOINT = "data/events.json";

const loadingContainer = document.getElementById("loading-state");
const eventsGrid = document.getElementById("events-grid");
const statsGrid = document.getElementById("stats");
const filterButtons = document.querySelectorAll(".filter-button");
const eventTemplate = document.getElementById("event-card-template");
const skeletonTemplate = document.getElementById("skeleton-card-template");
const statTemplate = document.getElementById("stat-card-template");

const formatNumber = (value) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(value);

const SPORT_LABELS = {
  football: "Футбол",
  basketball: "Баскетбол",
  tennis: "Теннис",
  hockey: "Хоккей",
  volleyball: "Волейбол",
};

async function fetchWithDelay(url, delay = 1400) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Не удалось загрузить данные: ${response.status}`);
  }
  return response.json();
}

function createSkeletonCards(count = 6) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < count; i += 1) {
    fragment.appendChild(skeletonTemplate.content.cloneNode(true));
  }
  loadingContainer.innerHTML = "";
  loadingContainer.appendChild(fragment);
}

function renderEvents(events) {
  const fragment = document.createDocumentFragment();
  events.forEach((event) => {
    const node = eventTemplate.content.cloneNode(true);
    node.querySelector(".league").textContent = event.league;
    node.querySelector(".sport-tag").textContent = SPORT_LABELS[event.sport] ?? "Спорт";
    node.querySelector(".teams").textContent = `${event.home} — ${event.away}`;
    node.querySelector(".start-time").textContent = `Начало: ${event.start}`;
    node.querySelector(".market-bet").textContent = event.market.bet;
    node.querySelector(".market-odds").textContent = event.market.odds;
    node.querySelector(".market-volume").textContent = `${formatNumber(event.market.volume)} ₽`;
    const article = node.querySelector(".event-card");
    article.dataset.sport = event.sport;
    fragment.appendChild(node);
  });
  eventsGrid.innerHTML = "";
  eventsGrid.appendChild(fragment);
}

function renderStats(stats) {
  const fragment = document.createDocumentFragment();
  stats.forEach((stat) => {
    const node = statTemplate.content.cloneNode(true);
    node.querySelector(".stat-title").textContent = stat.title;
    node.querySelector(".stat-value").textContent = stat.value;
    const change = node.querySelector(".stat-change");
    change.textContent = stat.change;
    change.classList.toggle("positive", stat.trend === "up");
    change.classList.toggle("negative", stat.trend === "down");
    fragment.appendChild(node);
  });
  statsGrid.innerHTML = "";
  statsGrid.appendChild(fragment);
}

function filterEvents(sport) {
  const cards = eventsGrid.querySelectorAll(".event-card");
  cards.forEach((card) => {
    const isVisible = sport === "all" || card.dataset.sport === sport;
    card.toggleAttribute("hidden", !isVisible);
  });
}

function bindFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      filterEvents(button.dataset.filter);
    });
  });
}

async function bootstrap() {
  createSkeletonCards();
  try {
    const data = await fetchWithDelay(EVENTS_ENDPOINT);
    renderEvents(data.events);
    renderStats(data.stats);
    eventsGrid.hidden = false;
    loadingContainer.hidden = true;
  } catch (error) {
    loadingContainer.innerHTML = `<p class="error">${error.message}</p>`;
    console.error(error);
  }
}

bindFilters();
bootstrap();
