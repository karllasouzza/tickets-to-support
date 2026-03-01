import React from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import type { TicketStatus } from "@/data/states/tickets";

interface StatusSelectorProps {
  currentStatus: TicketStatus;
  selectedStatus: TicketStatus;
  onStatusChange: (status: TicketStatus) => void;
  statusOptions: { status: TicketStatus; label: string }[];
  activeStatusColor?: string;
}

export function StatusSelector({
  currentStatus,
  selectedStatus,
  onStatusChange,
  statusOptions,
  activeStatusColor,
}: StatusSelectorProps) {
  return (
    <View className="gap-2">
      <View className="flex-row flex-wrap gap-2">
        {statusOptions.map(({ status, label }) => {
          const isSelected = selectedStatus === status;
          const isCurrent = currentStatus === status;

          return (
            <Button
              key={status}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onPress={() => onStatusChange(status)}
              className="min-w-[120px]"
            >
              <Text
                className={
                  isSelected
                    ? (activeStatusColor ?? "text-primary-foreground")
                    : isCurrent
                      ? "text-primary font-semibold"
                      : "font-medium"
                }
              >
                {label}
              </Text>
            </Button>
          );
        })}
      </View>
    </View>
  );
}
