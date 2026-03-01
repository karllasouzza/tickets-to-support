import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused } from "@react-navigation/native";
import { Plus, SquareKanban, Ticket, User } from "lucide-react-native";
import { Keyboard, GestureResponderEvent } from "react-native";

import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";

import { HomeScreen } from "@/feature/home/page";
import CreateTicketScreen from "@/feature/create-ticket/page";
import DashboardScreen from "@/feature/dashboard/page";
import ProfileScreen from "@/feature/profile/page";
import { TicketDetailScreen } from "@/feature/ticket-detail/page";
import {
  AuthenticatedRoutesParamList,
  AuthenticatedTabsParamList,
} from "./types";
import { THEME } from "@/lib/theme";
import { useColorScheme } from "nativewind";
import { Button } from "@/components/ui/button";

const Tab = createBottomTabNavigator<AuthenticatedTabsParamList>();
const Stack = createStackNavigator<AuthenticatedRoutesParamList>();

function CreateTicketTabButton({
  children,
  onPress,
}: {
  children: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
}) {
  const isFocused = useIsFocused();

  return (
    <Button
      variant={isFocused ? "outline" : "default"}
      size="icon"
      className={cn(
        "w-full flex flex-col h-full gap-0 rounded-none ",
        isFocused ? "border-primary" : "border-y-0",
      )}
      onPress={onPress}
    >
      {children}
    </Button>
  );
}

function TabNavigator() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme || "light"];
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const defaultTabBarStyle = keyboardVisible
    ? { display: "none" as const }
    : {
        backgroundColor: theme.tabBar,
        height: 60,
        padding: 10,
        borderTopColor: theme.border,
        borderTopWidth: 1,
      };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.background,
          borderBottomColor: theme.border,
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          color: theme.foreground,
        },
        tabBarStyle: defaultTabBarStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Ticket}
              className={cn(
                "p-2",
                focused ? "text-primary" : "text-muted-foreground",
              )}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={cn(
                "text-xs",
                focused ? "text-primary" : "text-muted-foreground",
              )}
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
          title: "Criar Ticket",
          tabBarItemStyle: {
            width: 60,
            height: 60,
          },
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Plus}
              className={cn(
                "p-2",
                focused ? "text-primary" : "text-primary-foreground",
              )}
            />
          ),
          tabBarButton: ({ children, onPress }) => {
            return (
              <CreateTicketTabButton onPress={onPress}>
                {children}
              </CreateTicketTabButton>
            );
          },
          tabBarLabel: ({ focused }) => (
            <Text
              className={cn(
                "text-xs ",
                focused ? "text-primary" : "text-primary-foreground",
              )}
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
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <Icon
              as={SquareKanban}
              className={cn(
                "p-2",
                focused ? "text-primary" : "text-muted-foreground",
              )}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={cn(
                "text-xs",
                focused ? "text-primary" : "text-muted-foreground",
              )}
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
              className={cn(
                "p-2",
                focused ? "text-primary" : "text-muted-foreground",
              )}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={cn(
                "text-xs",
                focused ? "text-primary" : "text-muted-foreground",
              )}
            >
              Perfil
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AuthenticatedRoutes() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme || "light"];

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="TicketDetail"
        component={TicketDetailScreen}
        options={{
          headerShown: true,
          headerTitle: "Detalhes do Ticket",
          headerStyle: {
            backgroundColor: theme.background,
            borderBottomColor: theme.border,
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            color: theme.foreground,
          },
          headerTintColor: theme.primary,
        }}
      />
    </Stack.Navigator>
  );
}
