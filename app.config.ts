import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/start/config";
import mdPlugin from "vite-plugin-markdown";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { preset: "vercel" },
  vite: {
    plugins: [
      tailwindcss(),
      mdPlugin.default({ mode: ["markdown"] }),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
