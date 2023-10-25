import { FaGithub } from "react-icons/fa";
import Iron from "./components/Iron";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <Iron />

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="http://github.com/iron-wallet"
              target="_blank"
              className="flex justify-center items-center rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-slate-600"
            >
              <FaGithub className="mr-1" />
              Github
            </a>

            <a href="http://mirror.xyz/iron-wallet.eth" target="_blank">
              Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
