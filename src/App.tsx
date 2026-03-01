import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";

import { RootLayout } from "./components/layouts/root-layout";
import { RootStack } from "./router";
import "./styles/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <RootLayout>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </RootLayout>
        <Toaster />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
