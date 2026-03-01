import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "@legendapp/state/react";

import { user$ } from "../data/states/user";
import PublicRoutes from "./public-routes";
import AuthenticatedRoutes from "./authenticated-routes";
import { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = observer(function RootStack() {
  const user = user$.get();
  const isAuthenticated = Boolean(user);

  return (
    <Stack.Navigator
      id="root"
      initialRouteName={
        isAuthenticated ? "AuthenticatedRoutes" : "PublicRoutes"
      }
      screenOptions={{ headerShown: false }}
    >
      {!isAuthenticated ? (
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
});
