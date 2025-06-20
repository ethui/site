import { AptabaseProvider, useAptabase } from "@aptabase/react";
import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";

const appKey = import.meta.env.VITE_APTABASE_APP_KEY;

export function Aptabase({ children }: { children: React.ReactNode }) {
  if (appKey) {
    return (
      <AptabaseProvider appKey={appKey}>
        <NavigationTracker />
        {children}
      </AptabaseProvider>
    );
  } else {
    return children;
  }
}

function NavigationTracker() {
  const { trackEvent } = useAptabase();
  const location = useLocation();

  useEffect(() => {
    trackEvent("navigation", { pathname: location.pathname });
  }, [trackEvent, location.pathname]);

  return null;
}
