import { createStackNavigator } from "@react-navigation/stack";

import { getUser } from "../data/states/user";
import PublicRoutes from "./public-routes";
import AuthenticatedRoutes from "./authenticated-routes";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export function RootStack() {
  const user = getUser();
  return (
    <Stack.Navigator
      id="root"
      initialRouteName={
        user && user.remember ? "AuthenticatedRoutes" : "PublicRoutes"
      }
      screenOptions={{ headerShown: false }}
    >
      {!user || !user.remember ? (
        <>
          <Stack.Screen name="PublicRoutes" component={PublicRoutes} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="AuthenticatedRoutes"
            component={AuthenticatedRoutes}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
