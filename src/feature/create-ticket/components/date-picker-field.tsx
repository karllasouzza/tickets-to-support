import React, { useState } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";

import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DatePickerFieldProps = {
  value?: Date;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  hasError?: boolean;
};

export function DatePickerField({
  value,
  onChange,
  minimumDate,
  hasError,
}: DatePickerFieldProps) {
  const [show, setShow] = useState(false);

  const handleChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (event.type === "set" && selected) {
      onChange(selected);
    }
  };

  const displayValue = value
    ? value.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "DD/MM/AAAA";

  return (
    <View className="w-full gap-1">
      <TouchableOpacity
        onPress={() => setShow(true)}
        activeOpacity={0.7}
        className={cn(
          "border-input bg-background h-10 w-full flex-row items-center justify-between rounded-md border px-3 shadow-sm shadow-black/5",
          hasError && "border-destructive",
        )}
      >
        <Text
          className={cn(
            "text-base",
            value ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {displayValue}
        </Text>
        <Icon as={CalendarDays} size={16} className="text-muted-foreground" />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          locale="pt-BR"
          minimumDate={minimumDate}
          onChange={handleChange}
        />
      )}

      {show && Platform.OS === "ios" && (
        <Button
          variant="ghost"
          size="sm"
          className="self-end"
          onPress={() => setShow(false)}
        >
          <Text className="text-primary font-semibold">Confirmar</Text>
        </Button>
      )}
    </View>
  );
}
