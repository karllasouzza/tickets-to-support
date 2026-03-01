import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LegendList } from "@legendapp/list";
import { observer } from "@legendapp/state/react";
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { type StackNavigationProp } from "@react-navigation/stack";

import { Text } from "@/components/ui/text";
import { type Ticket } from "@/data/states/tickets";
import {
  type AuthenticatedRoutesParamList,
  type AuthenticatedTabsParamList,
} from "@/router/types";
import useHomeLogic from "./use-home-logic";
import { FilterHeader } from "./components/filter-header";
import { TicketCard } from "./components/ticket-card";
import { EmptyState } from "./components/empty-state";

type NavigationProp = StackNavigationProp<AuthenticatedRoutesParamList>;
type HomeRouteProp = RouteProp<AuthenticatedTabsParamList, "Home">;

export const HomeScreen = observer(() => {
  const { tickets, filteredTickets, selectedFilter, setSelectedFilter } =
    useHomeLogic();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<HomeRouteProp>();

  useEffect(() => {
    if (!route.params?.refreshToken) return;
    setSelectedFilter("all");
  }, [route.params?.refreshToken, setSelectedFilter]);

  const handleTicketPress = useCallback(
    (ticket: Ticket) => {
      navigation.navigate("TicketDetail", { ticketId: ticket.id });
    },
    [navigation],
  );

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-background">
      <FilterHeader selected={selectedFilter} onSelect={setSelectedFilter} />
      <LegendList
        data={filteredTickets}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 py-4 gap-3 flex-grow"
        renderItem={({ item }) => (
          <TicketCard ticket={item} onPress={handleTicketPress} />
        )}
        ListEmptyComponent={<EmptyState />}
        ListHeaderComponent={
          tickets.length > 0 ? (
            <View className="mb-1">
              <Text variant="muted">{filteredTickets.length} ticket(s)</Text>
            </View>
          ) : null
        }
        recycleItems
      />
    </SafeAreaView>
  );
});
