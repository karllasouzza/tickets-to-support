import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OverviewScreen } from "./feature/overview/page";
import { AuthScreen } from "./feature/auth/page";

type RootStackParamList = {
  Overview: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <Stack.Navigator
      id="root"
      initialRouteName="Overview"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Overview" component={OverviewScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}
