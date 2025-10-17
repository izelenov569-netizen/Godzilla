const heroStats = [
  { value: "1,5 сек", label: "Средняя задержка в ультрарежиме" },
  { value: "18 400+", label: "Трансляций в каталоге VelocityCast" },
  { value: "4K HDR", label: "Максимальное качество потока" },
  { value: "12 устройств", label: "Поддерживаемых платформ и плееров" }
];

const tickerEvents = [
  { tag: "LIVE", text: "Финал КХЛ · режим без задержки подключён" },
  { tag: "NEW", text: "Формула 1 · доступна телеметрия болидов в реальном времени" },
  { tag: "BOOST", text: "НБА · мультиэкран с 4 углами камеры и чат-комментарием" }
];

const features = [
  {
    icon: "⚡",
    title: "Ультраскоростной поток",
    description:
      "Смотреть спорт с задержкой до 1,5 секунды благодаря WebRTC и CDN-узлам, расположенным в 36 городах."
  },
  {
    icon: "🎥",
    title: "Персональный режиссёр",
    description:
      "Создавайте собственные ракурсы, добавляйте графику и делитесь приватными ссылками с друзьями."
  },
  {
    icon: "📱",
    title: "Синхронизация с беттингом",
    description:
      "Интеграция с фэнтези-лигами и букмекерскими приложениями: обновления коэффициентов без переключения окна."
  },
  {
    icon: "🤖",
    title: "Умные подсказки",
    description:
      "Алгоритмы подсказывают ключевые моменты, возможные VR-повторы и автоматически собирают хайлайты."
  }
];

const schedule = [
  {
    sport: "Футбол",
    league: "Лига чемпионов",
    title: "Манчестер Сити — Бавария",
    start: "22:00",
    mode: "ultra",
    quality: "4K HDR",
    description: "Ультраскоростная трансляция с аналитикой xG и 6 камерами.",
    extras: ["Синхронизация с Fantasy League", "Интерактивные комментарии"]
  },
  {
    sport: "Хоккей",
    league: "КХЛ Финал",
    title: "Ак Барс — СКА",
    start: "19:30",
    mode: "multiview",
    quality: "1440p",
    description: "Мультиэкран с bench-камерой и телеметрией скорости бросков.",
    extras: ["Графика силы броска", "Студийный чат"]
  },
  {
    sport: "Баскетбол",
    league: "NBA",
    title: "Лейкерс — Уорриорз",
    start: "05:00",
    mode: "ultra",
    quality: "1080p/120",
    description: "Ускоренный поток с данными Second Spectrum и AR-повторами.",
    extras: ["Статистика в реальном времени", "Виртуальные ракурсы"]
  },
  {
    sport: "Автоспорт",
    league: "Формула 1",
    title: "Гран-при Монцы",
    start: "16:00",
    mode: "mobile",
    quality: "720p",
    description: "Лёгкий поток для путешествий с телеметрией DRS и картой трассы.",
    extras: ["Push-уведомления", "Режим экономии трафика"]
  },
  {
    sport: "Киберспорт",
    league: "The International",
    title: "Team Spirit — Gaimin Gladiators",
    start: "14:00",
    mode: "multiview",
    quality: "1080p",
    description: "Четыре POV потока и статистика драфта в реальном времени.",
    extras: ["Интерактивные пики", "Голосовой чат"]
  },
  {
    sport: "Теннис",
    league: "ATP Masters",
    title: "Джокович — Алькарас",
    start: "18:30",
    mode: "ultra",
    quality: "4K",
    description: "Режим PointCast с графикой траекторий и мгновенными повторами.",
    extras: ["Аналитика розыгрышей", "Сохранение клипов"]
  }
];

const technologies = [
  {
    label: "Edge CDN",
    title: "36 узлов доставки",
    description:
      "Распределённая сеть по Европе и Азии сокращает путь сигнала и стабилизирует поток даже в часы пиковой нагрузки."
  },
  {
    label: "Adaptive Bitrate",
    title: "До 12 профилей качества",
    description:
      "Алгоритм автоматически подбирает оптимальное разрешение и частоту кадров, не обрывая трансляцию."
  },
  {
    label: "Predictive Replay",
    title: "Повторы за 3 секунды",
    description:
      "Модель машинного обучения заранее отмечает потенциально ключевые моменты и готовит клипы к публикации."
  },
  {
    label: "Sync API",
    title: "Интеграции и виджеты",
    description:
      "API открывает события, таймкоды и телеметрию для медиацентров, баров и сторонних приложений."
  }
];

