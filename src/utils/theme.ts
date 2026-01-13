import themeConfig from "@/data/theme-config.json";

// Get all available themes
export function getAllThemes() {
  return Object.keys(themeConfig);
}

// Get theme configuration for a specific theme
export function getThemeConfig(theme: string) {
  return (themeConfig as Record<string, any>)[theme];
}

// Check if a theme exists
export function themeExists(theme: string) {
  return Boolean((themeConfig as Record<string, any>)[theme]);
}

export function getPageComponents(pageName: string) {
  const config = themeConfig;
  return (config as Record<string, any>)[pageName] || [];
}

export function getActivePageComponents({ theme, page }: { theme: string; page: string }) {
  const activeComponents = (themeConfig as Record<string, any>)[theme]?.[page];
  return activeComponents || [];
}

// Get theme-specific resources from config
export function getThemeResources(theme: string) {
  const config = getThemeConfig(theme);
  if (!config?.resources) {
    return null;
  }

  return {
    css: config.resources.css || [],
    js: config.resources.js || [],
  };
}
