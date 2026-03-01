import { createStackNavigator } from "@react-navigation/stack";

import { AuthScreen } from "@/feature/auth/page";
import { CreateAccountScreen } from "@/feature/create-account/page";
import { LoginScreen } from "@/feature/login/page";
import { OverviewScreen } from "@/feature/overview/page";
import { PublicRoutesParamList } from "./types";

const Stack = createStackNavigator<PublicRoutesParamList>();

export default function PublicRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Overview"
    >
      <Stack.Screen name="Overview" component={OverviewScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
