import { type ComponentPropsWithoutRef, forwardRef } from "react";
import {
  siApple,
  siFirefoxbrowser,
  siGithub,
  siGooglechrome,
  siLinux,
  type SimpleIcon,
} from "simple-icons";

function generateIcon(icon: SimpleIcon) {
  return forwardRef<SVGSVGElement, ComponentPropsWithoutRef<"svg">>(
    (props, ref) => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          ref={ref}
          {...props}
        >
          <title>{icon.title}</title>
          <path d={icon.path} />
        </svg>
      );
    },
  );
}

export const GithubIcon = generateIcon(siGithub);
export const AppleIcon = generateIcon(siApple);
export const LinuxIcon = generateIcon(siLinux);
export const FirefoxIcon = generateIcon(siFirefoxbrowser);
export const GoogleChromeIcon = generateIcon(siGooglechrome);
