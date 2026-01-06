import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import customErrorOverlayPlugin from "../vite-error-overlay-plugin.js";

export default defineConfig({
  site: "https://mrswadhinhowlader.github.io",
  base: "/",
  output: "static",

  integrations: [
    tailwind(),
    react(),
  ],

  vite: {
    plugins: [customErrorOverlayPlugin()],
  },

  devToolbar: { enabled: false },
});
