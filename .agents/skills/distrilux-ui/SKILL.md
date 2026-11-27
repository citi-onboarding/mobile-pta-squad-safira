---
name: distrilux-ui
description: Build or review a screen, a component, or any visual change of the DistriLux manager app following the brand rules of the web repository's DESIGN.md and the app's tokens in src/styles/tokens.json — token classes instead of raw values, loading, empty and error states, Portuguese copy in the brand voice, touch and screen-reader accessibility, and every element of the client's prototype. Before any visual work it reads DESIGN.md from the sibling web repository and reports colors that drifted from the app's tokens. Use whenever a task touches what people see in the app. It covers only the interface; the workflow steps stay with the citi-* skills.
argument-hint: "[tela, componente ou caminho do arquivo]"
---

# DistriLux UI — manager app

The portal and the manager app are one product with one identity. The identity
is written once, in `DESIGN.md` of the web repository (`web-pta-squad-safira`).
This app keeps only the values it uses, in `src/styles/tokens.json`. This skill
makes every screen of the app follow that identity, and keeps the two from
drifting apart.

Speak Brazilian Portuguese with the person — see
`../citi-playbook/references/language.md`.

## Where this skill sits

The CITi skills own the workflow. This skill only adds the interface layer
inside the steps they drive, and never replaces or skips them:

| Moment              | Who leads                               | What this skill adds                                         |
| ------------------- | --------------------------------------- | ------------------------------------------------------------ |
| Bounding the demand | `citi-task-spec`                        | which prototype screen applies, and the brand-source check   |
| Specification       | `openspec-propose`                      | observable states and copy from the prototype, as scenarios  |
| Tests and code      | `citi-tdd-cycle` (with its checkpoints) | how the screen is composed from shared components and tokens |
| Gates               | `citi-verify-scope`                     | the visual pass below, before the gates                      |
| Review              | `citi-review-change`                    | the interface review below, beside the repository rules      |

The `unslop` and `impeccable` skills only polish. When one of their suggestions
contradicts the brand rules, the brand rules win: report the conflict, do not
apply it.

## Step 1 — find the brand source

Do this first, every time, before reading or writing any screen.

1. Look for `../web-pta-squad-safira/DESIGN.md` (the web repository cloned next
   to this one, as the squad keeps them).
2. **If it exists**, it is the source of every brand rule. Read Overview,
   Colors, Typography, Shapes, Components (and its States), Do's and Don'ts,
   Money, Accessibility and Voice. Then run the drift check (step 2).
3. **If it does not exist there**, ask before giving up: "Não achei o
   `DESIGN.md` do web ao lado deste repositório. O `web-pta-squad-safira`
   está clonado em outro lugar? Se estiver, me passa o caminho da pasta."
   If the person gives a path, read `DESIGN.md` from it and run the drift
   check (step 2).
4. **Only when the person says the web repository is not on this computer**,
   tell them: "Vou usar o resumo de reserva da skill, que pode estar
   desatualizado. Para ler a versão atual, clone o `web-pta-squad-safira`
   (de preferência na mesma pasta que este)." Then use the reserve summary
   below and go on.

Never copy `DESIGN.md` into this repository: a copy stops following the source.

## Step 2 — drift check

Compare the `colors` block at the top of `DESIGN.md` (its light theme; the app
has no dark theme) with `src/styles/tokens.json`, pair by pair:

| `tokens.json`    | `DESIGN.md` `colors` |
| ---------------- | -------------------- |
| `brand.DEFAULT`  | `primary`            |
| `brand.dark`     | `marinho`            |
| `brand.light`    | `highlight`          |
| `background`     | `background`         |
| `surface`        | `surface`            |
| `border`         | `border`             |
| `ink.DEFAULT`    | `on-surface`         |
| `ink.muted`      | `muted`              |
| `ink.inverse`    | `on-primary`         |
| `danger.DEFAULT` | `error`              |
| `danger.surface` | `error-surface`      |

Also compare the typeface (`typography` in `DESIGN.md`, `fontFamily` in
`tokens.json`) and the corner (`rounded.tile`, `radius` in `tokens.json`).
A value such as `{colors.capibaribe}` points to that palette color.

