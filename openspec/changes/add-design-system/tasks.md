## 1. SDD

- [x] 1.1 Write proposal, design, spec and tasks for `add-design-system`.
- [x] 1.2 Validate with `pnpm spec:validate` and get the developer's confirmation.

## 2. Red

- [x] 2.1 Developer writes the failing tests for every scenario:
  - tokens: palette colors only, no success or warning, Pitanga for errors, contrast AA of the text pairs (`src/styles/__tests__/tokens.test.ts`);
  - provider: Porcelana native background, Inter in four weights before the splash hides (`src/providers/__tests__/app-providers.test.tsx`);
  - app config: Marinho adaptive icon and splash backgrounds, light appearance, image sizes (`tests/tooling/app-config.test.mjs`).
- [x] 2.2 Run the tests and confirm they fail for the expected reason.

## 3. Green

- [ ] 3.1 Replace the values in `src/styles/tokens.json` (D1, D2, D4).
- [ ] 3.2 Replace `@expo-google-fonts/barlow` with `@expo-google-fonts/inter` in `package.json`, the provider, the tokens and the test mock (D3).
- [ ] 3.3 Update `app.json`: adaptive icon and splash backgrounds, `userInterfaceStyle` (D6, D7).
- [ ] 3.4 Generate `icon.png`, `adaptive-icon.png`, `splash-icon.png` and `favicon.png` from the brand SVGs (D5).
- [ ] 3.5 Run the tests and confirm they pass.

## 4. Refactor

- [ ] 4.1 Review names, comments and duplication without changing behavior; tests stay green.

## 5. Consolidation

- [ ] 5.1 Update `SETUP.md` where it names Barlow.
- [ ] 5.2 Run `pnpm verify` (typecheck, lint, tests, tooling tests, strict OpenSpec validation, skills check) and `pnpm doctor`.
- [ ] 5.3 Write `docs/changes/add-design-system.md`.
- [ ] 5.4 Developer checks the icon and splash in a native build.
