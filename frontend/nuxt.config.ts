// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,
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
    "dayjs-nuxt",
  ],
  experimental: {
    reactivityTransform: true,
  },
  css: [
    "~/assets/css/normalize.css",
    "~/assets/css/tailwind.css",
    "vue-final-modal/style.css",
    "vue-select/dist/vue-select.css",
    "@vuepic/vue-datepicker/dist/main.css",
    "vue3-toastify/dist/index.css",
  ],
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

  dayjs: {
    plugins: ["customParseFormat"],
  },

  devtools: {
    vscode: {},
  },
});
