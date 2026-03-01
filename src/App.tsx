import { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";

import { RootLayout } from "./components/layouts/root-layout";
import { AnimatedBootSplash } from "./components/animated-splash";
import { RootStack } from "./router";
import { NAV_THEME } from "./lib/theme";
import "./styles/global.css";

function App() {
  const { colorScheme } = useColorScheme();
  const currentScheme = colorScheme === "dark" ? "dark" : "light";
  const [splashVisible, setSplashVisible] = useState(true);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <RootLayout>
            <NavigationContainer theme={NAV_THEME[currentScheme]}>
              <RootStack />
            </NavigationContainer>
          </RootLayout>
          <Toaster />

          {splashVisible && (
            <AnimatedBootSplash
              onAnimationEnd={() => setSplashVisible(false)}
            />
          )}
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
