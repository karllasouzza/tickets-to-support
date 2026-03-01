import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LegendList } from "@legendapp/list";

import { Text } from "@/components/ui/text";
import useHomeLogic from "./use-home-logic";
import { FilterHeader } from "./components/filter-header";
import { TicketCard } from "./components/ticket-card";
import { EmptyState } from "./components/empty-state";

export const HomeScreen = () => {
  const { tickets, filteredTickets, selectedFilter, setSelectedFilter } =
    useHomeLogic();

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-background">
      <FilterHeader selected={selectedFilter} onSelect={setSelectedFilter} />
      <LegendList
        data={filteredTickets}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-4 py-4 gap-3 flex-grow"
        renderItem={({ item }) => <TicketCard ticket={item} />}
        ListEmptyComponent={<EmptyState />}
        ListHeaderComponent={
          tickets.length > 0 ? (
            <View className="mb-1">
              <Text variant="muted">{filteredTickets.length} ticket(s)</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};
