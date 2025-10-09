import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

export default defineConfig({
  integrations: [icon(), react()],
  site: "https://blog-puce-nine-66.vercel.app",
  vite: {
    plugins: [tailwindcss()],
  },
});