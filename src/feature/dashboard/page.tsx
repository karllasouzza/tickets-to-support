import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { observer } from "@legendapp/state/react";

import useDashboardLogic from "./use-dashboard-logic";
import { PieChartSection } from "./components/pie-chart-section";
import { MetricsCard } from "./components/metrics-card";
import { Top5Carousel } from "./components/top-five-carousel";

const DashboardScreen = observer(() => {
  const { pieSlices, metrics, top5 } = useDashboardLogic();

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 24, gap: 16 }}
      >
        <View className="px-4">
          <PieChartSection pieSlices={pieSlices} total={metrics.totalTickets} />
        </View>

        <View className="px-4">
          <MetricsCard metrics={metrics} />
        </View>

        <Top5Carousel tickets={top5} />
      </ScrollView>
    </SafeAreaView>
  );
});

export default DashboardScreen;
