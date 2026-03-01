import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

export const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" contentContainerClassName="flex-grow">
        <View className="flex-1 items-center justify-center w-full px-4">
          <Text variant="code">Welcome to the Home Screen!</Text>
          <Input placeholder="Type something..." className="mt-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
