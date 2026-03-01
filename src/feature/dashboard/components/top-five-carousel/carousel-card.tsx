import React from "react";
import { View } from "react-native";
import { Clock } from "lucide-react-native";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { type Ticket } from "@/data/states/tickets";
import {
  getStatusColor,
  getStatusLabel,
} from "@/feature/core/utils.ts/ticket-utils";
import { formatWindow } from "../../use-dashboard-logic";
import { CARD_WIDTH } from "./constants";

type CarouselCardProps = {
  ticket: Ticket;
  position: number;
};

export function CarouselCard({ ticket, position }: CarouselCardProps) {
  const label = getStatusLabel(ticket.status);
  const color = getStatusColor(ticket.status);
  const windowText = formatWindow(ticket.createdAt, ticket.closedAt!);
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
              <Text className="text-xs text-muted-foreground">
                {windowText}
              </Text>
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
