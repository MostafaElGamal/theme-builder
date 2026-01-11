const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };

const SHADE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

const SHADE_MIX_LEVELS = {
  50: 0.95,
  100: 0.85,
  200: 0.7,
  300: 0.5,
  400: 0.25,
  500: 0.0,
  600: 0.1,
  700: 0.25,
  800: 0.4,
  900: 0.55,
  1000: 0.7,
};

export function generateColorShades(hex) {
  if (!hex) return null;

  const hexToRgb = (hex) => {
    const cleaned = hex.replace(/^#/, "");
    const fullHex =
      cleaned.length === 3
        ? cleaned
            .split("")
            .map((c) => c + c)
            .join("")
        : cleaned;

    const num = parseInt(fullHex, 16);

    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgbToHex = ({ r, g, b }) =>
    "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

  const mixColors = (base, mixWith, weight) => ({
    r: Math.round((1 - weight) * base.r + weight * mixWith.r),
    g: Math.round((1 - weight) * base.g + weight * mixWith.g),
    b: Math.round((1 - weight) * base.b + weight * mixWith.b),
  });

  const baseColor = hexToRgb(hex);
  const shades = {};

  for (const shade of SHADE_KEYS) {
    const amount = SHADE_MIX_LEVELS[shade];
    const targetColor = shade < 500 ? WHITE : BLACK;
    const mixed = mixColors(baseColor, targetColor, amount);
    shades[shade] = rgbToHex(mixed);
  }

  return shades;
}
