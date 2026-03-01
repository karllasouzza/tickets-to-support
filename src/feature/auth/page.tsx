import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/text";

import Illustration1 from "../../../assets/images/pexels-snapwire-7470.jpg";
import { Button } from "@/components/ui/button";

export const AuthScreen = () => {
  return (
    <SafeAreaView className="flex-1 flex-col justify-between bg-background items-center gap-6 py-6 px-6">
      <View className="h-full max-h-[400px] w-full flex-1 flex flex-col items-center justify-center">
        <Image
          source={Illustration1}
          resizeMode="contain"
          className="size-[300px]"
          testID="onboarding-item-image"
        />
        <Text variant="h2" className="border-0 text-center">
          Bem vindo ao
        </Text>
        <Text variant="h2" className="border-0 text-center text-primary">
          Tickets To Support
        </Text>
      </View>

      <Button variant="default" size="lg" className="w-full">
        <Text className="text-primary-foreground font-semibold text-base">
          Crie sua conta
        </Text>
      </Button>
    </SafeAreaView>
  );
};
