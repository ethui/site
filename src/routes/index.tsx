import { Button } from "@ethui/ui/components/shadcn/button";
import { SiApple, SiLinux } from "@icons-pack/react-simple-icons";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  beforeLoad: () => ({ breadcrumb: "Home" }),
  component: Home,
});

const features = [
  {
    title: "Local-first",
    description:
      "works directly with anvil and forge to provide a fast and reproducible environment",
  },
  {
    title: "Fast feedback loops",
    description:
      "ethui can skip annoying transaction reviews, allowing you to focus on what matters",
  },
  {
    title: "Multi wallet, multi browser, multi everything",
    description:
      "Setup multiple wallets without needing browser profiles; Connect websites to different chains simultaneously",
  },
  {
    title: "Your own contract explorer",
    description:
      "By scanning compilation artifacts, we give you a UI to directly interact with your contracts",
  },
];

const footerLinks = [
  { text: "Github", href: "https://github.com/ethui" },
  { text: "Twitter", href: "https://twittter.com/ethuidev" },
];

interface Data {
  version: string;
  osx: any;
  linux: any;
}

function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Footer />
    </>
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
    <div className="relative isolate h-screen flex flex-col items-center justify-center">
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
          <p className="text-secondary-foreground text-lg leading-8">
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
  );
}

export default function Highlights() {
  return (
    <section className="flex flex-col md:flex-row px-4">
      <div className="sticky h-screen md:top-0 md:w-1/3 md:self-start flex flex-col gap-2">
        <div className="flex flex-col gap-2 h-screen flex flex-col md:justify-center">
          <h2 className=" font-bold text-3xl">Ethereum made easy</h2>
          <p className="">
            Developing for web3 can be challenging, we're here to help.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 md:w-2/3 md:gap-20">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h3 className=" font-semibold text-2xl">{feature.title}</h3>
            <p className=" text-secondary-foreground">{feature.description}</p>
            <img
              src="https://i.ytimg.com/vi/NpEaa2P7qZI/maxresdefault.jpg"
              alt="placeholder"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="p-6">
      <div className="flex flex-col items-center justify-between md:flex-row">
        <Link className="flex items-center justify-center" to="/">
          <img
            src="https://avatars.githubusercontent.com/u/164216877?s=200&v=4"
            alt="ethui logo"
            className="h-8 w-auto"
          />
          <span className="ml-2 font-bold text-2xl">ethui</span>
        </Link>
        <div>
          <ul className="flex space-x-4">
            {footerLinks.map(({ text, href }) => (
              <li key={text}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-300"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
