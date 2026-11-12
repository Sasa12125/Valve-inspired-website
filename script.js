(function () {
  "use strict";

  const btn = document.getElementById("theme-toggle");
  const html = document.documentElement;

  const THEMES = { DARK: "dark", LIGHT: "light" };
  const BTN_TEXT = {
    [THEMES.DARK]: "Tema Claro",
    [THEMES.LIGHT]: "Tema Escuro"
  };
  const ARIA_LABEL = {
    [THEMES.DARK]: "Ativar tema claro",
    [THEMES.LIGHT]: "Ativar tema escuro"
  };

  function applyTheme(theme) {
    html.dataset.theme = theme;
    btn.textContent = BTN_TEXT[theme];
    btn.setAttribute("aria-label", ARIA_LABEL[theme]);
    localStorage.setItem("valve-theme", theme);
  }

  function getInitialTheme() {
    const saved = localStorage.getItem("valve-theme");
    if (saved === THEMES.DARK || saved === THEMES.LIGHT) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? THEMES.DARK : THEMES.LIGHT;
  }

  function toggleTheme() {
    const current = html.dataset.theme || getInitialTheme();
    const next = current === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    applyTheme(next);
  }

  function init() {
    if (!btn) return;
    applyTheme(getInitialTheme());
    btn.addEventListener("click", toggleTheme);
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleTheme();
      }
    });
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("valve-theme")) {
        applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
      }
    });
    console.log("[Valve Page] Theme toggle inicializado");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();