import { useFonts } from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { Text } from "react-native";

import { TEST_METRICS, render, screen, waitFor } from "@test/render";

import { AppProviders } from "../app-providers";

/**
 * This test is shallow on purpose: it does not verify product behaviour, it
 * verifies that the provider tree mounts. That is what catches a broken or
 * missing provider before the whole app boots to a black screen.
 *
 * It uses the plain `render` rather than `renderWithProviders` because
 * `AppProviders` itself is the subject under test.
 */

function mount() {
  return render(
    <AppProviders initialMetrics={TEST_METRICS}>
      <Text>content</Text>
    </AppProviders>,
  );
}

describe("AppProviders", () => {
  afterEach(() => {
    jest.mocked(useFonts).mockReturnValue([true, null]);
  });

  it("renders the children once the fonts have loaded", async () => {
    await mount();

    await waitFor(() => expect(screen.getByText("content")).toBeOnTheScreen());
  });

  it("paints the native background with the background token", async () => {
    await mount();

    await waitFor(() =>
      expect(SystemUI.setBackgroundColorAsync).toHaveBeenCalledWith("#F1F5FC"),
    );
  });

  it("hides the splash screen once the fonts have loaded", async () => {
    await mount();

    await waitFor(() => expect(SplashScreen.hideAsync).toHaveBeenCalled());
  });

  it("loads Inter in the light, regular, medium and semibold weights", async () => {
    await mount();

    expect(useFonts).toHaveBeenCalledWith({
      Inter_300Light: "Inter_300Light",
      Inter_400Regular: "Inter_400Regular",
      Inter_500Medium: "Inter_500Medium",
      Inter_600SemiBold: "Inter_600SemiBold",
    });
  });

  it("keeps the splash and renders nothing while Inter is loading", async () => {
    jest.mocked(useFonts).mockReturnValue([false, null]);

    await mount();

    expect(screen.queryByText("content")).not.toBeOnTheScreen();
    expect(SplashScreen.hideAsync).not.toHaveBeenCalled();
  });
});
