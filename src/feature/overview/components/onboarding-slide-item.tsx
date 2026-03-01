import React from "react";
import { Image, View, useWindowDimensions } from "react-native";
import { Text } from "@/components/ui/text";
import { OverviewSlide } from "../utils";

interface SlideItemProps {
  index: number;
  item: OverviewSlide;
}

export const OnboardingContainerItem = React.memo(
  ({ item }: SlideItemProps) => {
    const { width } = useWindowDimensions();

    return (
      <View
        style={{ width }}
        className="flex flex-1 flex-col items-center justify-start gap-6"
        testID="onboarding-item-container"
      >
        <View className="h-full max-h-[400px] w-full flex-1 items-center justify-center">
          <Image
            source={item.content.img}
            resizeMode="contain"
            className="size-full"
            testID="onboarding-item-image"
          />
        </View>

        <View
          className="w-full items-center gap-2 px-4"
          testID="onboarding-item-text-content"
        >
          <Text variant="h2" className="border-0 text-center">
            {item.content.title}
          </Text>
          <Text variant="default" className="text-center">
            {item.content.subtitle}
          </Text>
        </View>
      </View>
    );
  },
);
OnboardingContainerItem.displayName = "OnboardingContainerItem";
