import React, { useRef } from "react";
import { FlatList, View } from "react-native";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { type Ticket } from "@/data/states/tickets";

import { useCarouselTimer } from "./use-carousel-timer";
import { CarouselCard } from "./carousel-card";
import { CarouselPagination } from "./carousel-pagination";
import { AUTO_PLAY_MS, CARD_GAP, CARD_WIDTH } from "./constants";

export type TopFiveCarouselProps = {
  tickets: Ticket[];
};

export function Top5Carousel({ tickets }: TopFiveCarouselProps) {
  const listRef = useRef<FlatList<Ticket>>(null);

  const { activeIndex, setActiveIndex, isPaused } = useCarouselTimer({
    ticketsLength: tickets.length,
    autoPlayMs: AUTO_PLAY_MS,
    listRef,
  });

  if (tickets.length === 0) {
    return (
      <Card className="mx-4">
        <CardHeader>
          <Text variant="large">Top 5 — Menor Prazo</Text>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-center py-6">
            Nenhum ticket disponível.
          </Text>
        </CardContent>
      </Card>
    );
  }

  return (
    <View className="gap-3">
      <Text variant="large" className="px-6">
        Top 5 — Menor Prazo
      </Text>

      <FlatList
        ref={listRef}
        data={tickets}
        keyExtractor={(item) => item.id}
        horizontal
        snapToInterval={CARD_WIDTH + CARD_GAP}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <View style={{ width: CARD_GAP }} />}
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH,
          offset: (CARD_WIDTH + CARD_GAP) * index,
          index,
        })}
        onScrollToIndexFailed={() => {}}
        onTouchStart={() => {
          isPaused.current = true;
        }}
        onTouchEnd={() => {
          isPaused.current = false;
        }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_GAP),
          );
          setActiveIndex(Math.max(0, Math.min(index, tickets.length - 1)));
        }}
        renderItem={({ item, index }) => (
          <CarouselCard ticket={item} position={index + 1} />
        )}
      />

      <CarouselPagination tickets={tickets} activeIndex={activeIndex} />
    </View>
  );
}
