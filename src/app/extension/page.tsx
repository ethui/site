import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Iron from "../components/Iron";
import Link from "next/link";

export default function Extension() {
  return (
    <div className="bg-white h-screen flex flex-col">
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

      <div className="flex flex-col items-center py-28 sm:py-44 lg:py-52">
        <Iron />
        <p className="pt-32 text-gray-600">
          Get the Iron Wallet browser extension:
        </p>
        <div className="flex py-4">
          <a
            className="mx-2"
            href="https://chrome.google.com/webstore/detail/iron-wallet/eljobehkpcnpekmbcjiidekjhkbcnpkf"
            target="_blank"
          >
            <Image
              src="/YT2Grfi9vEBa2wAPzhWa.png"
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
      </div>
    </div>
  );
}
