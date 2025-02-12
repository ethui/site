import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  service: { preset: "vercel" },
  vite: {
    plugins: [tsConfigPaths()],
  },
});
