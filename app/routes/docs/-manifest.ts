import * as whatisEthui from "#/docs/01-getting-started/01-what-is-ethui.mdx";
import installation from "#/docs/01-getting-started/02-installation.mdx";
import anvil, {
  frontmatter as anvilFrontmatter,
} from "#/docs/02-features/01-anvil.mdx";
console.log(anvil);

export const docsManifest = {
  sections: [
    //{
    //  title: "Getting started",
    //  slug: "getting-started",
    //  children: [
    //    await import("#/docs/01-getting-started/01-what-is-ethui.mdx"),
    //    await import("#/docs/01-getting-started/02-installation.mdx"),
    //  ],
    //},
    {
      title: "Features",
      slug: "features",
      children: [
        { Component: anvil, frontmatter: anvilFrontmatter },
        //await import("#/docs/02-features/01-anvil.mdx"),
        //await import("#/docs/02-features/fast-mode.mdx"),
        //await import("#/docs/02-features/auto-impersonation.mdx"),
      ],
    },
    //{
    //  title: "Integrations",
    //  slug: "integrations",
    //  children: [
    //    await import("#/docs/03-integrations/forge.mdx"),
    //    await import("#/docs/03-integrations/anvil.mdx"),
    //  ],
    //},
  ],
};
