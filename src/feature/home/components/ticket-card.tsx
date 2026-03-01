import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { type Ticket } from "@/data/states/tickets";
import {
  getStatusColor,
  getStatusLabel,
} from "@/feature/core/utils.ts/ticket-utils";

const DESCRIPTION_MAX_LENGTH = 80;

type TicketCardProps = {
  ticket: Ticket;
  onPress?: (ticket: Ticket) => void;
};

export function TicketCard({ ticket, onPress }: TicketCardProps) {
  const color = getStatusColor(ticket.status);
  const label = getStatusLabel(ticket.status);

  const shortDescription =
    ticket.details.length > DESCRIPTION_MAX_LENGTH
      ? `${ticket.details.slice(0, DESCRIPTION_MAX_LENGTH).trimEnd()}...`
      : ticket.details;

  return (
    <TouchableOpacity
      onPress={() => onPress?.(ticket)}
      activeOpacity={0.8}
      disabled={!onPress}
      className="mt-2"
    >
      <Card className="py-4 gap-3">
        <CardHeader className="px-4 gap-2">
          <View className="flex-row items-center gap-2">
            <Badge variant="outline" style={{ borderColor: color }}>
              <Text style={{ color }}>{label}</Text>
            </Badge>
          </View>
          <Text className="font-semibold text-base leading-snug">
            {ticket.title}
          </Text>
        </CardHeader>
        <CardContent className="px-4">
          <Text className="text-sm text-muted-foreground leading-relaxed">
            {shortDescription}
          </Text>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}
