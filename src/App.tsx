import { NavigationContainer } from "@react-navigation/native";
import { RootLayout } from "./components/layouts/root-layout";
import { RootStack } from "./router";
import "./styles/global.css";

function App() {
  return (
    <RootLayout>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </RootLayout>
  );
}

export default App;
