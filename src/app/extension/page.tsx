import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import IronBanner from "../components/IronBanner";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex items-center px-4 pt-4">
      <Link href="/">
        <img
          src="https://avatars.githubusercontent.com/u/130035865?s=200&v=4"
          className="h-14 w-auto"
        />
      </Link>
      <div className="flex flex-1 justify-end">
        <ConnectButton />
      </div>
    </div>
  );
};

const DownloadLinks = () => {
  return (
    <div className="flex py-4">
      <a
        className="mx-2"
        href="https://chrome.google.com/webstore/detail/iron-wallet/eljobehkpcnpekmbcjiidekjhkbcnpkf"
        target="_blank"
      >
        <Image
          src="/chrome_web_store.png"
          alt="chrome_web_store_extension"
          width="200"
          height="60"
        />
      </a>
      <a
        className="mx-2"
        href="https://addons.mozilla.org/firefox/addon/iron-wallet/"
        target="_blank"
      >
        <Image
          src="/mozilla_add_on.svg"
          alt="mozilla_get_add_on"
          width="150"
          height="60"
        />
      </a>
    </div>
  );
};

export default function Extension() {
  return (
    <div className="bg-white h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center py-28 sm:py-44 lg:py-52 px-6 lg:px-8">
        <IronBanner />
        <p className="pt-32 text-gray-600">
          Get the Iron Wallet browser extension:
        </p>
        <DownloadLinks />
      </div>
    </div>
  );
}
