import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { type TicketStatus } from "@/data/states/tickets";

export type FilterStatus = TicketStatus | "all";

const FILTERS: { label: string; value: FilterStatus }[] = [
  { label: "Todos", value: "all" },
  { label: "Aberto", value: "open" },
  { label: "Encerrado", value: "closed" },
  { label: "Improcedente", value: "improper" },
  { label: "Cancelado", value: "canceled" },
];

type FilterHeaderProps = {
  selected: FilterStatus;
  onSelect: (status: FilterStatus) => void;
};

export function FilterHeader({ selected, onSelect }: FilterHeaderProps) {
  return (
    <View className="border-b border-border">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex-row gap-2 px-4 py-3"
      >
        {FILTERS.map((filter) => {
          const isActive = selected === filter.value;
          return (
            <TouchableOpacity
              key={filter.value}
              onPress={() => onSelect(filter.value)}
              className={cn(
                "rounded-full px-4 py-1.5 border",
                isActive
                  ? "bg-primary border-transparent"
                  : "bg-transparent border-border",
              )}
              activeOpacity={0.7}
            >
              <Text
                className={cn(
                  "text-sm font-medium",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
