import { THEME } from "@/lib/theme";
import { PortalHost } from "@rn-primitives/portal";
import { useColorScheme, vars } from "nativewind";
import React from "react";
import { StatusBar, View } from "react-native";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useColorScheme();
  const currentScheme = colorScheme === "dark" ? "dark" : "light";
  const activeTheme = THEME[currentScheme];
  const cssVariables = vars({
    "--background": activeTheme.background,
    "--foreground": activeTheme.foreground,
    "--card": activeTheme.card,
    "--card-foreground": activeTheme.cardForeground,
    "--popover": activeTheme.popover,
    "--popover-foreground": activeTheme.popoverForeground,
    "--primary": activeTheme.primary,
    "--primary-foreground": activeTheme.primaryForeground,
    "--secondary": activeTheme.secondary,
    "--secondary-foreground": activeTheme.secondaryForeground,
    "--muted": activeTheme.muted,
    "--muted-foreground": activeTheme.mutedForeground,
    "--accent": activeTheme.accent,
    "--accent-foreground": activeTheme.accentForeground,
    "--destructive": activeTheme.destructive,
    "--destructive-foreground": activeTheme.destructiveForeground,
    "--border": activeTheme.border,
    "--input": activeTheme.input,
    "--ring": activeTheme.ring,
    "--chart-1": activeTheme.chart1,
    "--chart-2": activeTheme.chart2,
    "--chart-3": activeTheme.chart3,
    "--chart-4": activeTheme.chart4,
    "--chart-5": activeTheme.chart5,
    "--sidebar": activeTheme.sidebar,
    "--sidebar-foreground": activeTheme.sidebarForeground,
    "--sidebar-primary": activeTheme.sidebarPrimary,
    "--sidebar-primary-foreground": activeTheme.sidebarPrimaryForeground,
    "--sidebar-accent": activeTheme.sidebarAccent,
    "--sidebar-accent-foreground": activeTheme.sidebarAccentForeground,
    "--sidebar-border": activeTheme.sidebarBorder,
    "--sidebar-ring": activeTheme.sidebarRing,
    "--radius": activeTheme.radius,
  });

  return (
    <View style={cssVariables} className="flex-1 bg-background">
      <StatusBar
        barStyle={currentScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={activeTheme.background}
      />

      {children}
      <PortalHost />
    </View>
  );
};
