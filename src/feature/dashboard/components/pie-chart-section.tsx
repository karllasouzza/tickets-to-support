import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { type PieSlice } from "../use-dashboard-logic";

type PieChartSectionProps = {
  pieSlices: PieSlice[];
  total: number;
};

export function PieChartSection({ pieSlices, total }: PieChartSectionProps) {
  if (pieSlices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status dos Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <Text variant="muted" className="text-center py-8">
            Nenhum ticket registrado ainda.
          </Text>
        </CardContent>
      </Card>
    );
  }

  const chartData = pieSlices.map((s) => ({
    value: s.value,
    color: s.color,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status dos Tickets</CardTitle>
      </CardHeader>
      <CardContent className="gap-5">
        <View className="items-center">
          <PieChart
            data={chartData}
            donut
            radius={90}
            innerRadius={56}
            strokeWidth={2}
            strokeColor="white"
            centerLabelComponent={() => (
              <View className="items-center">
                <Text className="text-2xl font-bold">{total}</Text>
                <Text className="text-[11px] text-muted-foreground">total</Text>
              </View>
            )}
          />
        </View>

        {/* Legend */}
        <View className="gap-2.5">
          {pieSlices.map((s) => (
            <View
              key={s.label}
              className="flex-row items-center justify-between"
            >
              <View className="flex-row items-center gap-2">
                <View
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <Text className="text-sm">{s.label}</Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-sm font-semibold">{s.value}</Text>
                <Text className="text-xs text-muted-foreground">
                  ({Math.round((s.value / total) * 100)}%)
                </Text>
              </View>
            </View>
          ))}
        </View>
      </CardContent>
    </Card>
  );
}
