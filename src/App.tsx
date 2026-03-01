import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./router";
import "./styles/global.css";

function App() {
  return (
    <>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </>
  );
}

export default App;
