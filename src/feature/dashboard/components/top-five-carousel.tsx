import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { Clock } from "lucide-react-native";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { type Ticket } from "@/data/states/tickets";
import { formatWindow } from "../use-dashboard-logic";
import {
  getStatusColor,
  getStatusLabel,
} from "@/feature/core/utils.ts/ticket-utils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_GAP = 12;
const CARD_WIDTH = SCREEN_WIDTH - 48;
const AUTO_PLAY_MS = 3000;

type TopFiveCarouselProps = {
  tickets: Ticket[];
};

export function Top5Carousel({ tickets }: TopFiveCarouselProps) {
  const listRef = useRef<FlatList<Ticket>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isPaused = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    if (tickets.length <= 1) return;
    stopTimer();
    timerRef.current = setInterval(() => {
      if (isPaused.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % tickets.length;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, AUTO_PLAY_MS);
  }, [tickets.length, stopTimer]);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

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

      {/* Page dots */}
      {tickets.length > 1 && (
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
      )}
    </View>
  );
}

type CarouselCardProps = {
  ticket: Ticket;
  position: number;
};

function CarouselCard({ ticket, position }: CarouselCardProps) {
  const label = getStatusLabel(ticket.status);
  const color = getStatusColor(ticket.status);
  const window = formatWindow(ticket.createdAt, ticket.closedAt!);
  const deadline = new Date(ticket.closedAt!).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <View style={{ width: CARD_WIDTH }}>
      <Card className="py-4 gap-3">
        <CardHeader className="px-4 gap-2.5">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View className="bg-muted h-6 w-6 rounded-full items-center justify-center">
                <Text className="text-xs font-bold text-muted-foreground">
                  {position}
                </Text>
              </View>
              <Badge variant="outline" style={{ borderColor: color }}>
                <Text style={{ color }}>{label}</Text>
              </Badge>
            </View>
            <View className="flex-row items-center gap-1 bg-secondary rounded-full px-2.5 py-1">
              <Icon as={Clock} size={11} className="text-muted-foreground" />
              <Text className="text-xs text-muted-foreground">{window}</Text>
            </View>
          </View>

          <Text
            className="font-semibold text-base leading-snug"
            numberOfLines={2}
          >
            {ticket.title}
          </Text>
        </CardHeader>

        <CardContent className="px-4">
          <Text className="text-sm text-muted-foreground">
            Encerrado em: {deadline}
          </Text>
        </CardContent>
      </Card>
    </View>
  );
}
