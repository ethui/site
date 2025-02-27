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
        await import("#/docs/02-features/02-fast-mode.mdx"),
        await import("#/docs/02-features/03-auto-impersonation.mdx"),
        await import("#/docs/02-features/04-lazy-loaded-keys.mdx"),
      ],
    },
    {
      title: "Wallets",
      slug: "wallets",
      children: [await import("#/docs/03-wallets/01-index.mdx")],
    },
  ],
};
