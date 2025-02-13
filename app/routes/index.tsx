import { ButtonWithDropdown } from "@ethui/ui/components/button-with-dropdown";
import { Button } from "@ethui/ui/components/shadcn/button";
import { Link, createFileRoute } from "@tanstack/react-router";
import { FileCode2 } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { AppleIcon, LinuxIcon } from "#/components/icons";
import { Header } from "#/components/header";

export const Route = createFileRoute("/")({
  component: Home,
});

interface Data {
  version: string;
  osx: any;
  linux: any;
}

function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(!entry.isIntersecting);
      },
      { root: null, rootMargin: "0px", threshold: 0.5 },
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
      <div ref={heroRef}>
        <Hero />
      </div>
    </>
  );
}

const Hero = forwardRef((props, ref) => {
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
      console.log(linux);

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
    <div className="flex h-screen flex-col justify-center" ref={ref}>
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

        <div className="mt-10 flex items-center justify-center gap-x-6">
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
      </div>
    </div>
  );
});
