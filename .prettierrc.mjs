// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  proseWrap: "always",
  tailwindStylesheet: "./src/styles/global.css",
};
