import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { OnboardingContainerItem } from "./components/onboarding-slide-item";
import { OVERVIEW_PAGES } from "./utils";

export const OverviewScreen = () => {
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const [current_slide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: current_slide,
        animated: true,
      });
    }
  }, [current_slide]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);

    if (currentIndex > current_slide) {
      setCurrentSlide((prev) => prev + 1);
    } else if (currentIndex < current_slide) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Animated.FlatList
        ref={flatListRef}
        data={OVERVIEW_PAGES}
        renderItem={({ item, index }) => (
          <OnboardingContainerItem item={item} index={index} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};
