#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function main() {
  const templatePath = path.join(__dirname, "og-image-template.svg");
  const outputPath = path.join(
    __dirname,
    "..",
    "public",
    "opengraph",
    "default.png",
  );

  const template = await fs.readFile(templatePath, "utf-8");
  const svg = template
    .replace("{{TYPE}}", escapeXml("site"))
    .replace("{{DATE}}", escapeXml(""))
    .replace("{{AUTHOR}}", escapeXml("ethui"))
    .replace("{{TITLE}}", escapeXml("ethui"))
    .replace("{{SUBTITLE}}", escapeXml("Ethereum toolkit"));

  const resvg = new Resvg(svg, {
    font: {
      fontFiles: [
        path.join(__dirname, "fonts", "SourceCodePro-Regular.ttf"),
        path.join(__dirname, "fonts", "SourceCodePro-Bold.ttf"),
      ],
      loadSystemFonts: false,
      defaultFontFamily: "Source Code Pro",
    },
    dpi: 150,
    fitTo: {
      mode: "original",
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
