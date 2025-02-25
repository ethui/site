export const docsManifest = {
  sections: [
    {
      title: "Getting started",
      slug: "getting-started",
      children: [
        await import("#/docs/01-getting-started/01-what-is-ethui.mdx"),
        await import("#/docs/01-getting-started/02-installation.mdx"),
      ],
    },
    {
      title: "Features",
      slug: "features",
      children: [
        await import("#/docs/02-features/01-anvil.mdx"),
        await import("#/docs/02-features/fast-mode.mdx"),
        await import("#/docs/02-features/auto-impersonation.mdx"),
      ],
    },
  ],
};
