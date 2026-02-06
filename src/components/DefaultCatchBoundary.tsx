import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";
import { Header } from "./header";

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
      <Header />
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
          <button
            type="button"
            onClick={() => {
              router.invalidate();
            }}
            className="rounded bg-gray-900 px-3 py-2 font-semibold text-sm text-white"
          >
            Try again
          </button>
          {isRoot ? (
            <Link
              to="/"
              className="rounded bg-gray-100 px-3 py-2 font-semibold text-gray-900 text-sm"
            >
              Home
            </Link>
          ) : (
            <Link
              to="/"
              className="rounded bg-gray-100 px-3 py-2 font-semibold text-gray-900 text-sm"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
            >
              Go back
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
