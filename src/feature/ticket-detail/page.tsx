import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer } from "@legendapp/state/react";
import { type RouteProp, useRoute } from "@react-navigation/native";
import {
  CalendarCheck,
  CalendarClock,
  CalendarX,
  CircleCheckBig,
} from "lucide-react-native";
import { Controller } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { type TicketStatus } from "@/data/states/tickets";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { type AuthenticatedRoutesParamList } from "@/router/types";
import { formatDateTime, formatDate } from "@/utils/date-utils";
import {
  getStatusColor,
  getStatusLabel,
} from "@/feature/core/utils.ts/ticket-utils";
import useTicketDetailData from "./use-ticket-detail-data";
import { StatusSelector } from "./components/status-selector";

const STATUS_OPTIONS: { status: TicketStatus; label: string }[] = [
  { status: "open", label: "Aberto" },
  { status: "closed", label: "Encerrado" },
  { status: "improper", label: "Improcedente" },
  { status: "canceled", label: "Cancelado" },
];

type TicketDetailRouteProp = RouteProp<
  AuthenticatedRoutesParamList,
  "TicketDetail"
>;

export const TicketDetailScreen = observer(() => {
  const { params } = useRoute<TicketDetailRouteProp>();
  const {
    ticket,
    control,
    errors,
    isSubmitting,
    isTicketLocked,
    selectedStatus,
    handleSubmit,
    onSubmit,
    handleStatusChange,
    handleBack,
    handleDeleteTicket,
  } = useTicketDetailData(params.ticketId);

  if (!ticket) {
    return (
      <SafeAreaView edges={["bottom"]} className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-6">
          <Text variant="muted">Ticket não encontrado.</Text>
          <Button variant="outline" className="mt-4" onPress={handleBack}>
            <Text variant="muted">Voltar</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const label = getStatusLabel(ticket.status);
  const color = getStatusColor(ticket.status);
  const isClosingStatus =
    selectedStatus === "closed" ||
    selectedStatus === "improper" ||
    selectedStatus === "canceled";

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-background">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 20,
          paddingBottom: 40,
          gap: 16,
        }}
      >
        <View className="flex-row items-center gap-2">
          <Badge variant="outline" style={{ borderColor: color }}>
            <Text style={{ color }}>{label}</Text>
          </Badge>
        </View>

        <Card className="py-4 gap-4">
          <CardHeader className="px-4 gap-1">
            <CardTitle className="text-lg">{ticket.title}</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <Text className="text-sm text-muted-foreground leading-relaxed">
              {ticket.details}
            </Text>
          </CardContent>
        </Card>

        <Card className="py-4 gap-3">
          <CardHeader className="px-4">
            <CardTitle className="text-base">Datas</CardTitle>
          </CardHeader>
          <CardContent className="px-4 gap-3">
            <View className="flex-row items-center gap-2 truncate">
              <Icon
                as={CalendarCheck}
                size={16}
                className="text-muted-foreground"
              />
              <Text className="text-sm text-muted-foreground">
                Criado em:{" "}
                <Text className="text-sm font-medium text-foreground">
                  {formatDateTime(ticket.createdAt)}
                </Text>
              </Text>
            </View>

            <View className="flex-row items-center gap-2 truncate">
              <Icon
                as={CalendarClock}
                size={16}
                className="text-muted-foreground"
              />
              <Text className="text-sm text-muted-foreground">
                Prazo:{" "}
                <Text className="text-sm font-medium text-foreground">
                  {formatDate(ticket.closingDeadlineAt)}
                </Text>
              </Text>
            </View>

            {ticket.closedAt && (
              <View className="flex-row items-center gap-2 truncate">
                <Icon
                  as={CalendarX}
                  size={16}
                  className="text-muted-foreground"
                />
                <Text className="text-sm text-muted-foreground">
                  Encerrado em:{" "}
                  <Text className="text-sm font-medium text-foreground">
                    {formatDateTime(ticket.closedAt)}
                  </Text>
                </Text>
              </View>
            )}
          </CardContent>
        </Card>

        <View className="gap-6 px-4 py-1">
          <View className="flex-row items-center gap-2">
            <Icon as={CircleCheckBig} size={18} className="text-primary" />
            <Text className="text-base font-semibold">Encerramento</Text>
          </View>

          <View className="gap-2">
            <Label className="font-semibold">Status de Fechamento *</Label>
            <StatusSelector
              currentStatus={ticket.status}
              selectedStatus={selectedStatus}
              onStatusChange={handleStatusChange}
              statusOptions={STATUS_OPTIONS}
              disabled={isTicketLocked}
            />
          </View>

          <View className="gap-2">
            <Label className="font-semibold">Descrição do Encerramento *</Label>
            <Controller
              control={control}
              name="closingDescription"
              render={({ field: { value, onChange, onBlur } }) => (
                <Textarea
                  className="min-h-32"
                  value={value ?? ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isTicketLocked}
                  placeholder="Descreva a solução aplicada ou o motivo do encerramento..."
                  numberOfLines={4}
                />
              )}
            />

            {errors.closingDescription?.message ? (
              <Text className="text-xs text-destructive">
                {errors.closingDescription.message}
              </Text>
            ) : null}
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isTicketLocked}
            className="w-full"
          >
            <View className="flex-row items-center justify-center gap-2">
              <Icon
                as={CircleCheckBig}
                size={16}
                className="text-primary-foreground"
              />
              <Text className="text-primary-foreground font-semibold">
                {isTicketLocked
                  ? "Chamado Finalizado"
                  : isClosingStatus
                    ? "Finalizar Chamado"
                    : "Salvar Alterações"}
              </Text>
            </View>
          </Button>

          <Button variant="destructive" onPress={handleDeleteTicket}>
            <Text>Deletar Ticket</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});
