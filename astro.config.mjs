// @ts-check
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), preact()],
  site: "https://blog-puce-nine-66.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
});

