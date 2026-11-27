---
change_id: add-design-system
date: 2026-11-27
status: in-progress # in-progress | shipped | deprecated
owners: [Beatriz]
tags: [mobile, design-system]
related_adrs: [] # The decision is ADR-001 in the web repository.
openspec_change: openspec/changes/add-design-system/
---

# DistriLux identity in the manager app (FRONT-02)

## Objective

Make the manager app open and read as the same product as the web portal: the template colors, typeface, icon and splash are replaced with the approved DistriLux identity. Later manager-app screens are built on these tokens.

## Change made

- `src/styles/tokens.json`: DistriLux palette under the existing token names (`brand` = Azul Capibaribe, `brand-dark` and `ink` = Marinho, `brand-light` = Bruma, `background` and `ink-inverse` = Porcelana, `ink-muted` = Ardósia, `danger` = Pitanga), new `border` (Névoa) and `danger-surface` (`#FCE6E9`), no `success` or `warning`, Inter in four weights, 4 px corners.
- `@expo-google-fonts/inter` replaces `@expo-google-fonts/barlow`; `src/providers/app-providers.tsx` loads Inter before hiding the splash.
- `app.json`: Marinho background for the Android adaptive icon and the splash; `userInterfaceStyle` set to `light`.
- `assets/images/`: icon, adaptive icon, splash and favicon rendered from the brand SVGs of the web repository (`src/shared/assets/brand/`), not redrawn.
- `SETUP.md`: brand step marked as done and names Inter.

## Resulting behavior

- Every screen uses only brand colors; errors are Pitanga; there is no green or yellow.
- Text, muted text, inverse text on the brand color and error text all reach at least 4.5:1 contrast.
- Text is set in Inter; the splash stays until the typeface has loaded.
- The installed app shows the DistriLux logo on Marinho as its icon and on its splash.
- With the phone in dark mode, the app and its system parts stay light.

## Impact

- **Native build needed.** Icon, adaptive icon, splash and `userInterfaceStyle` change only in a new native build (`npx expo run:android` / `run:ios` or EAS). Expo Go shows its own icon and splash; there only colors and typeface can be checked.
- Platforms: Android, iOS and web.
- Navigation, deep links, API contract, environment: no change.
- Components and the example screen keep working without edits, since token names are unchanged.

## Validations executed

- `pnpm test` (Jest): 48 tests passed; coverage 91 % statements, 83.56 % branches.
- `pnpm test:tooling`: 24 tests passed, including `tests/tooling/app-config.test.mjs` (Marinho backgrounds, light appearance, image sizes and corner pixels).
- `pnpm typecheck` and `pnpm lint`: no errors or warnings.
- `openspec validate --all --strict`: passed.
- `pnpm skills:check`: passed.
- `pnpm doctor`: the offline checks passed; the three checks that need the Expo API could not run in the development environment (no network) and must be run on a machine with network access.

## Related artifacts

- Proposal: `openspec/changes/add-design-system/proposal.md`
- Design: `openspec/changes/add-design-system/design.md`
- Specification: `openspec/changes/add-design-system/specs/design-system/spec.md`
- Tasks: `openspec/changes/add-design-system/tasks.md`
- Web repository: `DESIGN.md`, `docs/adr/ADR-001-design-system.md` and the change `add-design-system` (portal part of FRONT-02).

## Usage

- Use the utility classes fed by the tokens (`bg-brand`, `text-ink-muted`, `border-border`, `bg-danger-surface`, `font-semibold`); never write a hex value in a component (rule R6).
- To see the icon and splash: `pnpm install`, then `npx expo run:android` or `npx expo run:ios`.

## Implementation notes

- The app has no dark theme yet (out of scope). A dark set can be added to the tokens later; until then `userInterfaceStyle` stays `light`.
- The token names still follow the template vocabulary (`brand`, `ink`) instead of the portal's (`primary`, `foreground`). Renaming is deferred to the first real manager-app screens (design D1).
- The PNG images were rendered with a headless browser from the SVGs at these sizes: icon and adaptive icon 1024 × 1024 (logo inside the 66 % safe zone on the adaptive icon), splash 1024 × 1024 transparent, favicon 48 × 48.
