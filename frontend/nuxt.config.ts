// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  target: "static",
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "nuxt-vitest",
    "@nuxt/devtools",
  ],
  experimental: {
    reactivityTransform: true,
  },
  css: ["~/assets/css/normalize.css", "~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: ["~/plugins/pinia-persist-plugin.client"],
  colorMode: {
    classSuffix: "",
  },

  devtools: {
    vscode: {},
  },
});
