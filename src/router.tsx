import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./feature/home/page";
import { OverviewScreen } from "./feature/overview/page";

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <Stack.Navigator
      id="root"
      initialRouteName="Overview"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Overview" component={OverviewScreen} />
    </Stack.Navigator>
  );
}
