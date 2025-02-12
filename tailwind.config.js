import baseConfig from "@ethui/ui/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["node_modules/@ethui/ui/components/**/*.js", ".app/**/*.tsx"],
  presets: [baseConfig],
  plugins: [require("tailwindcss-animate")],
};
