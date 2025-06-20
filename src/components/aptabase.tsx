import { AptabaseProvider } from "@aptabase/react";

const appKey = import.meta.env.VITE_APTABASE_APP_KEY;
console.log(appKey);

export function Aptabase({ children }: { children: React.ReactNode }) {
  if (appKey) {
    return <AptabaseProvider appKey={appKey}>{children}</AptabaseProvider>;
  } else {
    return children;
  }
}
