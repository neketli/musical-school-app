// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/axios",
    "nuxt-icon",
    "nuxt-vitest",
    "@nuxt/devtools",
  ],
  experimental: {
    reactivityTransform: true,
  },
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  axios: {
    baseURL: process.env.API_URL,
  },
  colorMode: {
    classSuffix: "",
  },
  devtools: {
    vscode: {},
  },
});
