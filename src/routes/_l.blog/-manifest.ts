import * as blog01 from "#/blog/01-announcing-ethui/index.mdx";
import * as blog02 from "#/blog/02-ethui-0.2.0-ui-level-up/index.mdx";
import * as blog03 from "#/blog/03-ethui-0.3.1-mainnet/index.mdx";
import * as blog04 from "#/blog/04-instant-foundry-abi-explorer/index.mdx";
import * as blog05 from "#/blog/05-ethui-0.5.0-impersonation/index.mdx";
import * as blog06 from "#/blog/06-ethui-0.6.0-going-multi-chain/index.mdx";
import * as blog07 from "#/blog/07-ethui-0.7.0-eth-lisbon/index.mdx";
import * as blog08 from "#/blog/08-ethui-1.1.1-ledger-devtools/index.mdx";
import * as blog09 from "#/blog/09-ethui-1.6-a-new-beginning/index.mdx";
import * as blog10 from "#/blog/10-ethui-1.7-forms/index.mdx";
import * as blog11 from "#/blog/11-ethui-1.13-were-back/index.mdx";
import * as blog12 from "#/blog/12-ethui-1.14/index.mdx";
import * as blog13 from "#/blog/13-ethui-explorer/index.mdx";
import * as blog14 from "#/blog/14-stacks/index.mdx";
import * as blog15 from "#/blog/15-ethui-1.27-hardhat-support/index.mdx";

// Helper to get og-banner image for a slug
const getOgBannerForSlug = (slug: string): string => {
  const baseUrl = import.meta.env.PROD
    ? `https://${import.meta.env.VERCEL_URL || "ethui.dev"}`
    : "http://localhost:3000";
  return `${baseUrl}/opengraph/${getDirectoryFromSlug(slug)}/banner.png`;
};

// Map slug to directory name
const getDirectoryFromSlug = (slug: string): string => {
  const slugToDir: Record<string, string> = {
    "announcing-ethui": "01-announcing-ethui",
    "ethui-0.2.0-ui-level-up": "02-ethui-0.2.0-ui-level-up",
    "ethui-0.3.1-mainnet": "03-ethui-0.3.1-mainnet",
    "instant-foundry-abi-explorer": "04-instant-foundry-abi-explorer",
    "ethui-0.5.0-impersonation": "05-ethui-0.5.0-impersonation",
    "ethui-0.6.0-going-multi-chain": "06-ethui-0.6.0-going-multi-chain",
    "ethui-0.7.0-eth-lisbon": "07-ethui-0.7.0-eth-lisbon",
    "ethui-1.1.1-ledger-devtools": "08-ethui-1.1.1-ledger-devtools",
    "ethui-1.6.0-a-new-beginning": "09-ethui-1.6-a-new-beginning",
    "ethui-1.7.0-forms": "10-ethui-1.7-forms",
    "ethui-1.13.0-were-back": "11-ethui-1.13-were-back",
    "ethui-1.14.0": "12-ethui-1.14",
    "ethui-explorer": "13-ethui-explorer",
    stacks: "14-ethui-stacks",
    "ethui-1.27-hardhat-support": "15-ethui-1.27-hardhat-support",
  };
  return slugToDir[slug] || slug;
};

const rawBlogManifest = [
  blog01,
  blog02,
  blog03,
  blog04,
  blog05,
  blog06,
  blog07,
  blog08,
  blog09,
  blog10,
  blog11,
  blog12,
  blog13,
  blog14,
  blog15,
];

// Enhanced blog manifest with og-banner images
export const blogManifest = rawBlogManifest.map((post) => ({
  ...post,
  frontmatter: {
    ...post.frontmatter,
    ogBanner: getOgBannerForSlug(post.frontmatter.slug),
  },
}));
