"use client";

import Image from "next/image";
import Link from "next/link";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { foundry } from "@wagmi/core/chains";
import {
  ConnectButton,
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { AiOutlineChrome, AiOutlineGithub } from "react-icons/ai";
import { FaFirefoxBrowser } from "react-icons/fa";

const CHROME_EXTENSION =
  "https://chrome.google.com/webstore/detail/iron-wallet/eljobehkpcnpekmbcjiidekjhkbcnpkf";
const FIREFOX_EXTENSION =
  "https://addons.mozilla.org/en-US/firefox/addon/iron-wallet/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search";
const GITHUB_LATEST_RELEASE =
  "https://github.com/iron-wallet/iron/releases/tag/v0.6.2";

const { chains, publicClient } = configureChains(
  [foundry],
  [publicProvider()],
  { pollingInterval: 500 },
);

const connectors = connectorsForWallets([
  {
    groupName: " ",
    wallets: [injectedWallet({ chains })],
  },
]);

const wagmi = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Extension() {
  return (
    <WagmiConfig config={wagmi}>
      <RainbowKitProvider chains={chains}>
        <div className="bg-white h-screen flex flex-col">
          <Header />
          <div className="flex flex-col items-center py-28 sm:py-44 lg:py-52 px-6">
            <div className="space-y-4">
              <section>
                <h2 className="text-lg font-semibold mb-2">
                  1. Install the Iron extension for your browser:
                </h2>
                <DownloadLinks />
              </section>

              <section className="pt-8">
                <h2 className="text-lg font-semibold mb-2">
                  2. Refresh this page to reload the extension
                </h2>
                <Refresh />
              </section>

              <section className="pt-8">
                <h2 className="text-lg font-semibold mb-2">
                  3. Connect the wallet to activate the app
                </h2>
                <ConnectButton />
              </section>
            </div>
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

const Header = () => {
  return (
    <div className="flex items-center">
      <Link href="/">
        <Image
          src="https://avatars.githubusercontent.com/u/130035865?s=200&v=4"
          alt="Iron Wallet Logo"
          width="40"
          height="40"
          className="h-14 w-auto"
        />
      </Link>
      <div className="flex flex-1 justify-end"></div>
    </div>
  );
};

const DownloadLinks = () => {
  return (
    <div className="flex gap-2">
      <a
        href={CHROME_EXTENSION}
        target="_blank"
        className="flex justify-center items-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-white hover:bg-slate-600 h-12"
      >
        <AiOutlineChrome className="text-4xl" />
        <span className="pl-2">Chrome</span>
      </a>
      <a
        href={FIREFOX_EXTENSION}
        target="_blank"
        className="flex justify-center items-center rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-slate-600 h-12"
      >
        <FaFirefoxBrowser className="text-4xl" />
        <span className="pl-2">Firefox</span>
      </a>
      <a
        href={GITHUB_LATEST_RELEASE}
        target="_blank"
        className="flex justify-center items-center rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-slate-600 h-12"
      >
        <AiOutlineGithub className="text-4xl" />
        <span className="pl-2">From Github</span>
      </a>
    </div>
  );
};

const Refresh = () => {
  return (
    <div className="flex gap-2">
      <a
        href="/onboarding/extension?refresh=true"
        className="flex justify-center items-center rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-slate-600 h-12"
      >
        <span>Refresh now</span>
      </a>
    </div>
  );
};
