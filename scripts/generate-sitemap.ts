import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const SITE_URL = "https://ethui.dev";
const ROOT = path.resolve(import.meta.dirname, "..");

// Static pages
const staticPages = ["/", "/blog"];

// Read blog slugs from MDX frontmatter
function getBlogSlugs(): string[] {
  const blogDir = path.join(ROOT, "src/blog");
  const dirs = fs
    .readdirSync(blogDir)
    .filter((d) => fs.statSync(path.join(blogDir, d)).isDirectory())
    .sort();

  return dirs.map((dir) => {
    const mdxPath = path.join(blogDir, dir, "index.mdx");
    const { data } = matter(fs.readFileSync(mdxPath, "utf-8"));
    return data.slug as string;
  });
}

// Read docs slugs from MDX frontmatter, organized by section
function getDocsSlugs(): string[] {
  const docsDir = path.join(ROOT, "src/docs");
  const sections = fs
    .readdirSync(docsDir)
    .filter((d) => fs.statSync(path.join(docsDir, d)).isDirectory())
    .sort();

  const slugs: string[] = [];

  for (const section of sections) {
    // Derive section slug from directory name (e.g. "01-getting-started" -> "getting-started")
    const sectionSlug = section.replace(/^\d+-/, "");
    const sectionDir = path.join(docsDir, section);
    const files = fs
      .readdirSync(sectionDir)
      .filter((f) => f.endsWith(".mdx"))
      .sort();

    for (const file of files) {
      const { data } = matter(
        fs.readFileSync(path.join(sectionDir, file), "utf-8"),
      );
      slugs.push(`${sectionSlug}/${data.slug}`);
    }
  }

  return slugs;
}

function generateSitemap(): string {
  const blogSlugs = getBlogSlugs();
  const docsSlugs = getDocsSlugs();

  const urls = [
    ...staticPages.map((p) => ({
      path: p,
      priority: p === "/" ? "1.0" : "0.7",
    })),
    ...blogSlugs.map((slug) => ({ path: `/blog/${slug}`, priority: "0.6" })),
    ...docsSlugs.map((slug) => ({ path: `/docs/${slug}`, priority: "0.8" })),
  ];

  const entries = urls
    .map(
      ({ path, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

const sitemap = generateSitemap();
const outPath = path.join(ROOT, "public/sitemap.xml");
fs.writeFileSync(outPath, sitemap);
console.log(
  `Generated sitemap.xml with ${sitemap.match(/<url>/g)?.length} URLs -> ${outPath}`,
);
