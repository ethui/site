import { Button } from "@ethui/ui/components/shadcn/button";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });
  const showErrorDetails = import.meta.env.DEV;

  console.error("DefaultCatchBoundary Error:", error);

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto flex min-h-[60vh] flex-col items-start justify-center gap-4 px-4 py-12 md:py-20">
        <p className="text-gray-500 text-sm uppercase tracking-wide">
          Something went wrong
        </p>
        <h1 className="font-bold text-3xl text-gray-900 sm:text-4xl">
          We hit an unexpected error
        </h1>
        <p className="max-w-2xl text-gray-600">
          Please try again. If the problem keeps happening, head back home and
          restart your flow.
        </p>
        {showErrorDetails && <ErrorComponent error={error} />}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            onClick={() => {
              router.invalidate();
            }}
          >
            Try again
          </Button>
          {isRoot ? (
            <Button asChild variant="secondary">
              <Link to="/">Home</Link>
            </Button>
          ) : (
            <Button asChild variant="secondary">
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.back();
                }}
              >
                Go back
              </Link>
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
