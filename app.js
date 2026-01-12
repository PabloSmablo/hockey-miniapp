(function () {
  const tg = window.Telegram?.WebApp;

  // Работает и вне Telegram (в обычном браузере) — удобно для разработки
  const inTg = !!tg;

  if (inTg) {
    tg.ready();
    tg.expand();

    // Подхват темы Telegram (чтобы не выглядело "сайтом")
    const p = tg.themeParams || {};
    const root = document.documentElement.style;

    if (p.bg_color) root.setProperty("--bg", p.bg_color);
    if (p.text_color) root.setProperty("--text", p.text_color);
    if (p.hint_color) root.setProperty("--hint", p.hint_color);
    if (p.secondary_bg_color) root.setProperty("--card", p.secondary_bg_color);
  }

  const subtitle = document.getElementById("subtitle");
  subtitle.textContent = inTg
    ? "Открыто как Telegram Mini App"
    : "Открыто в браузере (для теста)";

  // Tabs
  const screens = {
    game: document.getElementById("screen-game"),
    table: document.getElementById("screen-table"),
    me: document.getElementById("screen-me"),
  };

  function showTab(name) {
    Object.entries(screens).forEach(([k, el]) => {
      el.classList.toggle("hidden", k !== name);
    });
    document.querySelectorAll(".tab").forEach((t) => {
      t.classList.toggle("active", t.dataset.tab === name);
    });
  }

  document.querySelectorAll(".tab").forEach((t) => {
    t.addEventListener("click", () => showTab(t.dataset.tab));
  });

  // Buttons (пока без API)
  const status = document.getElementById("status");
  document.getElementById("btn-yes").addEventListener("click", () => {
    status.textContent = "Статус: ✅ играю";
    if (inTg) tg.HapticFeedback?.impactOccurred("light");
  });
  document.getElementById("btn-maybe").addEventListener("click", () => {
    status.textContent = "Статус: ❓ под вопросом";
    if (inTg) tg.HapticFeedback?.impactOccurred("light");
  });
  document.getElementById("btn-no").addEventListener("click", () => {
    status.textContent = "Статус: ❌ не играю";
    if (inTg) tg.HapticFeedback?.impactOccurred("light");
  });
})();
