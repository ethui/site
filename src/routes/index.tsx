import { Button } from "@ethui/ui/components/shadcn/button";
import { createFileRoute } from "@tanstack/react-router";
import { Github } from "lucide-react";

export const Route = createFileRoute("/")({
  beforeLoad: () => ({ breadcrumb: "Home" }),
  component: Home,
});

function Home() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="flex items-center justify-center">
            <img
              src="https://avatars.githubusercontent.com/u/130035865?s=200&v=4"
              alt="ethui logo"
              width={100}
              height={100}
              className="h-24 w-auto"
            />
            <div className="ml-6">
              <h1 className="font-bold text-4xl text-gray-900 tracking-tight sm:text-6xl">
                ethui
              </h1>
              <p className="text-gray-600 text-lg leading-8">
                An Ethereum toolkit
              </p>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild>
              <a
                href="http://github.com/ethui"
                rel="noreferrer"
                target="_blank"
              >
                <Github className="mr-1" />
                Github
              </a>
            </Button>

            <Button variant="ghost" asChild>
              <a
                href="http://mirror.xyz/ethui.eth"
                rel="noreferrer"
                target="_blank"
              >
                Blog
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
