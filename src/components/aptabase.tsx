import { AptabaseProvider } from "@aptabase/react";

const appKey = import.meta.env.VITE_APTABASE_APP_KEY;
console.log("1", appKey);

export function Aptabase({ children }: { children: React.ReactNode }) {
  console.log("2", appKey);
  if (appKey) {
    return <AptabaseProvider appKey={appKey}>{children}</AptabaseProvider>;
  } else {
    return children;
  }
}
