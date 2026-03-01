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
      <GestureHandlerRootView style={{ flex: 1 }}>
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
