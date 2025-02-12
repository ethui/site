import { Button } from "@ethui/ui/components/shadcn/button";
import SiApple from "@icons-pack/react-simple-icons/icons/SiApple.js";
import SiLinux from "@icons-pack/react-simple-icons/icons/SiLinux.js";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
});

interface Data {
  version: string;
  osx: any;
  linux: any;
}

function Home() {
  const [data, setData] = useState<Data | undefined>();

  useEffect(() => {
    (async () => {
      const resp = await fetch(
        "https://api.github.com/repos/ethui/ethui/releases/latest",
      );

      const json = await resp.json();
      const version = json.tag_name;
      const osx = json.assets.find((asset: any) => asset.name.includes("dmg"));
      const linux = json.assets.find((asset: any) =>
        asset.name.includes("AppImage"),
      );
      console.log(linux);

      setData({ version, osx, linux });
    })();
  }, []);

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="flex items-center justify-center">
            <img
              src="https://avatars.githubusercontent.com/u/164216877?s=400&v=4"
              alt="ethui logo"
              className="h-32 w-auto"
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
                href={data?.osx?.browser_download_url}
                rel="noreferrer"
                download={data?.osx?.name}
              >
                <SiApple className="mr-1" />
                Download
              </a>
            </Button>

            <Button asChild>
              <Link
                to={data?.linux?.browser_download_url}
                rel="noreferrer"
                download={data?.linux?.name}
              >
                <SiLinux className="mr-1" />
                Download
              </Link>
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
