import { Link } from "@tanstack/react-router";
import { GithubIcon } from "#/components/icons";

export function Header() {
  return (
    <header className="flex h-7 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" to="/">
        <img
          src="https://avatars.githubusercontent.com/u/164216877?s=200&v=4"
          alt="ethui logo"
          className="h-8 w-auto"
        />
        <span className="ml-2 font-bold text-2xl text-gray-900">ethui</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <a
          href="https://github.com/ethui/ethui"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-sm underline-offset-4 hover:underline"
        >
          <GithubIcon className="inline h-6 w-6" />
        </a>
      </nav>
    </header>
  );
}
