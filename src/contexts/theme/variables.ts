import { StyleSheet } from "react-native";

export type Theme = {
  colorBackground: string;
  colorForeground: string;
  colorCard: string;
  colorCardForeground: string;
  colorPopover: string;
  colorPopoverForeground: string;
  colorPrimary: string;
  colorPrimaryForeground: string;
  colorSecondary: string;
  colorSecondaryForeground: string;
  colorMuted: string;
  colorMutedForeground: string;
  colorAccent: string;
  colorAccentForeground: string;
  colorDestructive: string;
  colorBorder: string;
  colorInput: string;
  colorRing: string;
  colorChart1: string;
  colorChart2: string;
  colorChart3: string;
  colorChart4: string;
  colorChart5: string;
  colorSidebar: string;
  colorSidebarForeground: string;
  colorSidebarPrimary: string;
  colorSidebarPrimaryForeground: string;
  colorSidebarAccent: string;
  colorSidebarAccentForeground: string;
  colorSidebarBorder: string;
  colorSidebarRing: string;

  fontSans: string;
  fontMono: string;
  fontSerif: string;

  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  radiusXl: number;
};

export const lightTheme: Theme = {
  colorBackground: "#f8f8f8",
  colorForeground: "#1d293d",
  colorCard: "#ffffff",
  colorCardForeground: "#1d293d",
  colorPopover: "#ffffff",
  colorPopoverForeground: "#1d293d",
  colorPrimary: "#6468f0",
  colorPrimaryForeground: "#ffffff",
  colorSecondary: "#e4e8ef",
  colorSecondaryForeground: "#364050",
  colorMuted: "#f5f5f5",
  colorMutedForeground: "#6c727e",
  colorAccent: "#e1e7fd",
  colorAccentForeground: "#364050",
  colorDestructive: "#f14444",
  colorBorder: "#d0d4db",
  colorInput: "#d0d4db",
  colorRing: "#6468f0",
  colorChart1: "#6468f0",
  colorChart2: "#4f46e5",
  colorChart3: "#443bc9",
  colorChart4: "#3730a5",
  colorChart5: "#312d84",
  colorSidebar: "#f5f5f5",
  colorSidebarForeground: "#1d293d",
  colorSidebarPrimary: "#6468f0",
  colorSidebarPrimaryForeground: "#ffffff",
  colorSidebarAccent: "#e1e7fd",
  colorSidebarAccentForeground: "#364050",
  colorSidebarBorder: "#d0d4db",
  colorSidebarRing: "#6468f0",

  fontSans:
    "Geist, Geist Fallback, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  fontMono:
    "Geist Mono, Geist Mono Fallback, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontSerif:
    'Geist, Geist Fallback, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',

  radiusSm: 6, // approx calc(var(--radius) - 4px) from 0.625rem (~10px)
  radiusMd: 8,
  radiusLg: 10,
  radiusXl: 14,
};

export const darkTheme: Theme = {
  colorBackground: "#0f182b",
  colorForeground: "#e3e8ef",
  colorCard: "#1d293d",
  colorCardForeground: "#e3e8ef",
  colorPopover: "#1d293d",
  colorPopoverForeground: "#e3e8ef",
  colorPrimary: "#818cf9",
  colorPrimaryForeground: "#0f182b",
  colorSecondary: "#2f3848",
  colorSecondaryForeground: "#d0d4db",
  colorMuted: "#1d293d",
  colorMutedForeground: "#9ba2ae",
  colorAccent: "#364050",
  colorAccentForeground: "#d0d4db",
  colorDestructive: "#f14444",
  colorBorder: "#4b5666",
  colorInput: "#4b5666",
  colorRing: "#818cf9",
  colorChart1: "#818cf9",
  colorChart2: "#6468f0",
  colorChart3: "#4f46e5",
  colorChart4: "#443bc9",
  colorChart5: "#3730a5",
  colorSidebar: "#1d293d",
  colorSidebarForeground: "#e3e8ef",
  colorSidebarPrimary: "#818cf9",
  colorSidebarPrimaryForeground: "#0f182b",
  colorSidebarAccent: "#364050",
  colorSidebarAccentForeground: "#d0d4db",
  colorSidebarBorder: "#4b5666",
  colorSidebarRing: "#818cf9",

  fontSans:
    "Geist, Geist Fallback, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  fontMono:
    "Geist Mono, Geist Mono Fallback, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  fontSerif:
    'Geist, Geist Fallback, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',

  radiusSm: 6,
  radiusMd: 8,
  radiusLg: 10,
  radiusXl: 14,
};

export const createThemedStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colorBackground,
    },
    page: {
      flex: 1,
      backgroundColor: theme.colorBackground,
      color: theme.colorForeground,
    },
    card: {
      backgroundColor: theme.colorCard,
      borderColor: theme.colorBorder,
      borderWidth: 1,
      borderRadius: theme.radiusMd,
      padding: 12,
    },
    textPrimary: {
      color: theme.colorPrimaryForeground,
      fontFamily: theme.fontSans,
    },
    textForeground: {
      color: theme.colorForeground,
      fontFamily: theme.fontSans,
    },
  });
