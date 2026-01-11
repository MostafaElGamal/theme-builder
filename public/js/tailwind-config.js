import { generateColorShades } from "./generate-colors-shades.js";

//
//

const DEFAULT_COLOR = "#178787";
const STORAGE_KEY = "primary-color";

window.themeConfig = {
  "--breakpoint-sm": "640px",
  "--breakpoint-md": "768px",
  "--breakpoint-lg": "1024px",
  "--breakpoint-xl": "1350px",
};

// Generate theme CSS from config object
function configToTheme(config) {
  let themeContent = "@theme {\n";
  Object.entries(config).forEach(([key, value]) => {
    themeContent += `${key}: ${value};\n`;
  });
  themeContent += "}";
  return themeContent;
}

// Update theme config with new color
function updateThemeConfig(baseColor) {
  const shades = generateColorShades(baseColor);
  if (!shades) return;

  window.themeConfig["--color-primary"] = shades[500];
  Object.entries(shades).forEach(([shade, color]) => {
    window.themeConfig[`--color-primary-${shade}`] = color;
  });
}

// Initialize theme
const savedColor = localStorage.getItem(STORAGE_KEY) || DEFAULT_COLOR;
updateThemeConfig(savedColor);

// Create and inject the Tailwind style tag
const style = document.createElement("style");
style.setAttribute("type", "text/tailwindcss");
style.id = "tailwind-theme";
style.textContent = configToTheme(window.themeConfig);
document.head.appendChild(style);

// Expose function to update color
window.updatePrimaryColor = function (newColor) {
  // Update theme config with new color
  updateThemeConfig(newColor);

  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, newColor);

  // Update the style tag
  const styleTag = document.getElementById("tailwind-theme");
  if (styleTag) {
    styleTag.textContent = configToTheme(window.themeConfig);
  }
};
