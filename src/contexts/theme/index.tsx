import React, { createContext, Dispatch, SetStateAction, useMemo } from "react";
import { darkTheme, lightTheme } from "./variables";
import { ColorSchemeName, StatusBar, useColorScheme } from "react-native";

export const ThemeContext = createContext({
  theme: lightTheme,
  setCustomColorScheme: (() => {}) as Dispatch<
    SetStateAction<ColorSchemeName | null>
  >,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const [customColorScheme, setCustomColorScheme] =
    React.useState<ColorSchemeName | null>(() => {
      if (colorScheme === "dark") {
        return "dark";
      } else {
        return "light";
      }
    });

  const safeColorScheme = customColorScheme ?? colorScheme;

  const currentTheme = useMemo(() => {
    if (safeColorScheme === "dark") {
      return {
        ...darkTheme,
        colorBackground: "#000000",
      };
    }
    return lightTheme;
  }, [safeColorScheme]);

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, setCustomColorScheme }}
    >
      <StatusBar
        barStyle={safeColorScheme === "dark" ? "light-content" : "dark-content"}
      />
      {children}
    </ThemeContext.Provider>
  );
};
