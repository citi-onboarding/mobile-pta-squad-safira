/**
 * Global test setup, loaded before every suite.
 *
 * The mocks below cover native modules that do not exist in the Jest
 * environment. Without them, any test that mounts the provider tree would fail
 * for reasons unrelated to what it is testing.
 */

jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn().mockResolvedValue(undefined),
  hideAsync: jest.fn().mockResolvedValue(undefined),
  setOptions: jest.fn(),
}));

jest.mock("expo-system-ui", () => ({
  setBackgroundColorAsync: jest.fn().mockResolvedValue(undefined),
}));

// `useFonts` is a jest.fn so tests can simulate the typeface still loading.
jest.mock("@expo-google-fonts/inter", () => ({
  useFonts: jest.fn(() => [true, null]),
  Inter_300Light: "Inter_300Light",
  Inter_400Regular: "Inter_400Regular",
  Inter_500Medium: "Inter_500Medium",
  Inter_600SemiBold: "Inter_600SemiBold",
}));

// Every test starts with clean mocks.
afterEach(() => {
  jest.clearAllMocks();
});
