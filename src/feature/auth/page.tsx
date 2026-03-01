import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HatGlasses } from "lucide-react-native";

import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useNavigation } from "@react-navigation/native";

import Illustration1 from "../../../assets/images/pexels-snapwire-7470.jpg";

export const AuthScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="w-full h-full flex flex-col justify-between bg-background items-center gap-6 py-4">
      <View className="max-h-[400px] h-[400px] w-full flex-1 flex flex-col items-center justify-center px-6">
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

      <View className="w-full max-h-10 mt-auto items-center justify-center gap-2 flex flex-row">
        <View className="w-full h-px bg-muted flex-1" />
        <Icon as={HatGlasses} size={24} className="text-muted" />
        <Text variant="default" className="text-center text-muted">
          Dados 100% local
        </Text>
        <View className="w-full h-px bg-muted flex-1" />
      </View>
      <View className="w-full h-max items-center gap-6 p-6 flex flex-col">
        <Button
          variant="default"
          size="lg"
          className="w-full"
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text className="text-primary-foreground font-semibold text-base">
            Crie sua conta
          </Text>
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-primary font-semibold text-base">
            Já tenho uma conta
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};
