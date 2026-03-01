import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootLayout } from "./components/layouts/root-layout";
import { RootStack } from "./router";
import "./styles/global.css";

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <RootLayout>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </RootLayout>
      </GestureHandlerRootView>
      <Toaster />
    </SafeAreaProvider>
  );
}

export default App;
