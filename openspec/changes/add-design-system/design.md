## Context

- Expo SDK 57 with NativeWind 4 (Tailwind 3). Every visual value comes from `src/styles/tokens.json` (rule R6); `tailwind.config.js` and `src/styles/tokens.ts` read it.
- Code uses these token names: `brand`, `brand-dark`, `background`, `surface`, `ink`, `ink-muted`, `ink-inverse`, `danger`, the `font-*` families and `rounded-*`. `success` and `warning` are defined but not used.
- The brand is defined in the web repository (`DESIGN.md`, ADR-001). The portal uses semantic CSS variables with a light and a dark set; the app has only a light set.

## Decisions

### D1. Keep the token names, change the values

The existing names stay, so the button and the example screen keep working without edits and later tasks see the same vocabulary. Mapping from the portal's light theme:

| Token                  | Value                | Portal equivalent          |
| ---------------------- | -------------------- | -------------------------- |
| `brand`                | Capibaribe `#1D4FB8` | `primary`                  |
| `brand-dark`           | Marinho `#0E2A5C`    | pressed state; brand panel |
| `brand-light`          | Bruma `#BCD3F5`      | `highlight`                |
| `background`           | Porcelana `#F1F5FC`  | `background`               |
| `surface`              | `#FFFFFF`            | `surface`                  |
| `border` (new)         | Névoa `#D6DFEE`      | `border`                   |
| `ink`                  | Marinho `#0E2A5C`    | `foreground`               |
| `ink-muted`            | Ardósia `#4A5A78`    | `muted`                    |
| `ink-inverse`          | Porcelana `#F1F5FC`  | `primary-fg`               |
| `danger`               | Pitanga `#C62839`    | `danger`                   |
| `danger-surface` (new) | `#FCE6E9`            | `danger-surface`           |

Rejected: renaming to the portal names (`primary`, `foreground`...). It would align the two vocabularies but touch every component now and has no user-visible gain; it can be done when the app gets its first real screens.

### D2. Remove `success` and `warning`

The brand has no green or yellow; states are told apart by fill, outline, icon and text. Keeping the tokens would invite their use. Nothing references them.

### D3. Inter from `@expo-google-fonts/inter`

Same weights as before (300, 400, 500, 600), so `font-light`, `font-sans`, `font-medium` and `font-semibold` keep their meaning. The package loads the files through `expo-font` at runtime: no config plugin and no native change for the typeface. Rejected: embedding the font through the `expo-font` config plugin; it saves the first-load wait but forces a native build for every font change, and the splash already covers the load.

### D4. Corners

All radius steps (`sm`, `md`, `lg`) become 4 px, the brand's single corner. `full` stays for round elements such as a spinner. Rejected: removing `md` and `lg`; it would break existing classes for no visual difference.

### D5. Icons and splash

PNG files are generated from the brand SVGs in the web repository (`src/shared/assets/brand/`), not redrawn:

- `icon.png`, 1024 × 1024: stacked negative logo centred on Marinho, square (each platform applies its own mask).
- `adaptive-icon.png`, 1024 × 1024, transparent: the same logo inside the central 66 % safe zone; the Marinho comes from `android.adaptiveIcon.backgroundColor`.
- `splash-icon.png`: the horizontal logo with the light on "LUX", transparent, on a Marinho splash background.
- `favicon.png`, 48 × 48: stacked negative logo on a Marinho square, like the portal favicon (browsers show it too small for the portal's rounded corners to matter).

### D6. Light appearance only

`userInterfaceStyle` goes from `automatic` to `light`. With `automatic`, system parts (status bar text, alerts, pickers) turn dark when the phone is in dark mode while the app content stays light, which mixes both. Rejected: keeping `automatic` and adding a dark set now; it is out of scope and the dark values for the app have not been reviewed.

### D7. Native background

`SystemUI.setBackgroundColorAsync` keeps using the `background` token, now Porcelana, so the window behind the first frame matches the screens. The splash background is Marinho.

## Rules R1–R7

No rule changes: values stay in `tokens.json` (R6), the provider keeps living in `src/providers` (R1), and no screen or feature is added.

## Risks and trade-offs

- The icon and splash are only visible in a native build; reviewers using Expo Go see the old ones. The change summary says how to check them.
- No ADR: the cross-cutting decision is ADR-001 in the web repository. This change applies it.
