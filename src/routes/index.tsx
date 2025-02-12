import { Button } from "@ethui/ui/components/shadcn/button";
import { SiApple, SiLinux } from "@icons-pack/react-simple-icons";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownCircle } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  beforeLoad: () => ({ breadcrumb: "Home" }),
  component: Home,
});

interface Data {
  version: string;
  osx: any;
  linux: any;
}

function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Highlights />
    </div>
  );
}

function Hero() {
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
  );
}

const features = [
  {
    title: "Local-first",
    description:
      "Stop relying on public testnets, hard-to-get ETH, low-quality RPCs and 3rd-party services",
  },
  {
    title: "Forge aware",
    description: <>Integrates directly with forge and anvil</>,
  },
  {
    title: "Multi wallet, multi browser, multi everything",
    description:
      "You'll no longer need multiple browser profiles for each wallet, network, or security level",
  },
  {
    title: "Feature 4",
    description:
      "Feature 4 focuses on user experience. It's intuitive, easy to use, and adapts to your needs.",
  },
];

export default function Highlights() {
  return (
    <section className="">
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row">
          <div className="sticky md:top-24 md:w-1/3 md:self-start">
            <h2 className="mb-4 font-bold text-3xl">Ethereum made easy</h2>
            <p className="mb-8 text-gray-600">
              Developing for web3 can be challenging, we're here to help.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex h-[500px] flex-col justify-center bg-red-400"
              >
                <h3 className="mb-4 font-semibold text-2xl">{feature.title}</h3>
                <p className="mb-4 text-gray-600">{feature.description}</p>
                <div className="flex flex-grow items-center justify-center">
                  <div className="flex h-32 w-32 items-center justify-center  bg-purple-100">
                    <span className="text-4xl">🚀</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
