// Jest setup file for React Native testing

import React from "react";
import { View } from "react-native";

jest.mock("sonner-native", () => {
  return {
    Toaster: () => React.createElement(View, null),
    toast: {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
      message: jest.fn(),
    },
  };
});

jest.mock("react-native-reanimated", () => {
  const withTiming = (
    toValue: unknown,
    _config?: object,
    callback?: () => void,
  ) => {
    if (callback) callback();
    return toValue;
  };

  const Animated = {
    View: (props: React.ComponentProps<typeof View>) =>
      React.createElement(View, props),
    createAnimatedComponent: <P extends object>(
      Component: React.ComponentType<P>,
    ) => Component,
  };

  return {
    __esModule: true,
    default: Animated,
    View: Animated.View,
    createAnimatedComponent: Animated.createAnimatedComponent,
    runOnJS: (fn: (...args: unknown[]) => unknown) => fn,
    useAnimatedStyle: (updater: () => object) => updater(),
    useSharedValue: (initialValue: unknown) => ({ value: initialValue }),
    withDelay: (_delay: number, value: unknown) => value,
    withSequence: (...values: unknown[]) => values[values.length - 1],
    withTiming,
  };
});

jest.mock("react-native-bootsplash", () => ({
  useHideAnimation: () => ({
    container: { style: {} },
    logo: {},
  }),
  hide: jest.fn(),
  isVisible: jest.fn().mockResolvedValue(false),
}));

jest.mock("react-native-mmkv", () => {
  const memoryStore = new Map<string, string>();

  const storage = {
    set: jest.fn((key: string, value: string) => {
      memoryStore.set(key, String(value));
    }),
    getString: jest.fn((key: string) => memoryStore.get(key)),
    getNumber: jest.fn((key: string) => {
      const value = memoryStore.get(key);
      return value != null ? Number(value) : undefined;
    }),
    getBoolean: jest.fn((key: string) => {
      const value = memoryStore.get(key);
      if (value == null) return undefined;
      return value === "true";
    }),
    delete: jest.fn((key: string) => {
      memoryStore.delete(key);
    }),
    clearAll: jest.fn(() => {
      memoryStore.clear();
    }),
    contains: jest.fn((key: string) => memoryStore.has(key)),
  };

  return {
    MMKV: jest.fn(() => storage),
    createMMKV: jest.fn(() => storage),
  };
});

jest.mock("react-native-gifted-charts", () => ({
  PieChart: () => null,
  BarChart: () => null,
  LineChart: () => null,
}));

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper", () => ({}), {
  virtual: true,
});

// Suppress console warnings during tests
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Non-serializable values were found") ||
        args[0].includes("Failed prop type") ||
        args[0].includes("Cannot act") ||
        args[0].includes("TurboModule") ||
        args[0].includes("has been extracted from react-native") ||
        args[0].includes("has been deprecated"))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };

  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Error: MissingWebViewImpl") ||
        args[0].includes("TurboModule") ||
        args[0].includes("Invariant"))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
