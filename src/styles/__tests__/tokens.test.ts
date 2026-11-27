import { colors as colorTokens } from "../tokens";

/**
 * The brand rules for color live in the web repository's DESIGN.md
 * ("DistriLux — Brand guidelines 1.0"): one palette, red only for errors, no
 * green or yellow, and every text pair readable (WCAG AA, 4.5:1).
 */

const PALETTE = {
  marinho: "#0E2A5C",
  capibaribe: "#1D4FB8",
  celeste: "#3E8BF0",
  bruma: "#BCD3F5",
  porcelana: "#F1F5FC",
  nevoa: "#D6DFEE",
  ardosia: "#4A5A78",
  pitanga: "#C62839",
  white: "#FFFFFF",
  errorBackground: "#FCE6E9",
};

type ColorTree = { [name: string]: string | ColorTree };

/** `{ ink: { DEFAULT, muted } }` → `{ ink, "ink-muted" }`, like Tailwind. */
function flatten(tree: ColorTree, prefix = ""): Record<string, string> {
  return Object.entries(tree).reduce<Record<string, string>>(
    (flat, [key, value]) => {
      const name =
        key === "DEFAULT" ? prefix : prefix ? `${prefix}-${key}` : key;
      if (typeof value === "string") return { ...flat, [name]: value };
      return { ...flat, ...flatten(value, name) };
    },
    {},
  );
}

const colors = flatten(colorTokens as ColorTree);

function color(name: string) {
  const value = colors[name];
  if (!value) throw new Error(`Missing color token "${name}"`);
  return value;
}

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((start) => {
    const channel = parseInt(hex.slice(start, start + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string) {
  const [light, dark] = [luminance(foreground), luminance(background)].sort(
    (a, b) => b - a,
  );
  return (light + 0.05) / (dark + 0.05);
}

describe("color tokens", () => {
  it("offers only palette colors, white and the error background", () => {
    const allowed = Object.values(PALETTE);

    for (const value of Object.values(colors)) {
      expect(allowed).toContain(value.toUpperCase());
    }
  });

  it("offers no success or warning color", () => {
    const names = Object.keys(colors);

    expect(names.filter((name) => /success|warning/.test(name))).toEqual([]);
  });

  it("uses Pitanga for errors", () => {
    expect(color("danger").toUpperCase()).toBe(PALETTE.pitanga);
    expect(color("danger-surface").toUpperCase()).toBe(PALETTE.errorBackground);
  });

  it.each([
    ["ink", "background"],
    ["ink", "surface"],
    ["ink-muted", "background"],
    ["ink-muted", "surface"],
    ["ink-inverse", "brand"],
    ["danger", "surface"],
    ["danger", "danger-surface"],
  ])("%s on %s has a contrast of at least 4.5:1", (text, background) => {
    expect(contrast(color(text), color(background))).toBeGreaterThanOrEqual(
      4.5,
    );
  });
});
