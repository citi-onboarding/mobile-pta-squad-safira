import assert from "node:assert/strict";
import fs from "node:fs";
import { describe, it } from "node:test";
import { inflateSync } from "node:zlib";

/**
 * Brand icon, splash and appearance (change add-design-system). These values
 * only reach the phone in a native build, so they are checked here, in the
 * config and in the images themselves.
 */

const MARINHO = "#0E2A5C";

const root = new URL("../../", import.meta.url);
const appJson = JSON.parse(fs.readFileSync(new URL("app.json", root), "utf8"));
const { expo } = appJson;

function image(name) {
  return new URL(`assets/images/${name}`, root);
}

/** Width, height and, for 8-bit non-interlaced PNGs, the top-left pixel. */
function readPng(url) {
  const bytes = fs.readFileSync(url);
  let offset = 8;
  let header;
  let palette;
  let alphas;
  const data = [];

  while (offset < bytes.length) {
    const length = bytes.readUInt32BE(offset);
    const type = bytes.toString("ascii", offset + 4, offset + 8);
    const body = bytes.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      header = {
        width: body.readUInt32BE(0),
        height: body.readUInt32BE(4),
        bitDepth: body[8],
        colorType: body[9],
        interlace: body[12],
      };
    }
    if (type === "PLTE") palette = body;
    if (type === "tRNS") alphas = body;
    if (type === "IDAT") data.push(body);
    offset += 12 + length;
  }

  return { width: header.width, height: header.height, corner };

  function corner() {
    assert.equal(header.bitDepth, 8, `${url.pathname}: expected 8-bit PNG`);
    assert.equal(header.interlace, 0, `${url.pathname}: expected no interlace`);
    return firstPixel(header, palette, alphas, data, url);
  }
}

function firstPixel(header, palette, alphas, data, url) {
  // The first row's filter cannot change the first pixel: every predictor
  // reads zeros there. So the bytes after the filter byte are the pixel.
  const pixels = inflateSync(Buffer.concat(data));
  const first = pixels.subarray(1, 5);
  let rgba;
  if (header.colorType === 6) rgba = [...first];
  else if (header.colorType === 2) rgba = [...first.subarray(0, 3), 255];
  else if (header.colorType === 3) {
    const index = first[0];
    rgba = [
      ...palette.subarray(index * 3, index * 3 + 3),
      alphas && index < alphas.length ? alphas[index] : 255,
    ];
  } else {
    assert.fail(`${url.pathname}: unsupported PNG color type`);
  }

  return rgba;
}

function hex([r, g, b]) {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

describe("brand icon and splash", () => {
  it("paints the Android adaptive icon background in Marinho", () => {
    assert.equal(expo.android.adaptiveIcon.backgroundColor, MARINHO);
  });

  it("paints the splash background in Marinho", () => {
    const [, options] = expo.plugins.find(
      (plugin) => Array.isArray(plugin) && plugin[0] === "expo-splash-screen",
    );

    assert.equal(options.backgroundColor, MARINHO);
  });

  it("uses square images of the expected sizes", () => {
    for (const [name, size] of [
      ["icon.png", 1024],
      ["adaptive-icon.png", 1024],
      ["favicon.png", 48],
    ]) {
      const { width, height } = readPng(image(name));
      assert.deepEqual([width, height], [size, size], name);
    }
  });

  it("draws the app icon and the favicon on a Marinho square", () => {
    for (const name of ["icon.png", "favicon.png"]) {
      const corner = readPng(image(name)).corner();
      assert.equal(hex(corner), MARINHO, name);
      assert.equal(corner[3], 255, `${name} corner must be opaque`);
    }
  });

  it("leaves the adaptive icon and the splash logo transparent around the logo", () => {
    for (const name of ["adaptive-icon.png", "splash-icon.png"]) {
      const corner = readPng(image(name)).corner();
      assert.equal(corner[3], 0, `${name} corner must be transparent`);
    }
  });
});

describe("appearance", () => {
  it("keeps the light appearance when the phone is in dark mode", () => {
    assert.equal(expo.userInterfaceStyle, "light");
  });
});
