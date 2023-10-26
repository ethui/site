"use client";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { foundry } from "@wagmi/core/chains";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [foundry],
  [publicProvider()],
  { pollingInterval: 500 }
);

const { connectors } = getDefaultWallets({
  appName: "Iron Site",
  projectId: "iron-site",
  chains,
});

const wagmi = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Web3({ children }: Props) {
  return (
    <WagmiConfig config={wagmi}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}

interface Props {
  children: React.ReactNode;
}
