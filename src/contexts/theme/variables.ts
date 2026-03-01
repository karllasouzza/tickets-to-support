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
  colorBackground: "#ffffff",
  colorForeground: "#0a0a0a",
  colorCard: "#ffffff",
  colorCardForeground: "#0a0a0a",
  colorPopover: "#ffffff",
  colorPopoverForeground: "#0a0a0a",
  colorPrimary: "#171717",
  colorPrimaryForeground: "#fafafa",
  colorSecondary: "#f5f5f5",
  colorSecondaryForeground: "#171717",
  colorMuted: "#f5f5f5",
  colorMutedForeground: "#737373",
  colorAccent: "#f5f5f5",
  colorAccentForeground: "#171717",
  colorDestructive: "#e7000b",
  colorBorder: "#e5e5e5",
  colorInput: "#e5e5e5",
  colorRing: "#a1a1a1",
  colorChart1: "#f54900",
  colorChart2: "#009689",
  colorChart3: "#104e64",
  colorChart4: "#ffb900",
  colorChart5: "#fe9a00",
  colorSidebar: "#fafafa",
  colorSidebarForeground: "#0a0a0a",
  colorSidebarPrimary: "#171717",
  colorSidebarPrimaryForeground: "#fafafa",
  colorSidebarAccent: "#f5f5f5",
  colorSidebarAccentForeground: "#171717",
  colorSidebarBorder: "#e5e5e5",
  colorSidebarRing: "#00000000",

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
  colorBackground: "#0a0a0a",
  colorForeground: "#fafafa",
  colorCard: "#171717",
  colorCardForeground: "#fafafa",
  colorPopover: "#171717",
  colorPopoverForeground: "#fafafa",
  colorPrimary: "#e5e5e5",
  colorPrimaryForeground: "#171717",
  colorSecondary: "#262626",
  colorSecondaryForeground: "#fafafa",
  colorMuted: "#262626",
  colorMutedForeground: "#a1a1a1",
  colorAccent: "#262626",
  colorAccentForeground: "#fafafa",
  colorDestructive: "#ff6467",
  colorBorder: "#ffffff1a",
  colorInput: "#ffffff26",
  colorRing: "#737373",
  colorChart1: "#1447e6",
  colorChart2: "#00bc7d",
  colorChart3: "#fe9a00",
  colorChart4: "#ad46ff",
  colorChart5: "#ff2056",
  colorSidebar: "#171717",
  colorSidebarForeground: "#fafafa",
  colorSidebarPrimary: "#1447e6",
  colorSidebarPrimaryForeground: "#fafafa",
  colorSidebarAccent: "#262626",
  colorSidebarAccentForeground: "#fafafa",
  colorSidebarBorder: "#ffffff1a",
  colorSidebarRing: "#737373",

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
