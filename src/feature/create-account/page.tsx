import React from "react";
import { Image, View, Keyboard } from "react-native";
import { Controller } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react-native";

import { KeyboardSafeScrollLayout } from "@/components/layouts/keyboard-safe-scroll-layout";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/components/ui/icon";

import useCreateAccountData from "./use-create-account-data";
import Illustration1 from "../../../assets/adaptive-icon.png";

export const CreateAccountScreen = () => {
  const {
    handleSubmit,
    control,
    setFocus,
    onSubmit,
    isPasswordVisible,
    setIsPasswordVisible,
  } = useCreateAccountData();

  return (
    <KeyboardSafeScrollLayout
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
        paddingBottom: 62,
        gap: 32,
      }}
    >
      <View className="items-center w-full">
        <Image
          source={Illustration1}
          resizeMode="contain"
          className="size-[200px]"
          testID="onboarding-item-image"
        />
        <Text variant="h2" className="border-0 text-center">
          Crie sua conta local
        </Text>
      </View>

      <View className="w-full flex flex-col items-center gap-6">
        <View className="w-full flex flex-col items-start gap-2">
          <Label htmlFor="name" className="text-left w-full">
            *Nome
          </Label>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                id="name"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => setFocus("email")}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>

        <View className="w-full flex flex-col items-start gap-2">
          <Label htmlFor="email" className="text-left w-full">
            *Email
          </Label>
          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                id="email"
                returnKeyType="next"
                blurOnSubmit={false}
                keyboardType="email-address"
                onSubmitEditing={() => setFocus("password")}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>

        <View className="w-full flex flex-col items-start gap-2">
          <Label htmlFor="password" className="text-left w-full">
            *Senha
          </Label>
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <View className="w-full flex flex-row items-center gap-2">
                <Input
                  id="password"
                  secureTextEntry={!isPasswordVisible}
                  className="flex-1"
                  returnKeyType="done"
                  onSubmitEditing={() => Keyboard.dismiss()}
                  value={value}
                  onChangeText={onChange}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Icon
                    as={isPasswordVisible ? EyeOff : Eye}
                    size={20}
                    className="text-muted-foreground"
                  />
                </Button>
              </View>
            )}
          />
        </View>

        <Controller
          control={control}
          name="remember"
          render={({ field: { value, onChange } }) => (
            <View className="w-full flex flex-row items-center gap-2">
              <Checkbox
                id="remember"
                checked={value || false}
                onCheckedChange={onChange}
              />
              <Label htmlFor="remember" className="text-left w-full">
                Salvar credenciais
              </Label>
            </View>
          )}
        />

        <Button
          variant="default"
          size="lg"
          className="w-full mt-6"
          onPress={() => handleSubmit(onSubmit)()}
        >
          <Text className="text-primary-foreground font-semibold text-base">
            Criar conta
          </Text>
        </Button>
      </View>
    </KeyboardSafeScrollLayout>
  );
};
