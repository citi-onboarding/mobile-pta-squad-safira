## Why

The manager app still carries the template look: Barlow, a generic blue, a grey splash and the Expo icon. The web portal now has the approved DistriLux identity (web repository, change `add-design-system`, task FRONT-02). The manager app must open and read as the same product, so this change (the manager-app part of backlog task FRONT-02) gives it the brand tokens, typeface, icon and splash. Every manager-app screen of later tasks is built on these tokens.

## What Changes

- Replace the values in `src/styles/tokens.json` with the DistriLux palette, keeping the token names the code already uses, and remove the green and yellow tokens.
- Use Inter instead of Barlow.
- Set the app icon, the Android adaptive icon, the splash and the web favicon to the DistriLux logo on Marinho, and paint the native backgrounds with the brand colors.
- Keep the app in the light appearance until a dark theme is designed for it.

### In scope

- Tokens (colors, typeface, corners), `app.json` (colors, appearance), brand images in `assets/images/`, and the provider that loads the typeface.
- Contrast AA for every text and background pair the tokens define.
- The documentation that names the template typeface (`SETUP.md`).

### Out of scope

- Manager-app screens and new components (MOB tasks).
- A dark theme for the app: the portal has one, the app keeps the light appearance for now. The tokens keep one file, so a dark set can be added later without touching components.
- The tile imagery: it belongs to identity screens of the app, which come with later tasks.
- Any change to the back-end API.

## Impact

- Native build: **needed.** The icon, the adaptive icon, the splash and `userInterfaceStyle` live in `app.json` and only change in a new native build (`npx expo run:android` / `run:ios`, or an EAS build). Expo Go keeps its own icon and splash, so there only the colors and the typeface can be checked. The typeface itself loads at runtime through `expo-font`, with no config plugin.
- Navigation and deep links: none. `scheme`, bundle identifier and package stay the same.
- API contract: none.
- Environment: none. No new `EXPO_PUBLIC_*` variable.
- Security and privacy: none. Images and colors are public brand material.
- Accessibility: text and background pairs meet WCAG AA (4.5:1 for text), checked by an automated test. Errors keep a text message, never color alone.
- Dependencies: `@expo-google-fonts/inter` replaces `@expo-google-fonts/barlow`.
- Documentation: `SETUP.md` (the step that names Barlow) and `docs/changes/add-design-system.md`.

### Decisions already taken

Approved with the squad manager on 26/11 and recorded in the web repository (`DESIGN.md`, ADR-001 "Design system for the portal and the manager app").

- Palette: Marinho `#0E2A5C`, Azul Capibaribe `#1D4FB8`, Celeste `#3E8BF0`, Bruma `#BCD3F5`, Porcelana `#F1F5FC`, Névoa `#D6DFEE`, Ardósia `#4A5A78`, and Pitanga `#C62839` for errors only (error background `#FCE6E9`). No green or yellow.
- Typeface: Inter. Corners: 4 px.
- App icon and adaptive icon: the stacked negative logo on Marinho. Splash: the horizontal logo with the light on "LUX", on Marinho.
- The manager app uses NativeWind with the same token values as the portal (ADR-001).

### Open questions

None.
