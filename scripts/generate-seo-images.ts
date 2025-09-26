#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT_DIR, 'src', 'blog');
const TEMPLATE_PATH = path.join(ROOT_DIR, 'scripts', 'og-image-template.svg');

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
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function extractFirstParagraph(content: string): string {
  const lines = content.split('\n');
  let firstPara = '';
  let inParagraph = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inParagraph) break;
      continue;
    }
    if (!trimmed.startsWith('#') && !trimmed.startsWith('import') && !trimmed.startsWith('export')) {
      firstPara += (firstPara ? ' ' : '') + trimmed;
      inParagraph = true;
    }
  }
  
  return firstPara.replace(/<[^>]*>/g, '').slice(0, 100) + (firstPara.length > 100 ? '...' : '');
}

async function generateImageForPost(postDir: string, postData: PostData): Promise<void> {
  const template = await fs.readFile(TEMPLATE_PATH, 'utf-8');
  
  // Extract subtitle from content if not in banner metadata
  const mdxPath = path.join(BLOG_DIR, postDir, 'index.mdx');
  const mdxContent = await fs.readFile(mdxPath, 'utf-8');
  const { content } = matter(mdxContent);
  
  // Use banner data if available, otherwise use defaults
  const banner = postData.banner || {} as BannerData;
  const subtitle = banner.subtitle || extractFirstParagraph(content);
  
  // Replace placeholders
  let svg = template
    .replace('{{TYPE}}', escapeXml(banner.type || 'blog'))
    .replace('{{DATE}}', escapeXml(banner.date))
    .replace('{{AUTHOR}}', escapeXml(banner.author))
    .replace('{{TITLE}}', escapeXml(banner.title || postData.title || 'Untitled'))
    .replace('{{SUBTITLE}}', escapeXml(subtitle));
  
  // Convert SVG to PNG
  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: true, // This will load system fonts including Source Code Pro if installed
      defaultFontFamily: 'monospace', // Fallback to monospace if Source Code Pro not found
    },
    dpi: 150,
    fitTo: {
      mode: 'original',
    },
  });
  
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  
  // Save PNG to the post directory
  const outputPath = path.join(BLOG_DIR, postDir, 'banner.png');
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
        const mdxPath = path.join(postPath, 'index.mdx');
        const mdxContent = await fs.readFile(mdxPath, 'utf-8');
        const { data: frontmatter } = matter(mdxContent);
        const postData: PostData = {
          title: frontmatter.title,
          slug: frontmatter.slug,
          banner: frontmatter.banner,
        };
        
        await generateImageForPost(dir, postData);
      } catch (error) {
        console.error(`Error processing ${dir}:`, error instanceof Error ? error.message : String(error));
      }
    }
  }
  
  console.log('SEO image generation complete!');
}

main().catch(console.error);
