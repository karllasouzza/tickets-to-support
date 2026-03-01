import React from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text } from "@/components/ui/text";
import { Icon } from "@/components/ui/icon";
import { ArrowLeft } from "lucide-react-native";
import { OVERVIEW_PAGES } from "../utils";
import { PublicRoutesParamList } from "@/router/types";

type OverviewNavigationProp = StackNavigationProp<
  PublicRoutesParamList,
  "Overview"
>;

interface OverviewActionsProps {
  currentSlide: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const OverviewActions = React.memo(
  ({ currentSlide, onNext, onPrevious }: OverviewActionsProps) => {
    const navigator = useNavigation<OverviewNavigationProp>();

    const handleStart = () => {
      navigator.navigate("Auth");
    };

    return (
      <View
        className="w-full flex-row items-center justify-center gap-4 px-8 py-4"
        testID="overview-actions-container"
      >
        {currentSlide > 0 && (
          <Button
            variant="outline"
            size="lg"
            onPress={onPrevious}
            testID="overview-action-previous"
          >
            <Icon as={ArrowLeft} size={20} className="text-foreground" />
          </Button>
        )}

        {currentSlide === OVERVIEW_PAGES.length - 1 ? (
          <Button
            variant="default"
            size="lg"
            className="flex-1"
            testID="overview-action-start"
            onPress={handleStart}
          >
            <Text className="text-primary-foreground font-semibold text-base">
              Começar
            </Text>
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="lg"
            className="flex-1"
            onPress={onNext}
            testID="overview-action-next"
          >
            <Text
              variant="large"
              className="text-secondary-foreground font-semibold"
            >
              Próximo
            </Text>
          </Button>
        )}
      </View>
    );
  },
);
OverviewActions.displayName = "OverviewActions";
