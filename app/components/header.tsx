import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { GithubIcon } from "#/components/icons";

interface Props {
  hero?: boolean;
  isVisible?: boolean;
}

export function Header({ hero = false, isVisible = true }: Props) {
  return (
    <header
      className={clsx(
        "z-50 flex items-center px-4 py-2 transition-all duration-300 lg:px-6",
        hero && "fixed top-0 right-0 left-0 bg-white",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
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
