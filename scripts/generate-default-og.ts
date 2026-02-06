#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const svgPath = path.join(__dirname, "og-default.svg");
  const outputPath = path.join(
    __dirname,
    "..",
    "public",
    "opengraph",
    "default.png",
  );

  const svg = await fs.readFile(svgPath, "utf-8");
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: 1200,
    },
  });

  const pngData = resvg.render();
  await fs.writeFile(outputPath, pngData.asPng());

  console.log(`✓ Generated: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
