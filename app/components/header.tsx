import { Button } from "@ethui/ui/components/shadcn/button";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { BookOpen, Rss } from "lucide-react";
import { GithubIcon } from "#/components/icons";
import { SmoothScrollLink } from "./smooth-scroll-link";

interface Props {
  hero?: boolean;
  isVisible?: boolean;
}

export function Header({ hero = false, isVisible = true }: Props) {
  return (
    <header
      className={clsx(
        "z-50 flex items-center bg-white px-4 py-2 transition-all duration-300 md:bg-transparent lg:px-6",
        hero && "fixed top-0 right-0 left-0",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <SmoothScrollLink
        className="flex items-center justify-center"
        to="/"
        hash="hero"
      >
        <img
          src="https://avatars.githubusercontent.com/u/164216877?s=200&v=4"
          alt="ethui logo"
          className="h-8 w-auto"
        />
        <span className="ml-2 font-bold text-2xl text-gray-900">ethui</span>
      </SmoothScrollLink>
      <nav className="ml-auto flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link to="/blog" className="flex gap-2">
            <BookOpen />
            Docs
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/blog" className="flex gap-2">
            <Rss />
            Blog
          </Link>
        </Button>
        <Button variant="ghost" asChild size="icon">
          <a
            href="https://github.com/ethui/ethui"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-sm underline-offset-4 hover:underline"
          >
            <GithubIcon className="inline h-6 w-6" />
          </a>
        </Button>
      </nav>
    </header>
  );
}
