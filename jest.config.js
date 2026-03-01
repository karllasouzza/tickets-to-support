module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg|webp)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-navigation|@react-native-community|@rn-primitives|lucide-react-native|react-native-reanimated|nativewind|react-native-svg|react-native-css-interop|@react-native|react-native|sonner-native)/)",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.{ts,tsx}",
  ],
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.tsx"],
  testEnvironment: "node",
};
