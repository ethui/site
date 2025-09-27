#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, "..");
const BLOG_DIR = path.join(ROOT_DIR, "src", "blog");
const TEMPLATE_PATH = path.join(ROOT_DIR, "scripts", "og-image-template.svg");

interface BannerData {
  type?: string;
  date: string;
  author: string;
  title: string;
  subtitle: string;
}

interface PostData {
  title: string;
  slug: string;
  banner?: BannerData;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function generateImageForPost(
  postDir: string,
  postData: PostData,
): Promise<void> {
  const template = await fs.readFile(TEMPLATE_PATH, "utf-8");

  // Use banner data if available, otherwise use defaults
  const banner = postData.banner || ({} as BannerData);

  // Check if banner.png exists and embed it
  const bannerImagePath = path.join(BLOG_DIR, postDir, "banner.png");
  let bannerImageElement = "";

  try {
    const bannerImageBuffer = await fs.readFile(bannerImagePath);
    const base64Image = bannerImageBuffer.toString("base64");
    // Position the image to fill the entire grey area (x=450 to x=1200, full height)
    bannerImageElement = `<image x="450" y="0" width="750" height="630" href="data:image/png;base64,${base64Image}" preserveAspectRatio="xMidYMid slice"/>`;
  } catch (_error) {
    // Banner image doesn't exist, continue without it
    console.log(`No banner image found for ${postDir}`);
  }

  // Replace placeholders
  let svg = template
    .replace("{{TYPE}}", escapeXml(banner.type || "blog"))
    .replace("{{DATE}}", escapeXml(banner.date))
    .replace("{{AUTHOR}}", escapeXml(banner.author))
    .replace(
      "{{TITLE}}",
      escapeXml(banner.title || postData.title || "Untitled"),
    );

  // Insert banner image after the grey rectangle
  if (bannerImageElement) {
    svg = svg.replace(
      '<rect x="450" width="100%" height="630" fill="#888888"/>',
      `<rect x="450" width="100%" height="630" fill="#888888"/>\n  ${bannerImageElement}`,
    );
  }

  // Convert SVG to PNG
  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: true, // This will load system fonts including Source Code Pro if installed
      defaultFontFamily: "monospace", // Fallback to monospace if Source Code Pro not found
    },
    dpi: 150,
    fitTo: {
      mode: "original",
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  // Save PNG to the post directory
  const outputPath = path.join(BLOG_DIR, postDir, "og-banner.png");
  await fs.writeFile(outputPath, pngBuffer);

  console.log(`✓ Generated: ${outputPath}`);
}

async function main(): Promise<void> {
  // Read all blog post directories
  const postDirs = await fs.readdir(BLOG_DIR);

  for (const dir of postDirs) {
    const postPath = path.join(BLOG_DIR, dir);
    const stat = await fs.stat(postPath);

    if (stat.isDirectory()) {
      try {
        // Read the MDX file
        const mdxPath = path.join(postPath, "index.mdx");
        const mdxContent = await fs.readFile(mdxPath, "utf-8");
        const { data: frontmatter } = matter(mdxContent);
        const postData: PostData = {
          title: frontmatter.title,
          slug: frontmatter.slug,
          banner: frontmatter.banner,
        };

        await generateImageForPost(dir, postData);
      } catch (error) {
        console.error(
          `Error processing ${dir}:`,
          error instanceof Error ? error.message : String(error),
        );
      }
    }
  }

  console.log("SEO image generation complete!");
}

main().catch(console.error);