const state = {
  theme: localStorage.getItem("velocity-theme") || "dark",
  lastUpdated: Date.now()
};

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("data-theme", state.theme);
  const toggleThemeBtn = document.getElementById("toggle-theme");
  toggleThemeBtn.textContent = state.theme === "dark" ? "Светлая тема" : "Тёмная тема";

  renderHeroStats();
  renderTicker();
  renderFeatures();
  renderFilters();
  renderSchedule();
  renderTech();
  updateTimestamp();
  setupAccordion();

  toggleThemeBtn.addEventListener("click", toggleTheme);
  document.getElementById("sport-filter").addEventListener("change", renderSchedule);
  document.getElementById("mode-filter").addEventListener("change", renderSchedule);
  document.getElementById("manual-refresh").addEventListener("click", () => {
    state.lastUpdated = Date.now();
    renderSchedule(true);
    updateTimestamp();
  });
});

function renderHeroStats() {
  const container = document.getElementById("hero-stats");
  container.innerHTML = "";
  heroStats.forEach(stat => {
    const card = document.createElement("div");
    card.className = "hero-stat";
    card.innerHTML = `
      <span class="hero-stat__value">${stat.value}</span>
      <span class="hero-stat__label">${stat.label}</span>
    `;
    container.append(card);
  });
}

function renderTicker() {
  const ticker = document.getElementById("hero-ticker");
  ticker.innerHTML = "";
  tickerEvents.forEach(event => {
    const row = document.createElement("div");
    row.className = "ticker__row";
    row.innerHTML = `
      <span>${event.tag}</span>
      <span>${event.text}</span>
    `;
    ticker.append(row);
  });
}

function renderFeatures() {
  const grid = document.getElementById("feature-grid");
  grid.innerHTML = "";
  features.forEach(feature => {
    const card = document.createElement("article");
    card.className = "feature-card";
    card.innerHTML = `
      <div class="feature-card__icon">${feature.icon}</div>
      <h3>${feature.title}</h3>
      <p>${feature.description}</p>
    `;
    grid.append(card);
  });
}

function renderFilters() {
  const sportFilter = document.getElementById("sport-filter");
  const sports = Array.from(new Set(schedule.map(item => item.sport)));
  sportFilter.innerHTML = '<option value="all">Все</option>';
  sports.forEach(sport => {
    const option = document.createElement("option");
    option.value = sport;
    option.textContent = sport;
    sportFilter.append(option);
  });
}

function renderSchedule(shuffle = false) {
  const grid = document.getElementById("schedule-grid");
  grid.innerHTML = "";
  const sportFilter = document.getElementById("sport-filter").value;
  const modeFilter = document.getElementById("mode-filter").value;

  let items = [...schedule];
  if (shuffle) {
    items = items.sort(() => Math.random() - 0.5);
  }

  items
    .filter(item => (sportFilter === "all" ? true : item.sport === sportFilter))
    .filter(item => (modeFilter === "all" ? true : item.mode === modeFilter))
    .forEach(item => {
      const card = document.createElement("article");
      card.className = "schedule-card";
      card.innerHTML = `
        <div class="schedule-card__header">
          <div>
            <h3>${item.title}</h3>
            <div class="schedule-card__meta">${item.league} · ${item.sport}</div>
          </div>
          <span class="badge">${formatModeLabel(item.mode)}</span>
        </div>
        <p>${item.description}</p>
        <div class="schedule-card__meta">Старт в ${item.start} · ${item.quality}</div>
        <ul>
          ${item.extras.map(extra => `<li>${extra}</li>`).join("")}
        </ul>
      `;
      grid.append(card);
    });

  if (!grid.children.length) {
    grid.innerHTML = '<div class="empty-state">Нет эфиров по выбранным параметрам</div>';
  }
}

function renderTech() {
  const grid = document.getElementById("tech-grid");
  grid.innerHTML = "";
  technologies.forEach(tech => {
    const card = document.createElement("article");
    card.className = "tech-card";
    card.innerHTML = `
      <span class="tech-card__label">${tech.label}</span>
      <h3>${tech.title}</h3>
      <p>${tech.description}</p>
    `;
    grid.append(card);
  });
}

function updateTimestamp() {
  const label = document.getElementById("last-update");
  const formatter = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit"
  });
  label.textContent = `Обновлено в ${formatter.format(state.lastUpdated)}`;
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", state.theme);
  localStorage.setItem("velocity-theme", state.theme);
  this.textContent = state.theme === "dark" ? "Светлая тема" : "Тёмная тема";
}

function setupAccordion() {
  const accordion = document.getElementById("faq-accordion");
  accordion.querySelectorAll(".accordion__trigger").forEach(button => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      accordion.querySelectorAll(".accordion__trigger").forEach(other => {
        if (other !== button) {
          other.setAttribute("aria-expanded", "false");
          other.nextElementSibling.hidden = true;
        }
      });
      button.setAttribute("aria-expanded", String(!expanded));
      button.nextElementSibling.hidden = expanded;
    });
  });
}

function formatModeLabel(mode) {
  switch (mode) {
    case "ultra":
      return "Ультраскоростной";
    case "multiview":
      return "Мультиэкран";
    case "mobile":
      return "Мобильный";
    default:
      return mode;
  }
}
