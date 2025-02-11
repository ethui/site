import { Header } from "#/components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type Context = {
  breadcrumb?: string;
};

export const Route = createRootRouteWithContext<Context>()({
  component: Root,
});

const queryClient = new QueryClient();

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-1 flex-col gap-4 px-4 pt-4">
        <Header />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}
