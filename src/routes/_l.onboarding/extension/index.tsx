import { Button } from "@ethui/ui/components/shadcn/button";
import {
  ConnectButton,
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { FirefoxIcon, GithubIcon, GoogleChromeIcon } from "#/components/icons";

export const Route = createFileRoute("/_l/onboarding/extension/")({
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

function Extension() {
  return (
    <WagmiProvider config={wagmi}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="flex h-screen flex-col bg-white">
            <div className="flex flex-col items-center px-6 py-28 sm:py-44 lg:py-52">
              <div className="space-y-4">
                <section>
                  <h2 className="mb-2 text-lg">
                    1. Install the ethui extension for your browser:
                  </h2>
                  <DownloadLinks />
                </section>

                <section className="pt-8">
                  <h2 className="mb-2 text-lg">
                    2. Refresh this page to reload the extension
                  </h2>
                  <Refresh />
                </section>

                <section className="pt-8">
                  <h2 className="mb-2 text-lg">
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

const DownloadLinks = () => {
  return (
    <div className="flex gap-2">
      <Button asChild>
        <a href={CHROME_EXTENSION} rel="noreferrer" target="_blank">
          <GoogleChromeIcon className="text-4xl" />
          <span className="pl-2">Chrome</span>
        </a>
      </Button>
      <Button asChild>
        <a href={FIREFOX_EXTENSION} rel="noreferrer" target="_blank">
          <FirefoxIcon className="text-4xl" />
          <span className="pl-2">Firefox</span>
        </a>
      </Button>
      <Button asChild>
        <a href={GITHUB_LATEST_RELEASE} rel="noreferrer" target="_blank">
          <GithubIcon className="text-4xl" />
          <span className="pl-2">From Github</span>
        </a>
      </Button>
    </div>
  );
};

const Refresh = () => {
  return (
    <div className="flex gap-2">
      <Button asChild>
        <Link to="/onboarding/extension" search={{ refresh: true }}>
          <span>Refresh now</span>
        </Link>
      </Button>
    </div>
  );
};
