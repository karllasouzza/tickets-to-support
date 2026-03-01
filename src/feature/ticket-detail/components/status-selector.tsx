import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { TriggerRef } from "@rn-primitives/select";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  type Option,
} from "@/components/ui/select";
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
  activeStatusColor = "text-primary-foreground",
}: StatusSelectorProps) {
  const ref = React.useRef<TriggerRef>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({
      ios: insets.bottom,
      android: insets.bottom + 24,
    }),
    left: 12,
    right: 12,
  };

  // Workaround for rn-primitives/select not opening on mobile
  const handleTriggerPress = React.useCallback(() => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      // Force open with a small delay to ensure proper DOM state
      setTimeout(() => {
        ref.current?.open();
      }, 50);
    }
  }, []);

  const handleTouchStart = React.useCallback(() => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      ref.current?.open();
    }
  }, []);

  const handlePressIn = React.useCallback(() => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      ref.current?.open();
    }
  }, []);

  return (
    <Select
      onValueChange={(option: Option) => {
        if (option?.value) {
          onStatusChange(option.value as TicketStatus);
        }
      }}
      value={{
        label:
          statusOptions.find((s) => s.status === selectedStatus)?.label ?? "",
        value: selectedStatus,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleTriggerPress}
        style={{ width: "100%" }}
      >
        <SelectTrigger
          ref={ref}
          className="w-full"
          onPress={handleTriggerPress}
          onTouchStart={handleTouchStart}
          onPressIn={handlePressIn}
        >
          <SelectValue placeholder="Selecione um status" />
        </SelectTrigger>
      </TouchableOpacity>
      <SelectContent insets={contentInsets} className="w-full">
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          {statusOptions.map(({ status, label: statusLabel }) => {
            const isActive = currentStatus === status;
            return (
              <SelectItem
                key={status}
                className="w-full"
                label={statusLabel}
                value={status}
              >
                <Text
                  className={
                    isActive
                      ? `${activeStatusColor} font-semibold`
                      : "font-medium"
                  }
                >
                  {statusLabel}
                </Text>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
