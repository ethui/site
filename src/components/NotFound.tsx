import { Link } from "@tanstack/react-router";
import { Header } from "./header";

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto flex min-h-[60vh] flex-col items-start justify-center gap-4 px-4 py-12 md:py-20">
        <p className="text-gray-500 text-sm uppercase tracking-wide">
          404 error
        </p>
        <h1 className="font-bold text-3xl text-gray-900 sm:text-4xl">
          Page not found
        </h1>
        <div className="max-w-2xl text-gray-600">
          {children || (
            <p>
              The page you are looking for does not exist, or it might have
              moved.
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded bg-emerald-600 px-3 py-2 font-semibold text-sm text-white"
          >
            Go back
          </button>
          <Link
            to="/"
            className="rounded bg-gray-900 px-3 py-2 font-semibold text-sm text-white"
          >
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}
