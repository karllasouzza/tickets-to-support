import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { type BadgeProps } from "@/components/ui/badge";
import { type Ticket, type TicketStatus } from "@/data/states/tickets";

const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; variant: BadgeProps["variant"] }
> = {
  open: { label: "Aberto", variant: "secondary" },
  closed: { label: "Encerrado", variant: "default" },
  improper: { label: "Improcedente", variant: "destructive" },
  canceled: { label: "Cancelado", variant: "outline" },
};

const DESCRIPTION_MAX_LENGTH = 80;

type TicketCardProps = {
  ticket: Ticket;
  onPress?: (ticket: Ticket) => void;
};

export function TicketCard({ ticket, onPress }: TicketCardProps) {
  const { label, variant } = STATUS_CONFIG[ticket.status];
  const shortDescription =
    ticket.details.length > DESCRIPTION_MAX_LENGTH
      ? `${ticket.details.slice(0, DESCRIPTION_MAX_LENGTH).trimEnd()}...`
      : ticket.details;

  return (
    <TouchableOpacity
      onPress={() => onPress?.(ticket)}
      activeOpacity={0.8}
      disabled={!onPress}
    >
      <Card className="py-4 gap-3">
        <CardHeader className="px-4 gap-2">
          <View className="flex-row items-center gap-2">
            <Badge variant={variant}>
              <Text>{label}</Text>
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
