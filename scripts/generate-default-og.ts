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
  const logoBlock = `  <g transform="translate(20, 550) scale(0.0667)">
    <path d="M0 0L600 0L600 599.997L0 599.997L0 0Z" fill="#0a0a0a"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M492.005 372L300.005 114L108.005 372H217.239L300.005 260.783L382.771 372H492.005Z" fill="#ffffff"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M216.005 372L300.005 486L384.005 372L336.215 372L300.005 421.142L263.795 372L216.005 372Z" fill="#ffffff"/>
  </g>
`;
  const centeredLogoBlock = `  <g transform="translate(282, 280) scale(0.16)">
    <path d="M0 0L600 0L600 599.997L0 599.997L0 0Z" fill="#0a0a0a"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M492.005 372L300.005 114L108.005 372H217.239L300.005 260.783L382.771 372H492.005Z" fill="#ffffff"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M216.005 372L300.005 486L384.005 372L336.215 372L300.005 421.142L263.795 372L216.005 372Z" fill="#ffffff"/>
  </g>
`;
  const dateAuthorBlock = `    <tspan font-size="20">
      <tspan x="250" y="565">
        [{{DATE}}]
      </tspan>
      <tspan x="250" y="590">
        [{{AUTHOR}}]
      </tspan>
    </tspan>
`;
  const fullPaneTemplate = template
    .replace(
      '<rect width="550" height="630" transform="translate(0 0.354)" fill="white"/>',
      '<rect width="1200" height="630" fill="white"/>',
    )
    .replace('<rect x="550" width="100%" height="630" fill="#888888"/>', "")
    .replace(dateAuthorBlock, "")
    .replace(
      '    <tspan font-size="32" font-weight="bold" x="70" y="580">\n      ethui\n    </tspan>\n\n',
      "",
    )
    .replace(logoBlock, centeredLogoBlock)
    .replace('<tspan x="20" y="80">', '<tspan x="400" y="300">')
    .replace(
      '<tspan x="20" y="140" font-weight="bold">',
      '<tspan x="400" y="360" font-weight="bold">',
    );
  const svg = fullPaneTemplate
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
