import React from "react";
import { View } from "react-native";
import { Link } from "@react-navigation/native";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { OVERVIEW_PAGES } from "../utils";

interface OverviewIndicatorProps {
  currentSlide: number;
}

export const OverviewIndicator = React.memo(
  ({ currentSlide }: OverviewIndicatorProps) => {
    return (
      <View
        className="w-full flex-row items-center justify-center px-8 py-4"
        testID="overview-indicator-container"
      >
        <View className="flex-row items-center justify-center gap-2">
          {Array.from({ length: OVERVIEW_PAGES.length }).map((_, index) => (
            <View
              key={`overview-slide-mark-${index}`}
              className={cn(
                "h-2 w-6 rounded-full relative",
                index <= currentSlide ? "bg-primary" : "bg-muted",
              )}
              testID={`overview-indicator-dot-${index}`}
            />
          ))}
        </View>
        {currentSlide < OVERVIEW_PAGES.length - 1 && (
          <Link screen="Auth" params={{}} className="absolute right-8">
            <Text className="text-primary font-semibold">Pular</Text>
          </Link>
        )}
      </View>
    );
  },
);
OverviewIndicator.displayName = "OverviewIndicator";
