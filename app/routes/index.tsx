import { ButtonWithDropdown } from "@ethui/ui/components/button-with-dropdown";
import { Button } from "@ethui/ui/components/shadcn/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronDown, FileCode2 } from "lucide-react";
import { type Ref, useEffect, useRef, useState } from "react";
import { Header } from "#/components/header";
import { AppleIcon, LinuxIcon } from "#/components/icons";
import { SmoothScrollLink } from "#/components/smooth-scroll-link";

import videoContracts from "#/assets/videos/ethui-contracts.webm?url";
import videoFastMode from "#/assets/videos/ethui-fast-mode.webm?url";
import videoLocal from "#/assets/videos/ethui-local.webm?url";
import videoMulti from "#/assets/videos/ethui-multi.webm?url";

export const Route = createFileRoute("/")({
  component: Home,
});

interface Data {
  version: string;
  osx: any;
  linux: any;
}

const features = [
  {
    title: "Local-first",
    description:
      "ethui works directly with anvil and forge to provide a fast and reproducible environment",
    video: videoLocal,
  },
  {
    title: "Fast feedback loops",
    description:
      "ethui can skip annoying transaction reviews, allowing you to focus on what matters",
    video: videoFastMode,
  },
  {
    title: "Your own contract explorer",
    description:
      "By scanning compilation artifacts, we give you a UI to directly interact with your contracts",
    video: videoContracts,
  },
  {
    title: "Multi wallet, multi browser",
    description:
      "Setup multiple wallets without needing browser profiles; Connect websites to different chains simultaneously",
    video: videoMulti,
  },
];

const footerLinks = [
  { text: "Github", href: "https://github.com/ethui" },
  { text: "Twitter", href: "https://twittter.com/ethuidev" },
];

function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(!entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 0.8 },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  return (
    <>
      <Header hero isVisible={isHeaderVisible} />
      <Hero ref={heroRef} />
      <Highlights />
      <Footer />
    </>
  );
}

function Hero({ ref }: { ref: Ref<HTMLDivElement> }) {
  const [data, setData] = useState<Data | undefined>();
  const isLinux = navigator.userAgent.includes("Linux");

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

      setData({ version, osx, linux });
    })();
  }, []);

  const macOsLink = (
    <Link
      to={data?.osx?.browser_download_url}
      rel="noreferrer"
      download={data?.osx?.name}
      className="flex items-center gap-x-2"
    >
      <AppleIcon className="mr-1" />
      Download for macOS
    </Link>
  );

  const linuxLink = (
    <Link
      to={data?.linux?.browser_download_url}
      rel="noreferrer"
      download={data?.linux?.name}
      className="flex items-center gap-x-2"
    >
      <LinuxIcon className="mr-1" />
      Download for Linux
    </Link>
  );

  const defaultLink = isLinux ? linuxLink : macOsLink;

  return (
    <div
      className="flex h-screen flex-col items-center justify-center"
      ref={ref}
      id="hero"
    >
      <div className="isolate flex flex-col">
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

        <div className="mt-10 flex items-center justify-between gap-x-6">
          <span>
            <ButtonWithDropdown
              asChild
              options={[
                <Button key="macOS" variant="ghost" asChild>
                  {macOsLink}
                </Button>,
                <Button key="Linux" variant="ghost" asChild>
                  {linuxLink}
                </Button>,
                <Button key="From Source" variant="ghost" asChild>
                  <a
                    href="http://github.com/ethui/ethui"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-x-2"
                  >
                    <FileCode2 className="mr-1" />
                    Build from source
                  </a>
                </Button>,
              ]}
            >
              {defaultLink}
            </ButtonWithDropdown>
          </span>

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

        <SmoothScrollLink
          className="mt-10 flex items-center justify-center gap-2 text-center"
          hash="highlights"
        >
          <p>scroll for details</p>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </SmoothScrollLink>
      </div>
    </div>
  );
}

export default function Highlights() {
  return (
    <section
      className="flex w-full flex-col self-center md:flex-row"
      id="highlights"
    >
      <div className="sticky flex flex-col bg-sidebar md:top-0 md:w-2/5 md:self-start">
        <div className="flex flex-col gap-2 px-4 py-16 md:h-screen md:items-end md:justify-center md:px-8 md:py-0">
          <h2 className=" font-bold text-3xl">Ethereum made easy</h2>
          <p className="text-right">
            Developing for web3 can be challenging, we're here to help.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 py-8 md:w-3/5 md:gap-40 md:px-8">
        {features.map(({ title, description, video }, index) => (
          <div
            key={index}
            className="flex h-[60vh] flex-col justify-center gap-2"
          >
            <h3 className="font-semibold text-2xl">{title}</h3>
            <p className="text-secondary-foreground">{description}</p>
            {video && (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="mr-4 aspect-16/9 max-w-3xl py-8"
              >
                <source src={video} type="video/webm" />
              </video>
            )}
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
        <Link className="flex items-center justify-center" to="/" hash="hero">
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
