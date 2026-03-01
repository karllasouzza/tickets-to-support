import React from "react";
import { Image, Keyboard, View } from "react-native";
import { Controller } from "react-hook-form";

import { KeyboardSafeScrollLayout } from "@/components/layouts/keyboard-safe-scroll-layout";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { useLoginData } from "./use-login-data";
import Illustration1 from "../../../assets/images/pexels-snapwire-7470.jpg";
import { Eye, EyeOff } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";

export const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    control,
    onSubmit,
    isPasswordVisible,
    setIsPasswordVisible,
  } = useLoginData();

  return (
    <KeyboardSafeScrollLayout
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
        paddingBottom: 62,
        gap: 24,
      }}
    >
      <View className="flex w-full h-full justify-between items-center">
        <View className="w-full flex flex-col items-center">
          <Image
            source={Illustration1}
            resizeMode="contain"
            className="size-[240px]"
            testID="onboarding-item-image"
          />
          <Text variant="h2" className="border-0 text-center">
            Faça login na sua conta
          </Text>
        </View>

        <View className="w-full items-center gap-6 px-4">
          <View className="w-full items-center gap-2">
            <Label htmlFor="email" className="text-left w-full">
              *Email
            </Label>
            <Input id="email" {...register("email")} />
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
                    placeholder="Senha"
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
                      className="text-muted"
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
            className="w-full mt-4"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-primary-foreground font-semibold text-base">
              Entrar
            </Text>
          </Button>
        </View>
      </View>
    </KeyboardSafeScrollLayout>
  );
};
