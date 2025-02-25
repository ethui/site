import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/start/config";
import mdPlugin, { Mode } from "vite-plugin-markdown";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { preset: "vercel" },
  vite: {
    plugins: [
      tailwindcss(),
      mdPlugin({ mode: [Mode.MARKDOWN] }),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
