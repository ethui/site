export const docsManifest = {
  sections: [
    {
      title: "Getting started",
      slug: "getting-started",
      children: [
        await import("#/docs/getting-started/installation.md"),
        await import("#/docs/getting-started/what-is-ethui.md"),
      ],
    },
    {
      title: "Integrations",
      slug: "integrations",
      children: [
        await import("#/docs/integrations/forge.md"),
        await import("#/docs/integrations/anvil.md"),
      ],
    },
    {
      title: "Features",
      slug: "features",
      children: [
        await import("#/docs/features/fast-mode.md"),
        await import("#/docs/features/auto-impersonation.md"),
      ],
    },
  ],
};
