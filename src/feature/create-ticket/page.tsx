import React from "react";
import { View } from "react-native";
import { Controller } from "react-hook-form";
import { CalendarCheck } from "lucide-react-native";

import { KeyboardSafeScrollLayout } from "@/components/layouts/keyboard-safe-scroll-layout";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/components/ui/icon";

import useCreateTicketData from "./use-create-ticket-data";
import { DatePickerField } from "./components/date-picker-field";

const today = new Date();
const formattedToday = today.toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function CreateTicketScreen() {
  const { handleSubmit, control, onSubmit } = useCreateTicketData();

  return (
    <KeyboardSafeScrollLayout
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
        paddingBottom: 62,
        gap: 20,
      }}
    >
      <View className="flex-row items-center gap-2 py-3">
        <Icon as={CalendarCheck} size={16} className="text-muted-foreground" />
        <Text className="text-sm text-muted-foreground">
          Aberto em:{" "}
          <Text className="text-sm font-medium text-foreground">
            {formattedToday} (Hoje)
          </Text>
        </Text>
      </View>

      <View className="w-full gap-6">
        <View className="gap-1.5">
          <Label htmlFor="title">Título *</Label>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, ...field } }) => (
              <Input
                id="title"
                placeholder="Ex: Problema ao acessar o sistema"
                onChangeText={onChange}
                {...field}
              />
            )}
          />
        </View>

        <View className="gap-1.5">
          <Label htmlFor="details">Detalhes *</Label>
          <Controller
            control={control}
            name="details"
            render={({ field: { onChange, ...field } }) => (
              <Textarea
                id="details"
                placeholder="Descreva o problema com o máximo de detalhes possível..."
                className="min-h-32"
                onChangeText={onChange}
                {...field}
              />
            )}
          />
        </View>

        <View className="gap-1.5">
          <Label htmlFor="closingDeadlineAt">Prazo de encerramento *</Label>
          <Controller
            control={control}
            name="closingDeadlineAt"
            render={({ field: { value, onChange } }) => (
              <DatePickerField
                value={value}
                onChange={onChange}
                minimumDate={new Date()}
              />
            )}
          />
        </View>
      </View>

      <Button
        variant="default"
        size="lg"
        className="w-full mt-2"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-primary-foreground font-semibold text-base">
          Criar ticket
        </Text>
      </Button>
    </KeyboardSafeScrollLayout>
  );
}