- **All equal:** say nothing and go on.
- **Any difference:** stop before touching the screen and report it in
  Portuguese, one line per token, with both values, for example: "O `brand`
  do app é `#1D4FB8`, mas o `primary` do `DESIGN.md` agora é `#2457C5`."
  Do not change `tokens.json` inside a screen task. Brand values change only
  with the squad manager's approval, in their own change ("update the
  DistriLux tokens"), with the token tests in `src/styles/__tests__/` updated
  first. Ask the person whether to open that change now or go on with the
  current values.

## Reserve summary

Use only when `DESIGN.md` is not available. It is the part of the identity
that matters on the app, as approved on 2026-11-26:

- Colors come from the palette: Marinho, Azul Capibaribe, Celeste, Bruma,
  Porcelana, Névoa, Ardósia, and Pitanga for errors only. There is no green or
  yellow: states are told apart by fill, outline, icon and text, never by
  color alone.
- Text in Inter. Corners 4 px, like the edge of a tile; no pills or large
  radii, except round elements such as a spinner.
- Every region that loads data has a loading, an empty and an error state; the
  error state offers "Tentar de novo".
- Money always as `R$ 1.234,56`, negatives included; dates as `DD/MM/AAAA`
  in Recife time.
- Copy in Brazilian Portuguese, short, in sentence case, with the prototype's
  words; uppercase only in small captions of numbers.
- The tile drawing appears only on identity moments (opening, empty states),
  never behind text, lists, numbers or forms.

## Before touching a screen

1. Steps 1 and 2 above.
2. Read `src/styles/tokens.json` and list `src/shared/components/` with the
   components the screen will need. They are the vocabulary; a screen is a
   composition of them.
3. Find the screen in the client's prototype (the manager app part) and, when
   the person has it, in the squad's prototype checklist. List every element
   the screen must show before writing it.
4. Read the active OpenSpec change. Its scenarios decide the behavior; this
   skill decides only how it looks.

## Building

- Compose from `src/shared/components/`. A piece that does not exist yet is
  added there, exported through its `index.ts` and tested, as a scenario of the
  change — never styled ad hoc inside a feature, where the next screen cannot
  reuse it. `AGENTS.md` §"Architecture rules" (R2–R4, R6) and
  §"Repository conventions" own the placement rules.
- Style only with the NativeWind classes the tokens create (`bg-brand`,
  `text-ink-muted`, `border-border`, `bg-danger-surface`, `font-semibold`,
  `rounded-md`). Raw values are a bug (R6). For a native API that takes a value,
  import it from `src/styles/tokens.ts`.
- No dark theme: the app keeps the light appearance (`userInterfaceStyle` in
  `app.json`). Do not add `dark:` classes until a dark set exists in the
  tokens.
- Money and dates go through one shared formatter each. If the app does not
  have it yet, add it to `src/shared/` with its tests, following the portal's
  `formatMoney` (cents in, `Intl` pt-BR BRL out) and `formatDateTime`
  (America/Recife) — never format inline.
- Accessibility: every pressable has `accessibilityRole` and a name
  (its text or `accessibilityLabel`); touch targets at least 44 × 44; errors
  are announced with text, never color alone; decorative images are hidden
  from the screen reader.
- Interface copy keeps the prototype's words. Never invent numbers, names or
  messages the prototype or the change do not give: ask.

## Visual pass (before `citi-verify-scope`)

1. Open the screen with `pnpm start` on Android and on web, at two screen
   sizes (`AGENTS.md` §"Verification").
2. Check: text reads on its background; nothing is cut or overflows on the
   small screen; every control is reachable and named by the screen reader;
   no element of the prototype is missing.
3. Icon, splash and `app.json` changes show only in a native build
   (`npx expo run:android` / `run:ios`), never in Expo Go. When nobody on the
   task can build, say so in the pull request instead of ticking the check.
4. Report in Portuguese: which shared components the screen uses, any component
   added, the result of the drift check, and any departure from the brand
   rules with its reason.

## Interface review

When asked to review a screen or a diff for the interface, report findings in
Portuguese, most serious first, each with `arquivo:linha` and the brand rule it
breaks (the `DESIGN.md` section, or the reserve summary item): a raw value
instead of a token, a hand-made copy of a shared component, a missing
loading/empty/error state, copy that leaves the prototype or the voice, red
used for something that is not an error, a control without an accessible name.
Leave the other repository rules to `citi-review-change`.

## When the brand rules have no answer

Stop and ask the person; do not invent a rule. A new brand rule is agreed with
the squad manager and written first in `DESIGN.md` of the web repository,
then applied here through `tokens.json` in its own change. The app never
becomes the source of a brand rule.
