import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  type ScrollViewProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type KeyboardSafeScrollLayoutProps = {
  children: React.ReactNode;
  safeAreaClassName?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
} & Omit<ScrollViewProps, "contentContainerStyle">;

export function KeyboardSafeScrollLayout({
  children,
  safeAreaClassName = "flex-1 bg-background",
  contentContainerStyle,
  keyboardShouldPersistTaps = "handled",
  keyboardDismissMode = "none",
  showsVerticalScrollIndicator = false,
  ...scrollViewProps
}: KeyboardSafeScrollLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? insets.top : 0}
    >
      <SafeAreaView className={safeAreaClassName}>
        <ScrollView
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          keyboardDismissMode={keyboardDismissMode}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          contentContainerStyle={contentContainerStyle}
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
