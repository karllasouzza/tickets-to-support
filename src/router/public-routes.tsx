import { createStackNavigator } from "@react-navigation/stack";

import { getUser } from "@/data/states/user";
import { AuthScreen } from "@/feature/auth/page";
import { CreateAccountScreen } from "@/feature/create-account/page";
import { LoginScreen } from "@/feature/login/page";
import { OverviewScreen } from "@/feature/overview/page";

const Stack = createStackNavigator();

export default function PublicRoutes() {
  const user = getUser();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={user && !user.remember ? "Login" : "Overview"}
    >
      <Stack.Screen name="Overview" component={OverviewScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
