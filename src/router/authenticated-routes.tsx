import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Plus, SquareKanban, Ticket, User } from "lucide-react-native";

import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";

import { HomeScreen } from "@/feature/home/page";
import CreateTicketScreen from "@/feature/create-ticket/page";
import DashboardScreen from "@/feature/dashboard/page";
import ProfileScreen from "@/feature/profile/page";
import { AuthenticatedRoutesParamList } from "./types";
import { THEME } from "@/lib/theme";
import { useColorScheme } from "nativewind";
import { Button } from "@/components/ui/button";

const Tab = createBottomTabNavigator<AuthenticatedRoutesParamList>();

export default function AuthenticatedRoutes() {
  const { colorScheme } = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: THEME[colorScheme || "light"].background,
          borderBottomColor: THEME[colorScheme || "light"].border,
          borderBottomWidth: 1,
          padding: 10,
        },
        headerTitleStyle: {
          color: THEME[colorScheme || "light"].foreground,
        },
        tabBarStyle: {
          backgroundColor: THEME[colorScheme || "light"].tabBar,
          height: 60,
          padding: 10,
          borderTopColor: THEME[colorScheme || "light"].border,
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Ticket}
              className={cn("p-2", focused ? "text-primary" : "text-muted")}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={cn("text-xs", focused ? "text-primary" : "text-muted")}
            >
              Tickets
            </Text>
          ),
          headerTitle: "Tickets",
        }}
      />
      <Tab.Screen
        name="CreateTicket"
        component={CreateTicketScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Plus}
              className={cn("p-2", focused ? "text-primary" : "text-muted")}
            />
          ),
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            height: 60,
            paddingBottom: 5,
          },
          tabBarItemStyle: {
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          },
          tabBarButton: ({ children, onPress }) => (
            <Button
              variant="outline"
              size="icon"
              className="w-full flex flex-col h-full gap-0"
              onPress={onPress}
            >
              {children}
            </Button>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={cn("text-xs", focused ? "text-primary" : "text-muted")}
            >
              Criar Ticket
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={SquareKanban}
              className={cn("p-2", focused ? "text-primary" : "text-muted")}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={cn("text-xs", focused ? "text-primary" : "text-muted")}
            >
              Dashboard
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={User}
              className={cn("p-2", focused ? "text-primary" : "text-muted")}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={cn("text-xs", focused ? "text-primary" : "text-muted")}
            >
              Perfil
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
