// Jest setup file for React Native testing

// Suppress console warnings during tests
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (...args: any[]) => {
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

  console.error = (...args: any[]) => {
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
