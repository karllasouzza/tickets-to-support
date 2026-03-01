import React from "react";
import { View } from "react-native";
import { TicketX } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { type AuthenticatedTabsParamList } from "@/router/types";

type NavigationProp = BottomTabNavigationProp<AuthenticatedTabsParamList>;

export function EmptyState() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex-1 items-center justify-center gap-4 px-8 py-12">
      <View className="bg-muted rounded-full p-5">
        <Icon as={TicketX} size={40} className="text-muted-foreground" />
      </View>
      <View className="items-center gap-1">
        <Text variant="large" className="text-center">
          Nenhum ticket encontrado
        </Text>
        <Text variant="muted" className="text-center">
          Você ainda não possui tickets. Crie o primeiro agora.
        </Text>
      </View>
      <Button
        variant="default"
        size="lg"
        className="mt-2 w-full"
        onPress={() => navigation.navigate("CreateTicket")}
      >
        <Text className="text-primary-foreground font-semibold text-base">
          Criar ticket
        </Text>
      </Button>
    </View>
  );
}
