import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Web3 from "./components/Web3";
import "@rainbow-me/rainbowkit/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iron Wallet",
  description: "A developer-centric Ethereum Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3>{children}</Web3>
      </body>
    </html>
  );
}
