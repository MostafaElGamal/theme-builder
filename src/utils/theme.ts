import themeConfig from "@/data/theme-config.json";

//
//

export function getPageComponents(pageName: string) {
  const config = themeConfig;
  return (config as Record<string, any>)[pageName] || [];
}

export function getActivePageComponents({ theme, page }: { theme: string; page: string }) {
  const activeComponents = (themeConfig as Record<string, any>)[theme]?.[page];
  return activeComponents || [];
}
