import * as gettingStarted01 from "#/docs/01-getting-started/01-what-is-ethui.mdx";
import * as gettingStarted02 from "#/docs/01-getting-started/02-installation.mdx";

import * as features01Anvil from "#/docs/02-features/01-anvil.mdx";
import * as features02FastMode from "#/docs/02-features/02-fast-mode.mdx";
import * as features03AutoImpersonation from "#/docs/02-features/03-auto-impersonation.mdx";
import * as features04Forge from "#/docs/02-features/04-forge.mdx";
import * as features05LazyLoadedKeys from "#/docs/02-features/05-lazy-loaded-keys.mdx";
import * as features06Sim from "#/docs/02-features/06-simulations.mdx";

import * as wallets01 from "#/docs/03-wallets/01-index.mdx";
import * as wallest02HD from "#/docs/03-wallets/02-hdwallet.mdx";
import * as wallets03Keystore from "#/docs/03-wallets/03-keystore.mdx";
import * as wallets04PKey from "#/docs/03-wallets/04-pkey.mdx";
import * as wallets05Plaintext from "#/docs/03-wallets/05-plaintext.mdx";
import * as wallets06Impersonator from "#/docs/03-wallets/06-impersonator.mdx";
import * as wallets07Ledger from "#/docs/03-wallets/07-ledger.mdx";

export const docsManifest = {
  sections: [
    {
      title: "Getting started",
      slug: "getting-started",
      children: [gettingStarted01, gettingStarted02],
    },
    {
      title: "Features",
      slug: "features",
      children: [
        features01Anvil,
        features02FastMode,
        features03AutoImpersonation,
        features04Forge,
        features05LazyLoadedKeys,
        features06Sim,
      ],
    },
    {
      title: "Wallets",
      slug: "wallets",
      children: [
        wallets01,
        wallest02HD,
        wallets03Keystore,
        wallets04PKey,
        wallets05Plaintext,
        wallets06Impersonator,
        wallets07Ledger,
      ],
    },
  ],
};
