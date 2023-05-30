// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  target: "static",
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
    },
  },
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
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
  colorMode: {
    classSuffix: "",
  },
  plugins: ["~/plugins/axios"],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
    storage: "localStorage",
  },

  devtools: {
    vscode: {},
  },
});
