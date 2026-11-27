## ADDED Requirements

### Requirement: Brand colors only

The app SHALL use only colors from the DistriLux palette (Marinho, Azul Capibaribe, Celeste, Bruma, Porcelana, Névoa, Ardósia, Pitanga), white, and the error background `#FCE6E9`. It MUST NOT offer green or yellow colors.

#### Scenario: Only palette colors are available

- **WHEN** the set of colors available to the app is read
- **THEN** every color is one of the palette colors, white, or the error background
- **AND** no color is named success or warning

#### Scenario: Errors use Pitanga

- **WHEN** the app shows an error color
- **THEN** it is Pitanga `#C62839`

#### Scenario: The window behind the first frame matches the screens

- **WHEN** the app starts
- **THEN** the native window background is Porcelana `#F1F5FC`

### Requirement: Readable text

Every text and background pair the app defines SHALL have a contrast ratio of at least 4.5:1.

#### Scenario: Text pairs meet AA

- **WHEN** the contrast of each pair is measured: text on background, text on surface, muted text on background, muted text on surface, inverse text on the brand color, error text on surface, and error text on the error background
- **THEN** each ratio is at least 4.5:1

### Requirement: Inter typeface

The app SHALL show text in Inter, in the light, regular, medium and semibold weights, and MUST NOT hide the splash before the typeface has loaded.

#### Scenario: Inter loads before the first screen

- **WHEN** the app starts
- **THEN** it loads Inter in the four weights
- **AND** the splash is hidden only after they have loaded

### Requirement: Brand icon and splash

The installed app SHALL show the DistriLux logo as its icon and on its splash, on a Marinho background.

#### Scenario: Android adaptive icon

- **WHEN** the app is installed on Android
- **THEN** the adaptive icon shows the DistriLux logo on a Marinho `#0E2A5C` background

#### Scenario: Splash

- **WHEN** the app opens on Android or iOS
- **THEN** the splash shows the DistriLux logo on a Marinho `#0E2A5C` background

#### Scenario: Image sizes

- **WHEN** the brand images are read
- **THEN** the app icon and the adaptive icon are 1024 × 1024 pixels and the web favicon is 48 × 48 pixels

### Requirement: Light appearance

The app SHALL keep the light appearance when the phone is in dark mode, until a dark theme is designed for it.

#### Scenario: Phone in dark mode

- **WHEN** the phone uses the dark system appearance
- **THEN** the app and its system parts (status bar, alerts) keep the light appearance
