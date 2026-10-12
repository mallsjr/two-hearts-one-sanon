const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-navigation");
const themeButtons = [...document.querySelectorAll("[data-theme-choice]")];
const themeDescription = document.querySelector("#theme-description");
const themeCount = document.querySelector("#theme-count");

const themes = [
  {
    id: "woodland",
    description: "Enchanted Woodland · Deep pine, moss, and storybook details.",
  },
  {
    id: "meadow",
    description: "Wildflower Meadow · Soft sage, buttercream, and hand-drawn blooms.",
  },
  {
    id: "moonlit",
    description: "Moonlit Forest · Midnight greens, dusky skies, and soft golden light.",
  },
];

function selectTheme(themeId) {
  const themeIndex = themes.findIndex((theme) => theme.id === themeId);
  if (themeIndex < 0) return;

  document.body.dataset.theme = themeId;
  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === themeId));
  });
  if (themeDescription) themeDescription.textContent = themes[themeIndex].description;
  if (themeCount) themeCount.textContent = `${themeIndex + 1} / ${themes.length}`;
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => selectTheme(button.dataset.themeChoice));
});

document.querySelectorAll("[data-theme-step]").forEach((button) => {
  button.addEventListener("click", () => {
    const currentIndex = themes.findIndex((theme) => theme.id === document.body.dataset.theme);
    const step = Number(button.dataset.themeStep);
    const nextIndex = (currentIndex + step + themes.length) % themes.length;
    selectTheme(themes[nextIndex].id);
  });
});

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}
