import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";
import { type Ticket } from "@/data/states/tickets";

export type CarouselPaginationProps = {
  tickets: Ticket[];
  activeIndex: number;
};

export function CarouselPagination({
  tickets,
  activeIndex,
}: CarouselPaginationProps) {
  if (tickets.length <= 1) {
    return null;
  }

  return (
    <View className="flex-row justify-center gap-1.5">
      {tickets.map((_, i) => (
        <View
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all",
            i === activeIndex
              ? "w-4 bg-primary"
              : "w-1.5 bg-muted-foreground/30",
          )}
        />
      ))}
    </View>
  );
}
