import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";

import { HomeScreen } from "@/feature/home/page";
import CreateTicketScreen from "@/feature/create-ticket/page";
import DashboardScreen from "@/feature/dashboard/page";
import ProfileScreen from "@/feature/profile/page";

const Tab = createNativeBottomTabNavigator();

export default function AuthenticatedRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CreateTicket" component={CreateTicketScreen} />
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
