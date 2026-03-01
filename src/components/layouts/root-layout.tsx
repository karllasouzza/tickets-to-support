import { NAV_THEME } from "@/lib/theme";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { useColorScheme } from "nativewind";
import React from "react";
import { StatusBar } from "react-native";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme || "light"]}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colorScheme === "dark" ? "#000000" : "#ffffff"}
      />

      {children}
      <PortalHost />
    </ThemeProvider>
  );
};
