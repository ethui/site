import { mainnet } from "wagmi/chains";
import {
  SiFirefoxbrowser,
  SiGithub,
  SiGooglechrome,
} from "@icons-pack/react-simple-icons";
import {
  ConnectButton,
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { createFileRoute, Link } from "@tanstack/react-router";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createFileRoute("/onboarding/extension/")({
  component: Extension,
});

const CHROME_EXTENSION =
  "https://chrome.google.com/webstore/detail/ethui/eljobehkpcnpekmbcjiidekjhkbcnpkf";
const FIREFOX_EXTENSION =
  "https://addons.mozilla.org/en-US/firefox/addon/ethui/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search";
const GITHUB_LATEST_RELEASE = "https://github.com/ethui/ethui/releases/latest";

const wagmi = getDefaultConfig({
  appName: "ethui website",
  projectId: "@ethui/site",
  chains: [mainnet],
  ssr: false,
});

const queryClient = new QueryClient();

export default function Extension() {
  return (
    <WagmiProvider config={wagmi}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="flex h-screen flex-col bg-white">
            <Header />
            <div className="flex flex-col items-center px-6 py-28 sm:py-44 lg:py-52">
              <div className="space-y-4">
                <section>
                  <h2 className="mb-2 font-semibold text-lg">
                    1. Install the ethui extension for your browser:
                  </h2>
                  <DownloadLinks />
                </section>

                <section className="pt-8">
                  <h2 className="mb-2 font-semibold text-lg">
                    2. Refresh this page to reload the extension
                  </h2>
                  <Refresh />
                </section>

                <section className="pt-8">
                  <h2 className="mb-2 font-semibold text-lg">
                    3. Connect the wallet to activate the app
                  </h2>
                  <ConnectButton />
                </section>
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

const Header = () => {
  return (
    <div className="flex items-center">
      <Link to="/">
        <img
          src="https://avatars.githubusercontent.com/u/130035865?s=200&v=4"
          alt="ethui Logo"
          width="40"
          height="40"
          className="h-14 w-auto"
        />
      </Link>
      <div className="flex flex-1 justify-end" />
    </div>
  );
};

const DownloadLinks = () => {
  return (
    <div className="flex gap-2">
      <a
        href={CHROME_EXTENSION}
        rel="noreferrer"
        target="_blank"
        className="flex h-12 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-white hover:bg-slate-600"
      >
        <SiGooglechrome className="text-4xl" />
        <span className="pl-2">Chrome</span>
      </a>
      <a
        href={FIREFOX_EXTENSION}
        rel="noreferrer"
        target="_blank"
        className="flex h-12 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-sm text-white hover:bg-slate-600"
      >
        <SiFirefoxbrowser className="text-4xl" />
        <span className="pl-2">Firefox</span>
      </a>
      <a
        href={GITHUB_LATEST_RELEASE}
        rel="noreferrer"
        target="_blank"
        className="flex h-12 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-sm text-white hover:bg-slate-600"
      >
        <SiGithub className="text-4xl" />
        <span className="pl-2">From Github</span>
      </a>
    </div>
  );
};

const Refresh = () => {
  return (
    <div className="flex gap-2">
      <Link
        to="/onboarding/extension?refresh=true"
        className="flex h-12 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold text-sm text-white hover:bg-slate-600"
      >
        <span>Refresh now</span>
      </Link>
    </div>
  );
};
