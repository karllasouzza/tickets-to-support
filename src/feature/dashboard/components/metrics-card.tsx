import React from "react";
import { View } from "react-native";

import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { type DashboardMetrics } from "@/data/states/tickets";

type MetricsCardProps = {
  metrics: DashboardMetrics;
};

type StatItemProps = {
  value: number;
  label: string;
  unit?: string;
};

function StatItem({ value, label, unit }: StatItemProps) {
  return (
    <Card className="flex-1 py-4 gap-0">
      <CardContent className="px-4 items-center gap-1">
        <View className="flex-row items-end gap-1">
          <Text className="text-4xl font-bold leading-none">{value}</Text>
          {unit && (
            <Text className="text-xs text-muted-foreground pb-1">{unit}</Text>
          )}
        </View>
        <Text className="text-xs text-muted-foreground text-center leading-tight">
          {label}
        </Text>
      </CardContent>
    </Card>
  );
}

export function MetricsCard({ metrics }: MetricsCardProps) {
  return (
    <View className="flex-row gap-3">
      <StatItem value={metrics.totalTickets} label="Total geral" />
      <StatItem
        value={metrics.averageClosureTimeMinutes}
        label="Média de encerramento"
        unit="min"
      />
    </View>
  );
}
