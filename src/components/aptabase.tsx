import { AptabaseProvider } from "@aptabase/react";

const appKey = import.meta.env.VITE_APTABASE_APP_KEY;

export function Aptabase({ children }: { children: React.ReactNode }) {
  if (appKey) {
    <AptabaseProvider appKey="A-EU-3425935558">{children}</AptabaseProvider>;
  } else {
    return children;
  }
}
