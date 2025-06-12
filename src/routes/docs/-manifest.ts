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
        await import("#/docs/02-features/04-forge.mdx"),
        await import("#/docs/02-features/05-lazy-loaded-keys.mdx"),
        await import("#/docs/02-features/06-simulations.mdx"),
      ],
    },
    {
      title: "Wallets",
      slug: "wallets",
      children: [
        await import("#/docs/03-wallets/01-index.mdx"),
        await import("#/docs/03-wallets/02-hdwallet.mdx"),
        await import("#/docs/03-wallets/03-keystore.mdx"),
        await import("#/docs/03-wallets/04-pkey.mdx"),
        await import("#/docs/03-wallets/05-plaintext.mdx"),
        await import("#/docs/03-wallets/06-impersonator.mdx"),
        await import("#/docs/03-wallets/07-ledger.mdx"),
      ],
    },
  ],
};
