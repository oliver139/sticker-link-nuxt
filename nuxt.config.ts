// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "@vueuse/nuxt",
    "nuxt-typed-router",
  ],
  css: [
    "normalize.css/normalize.css",
    "assets/css/variable.scss",
    "assets/css/base.scss",
  ],
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],
  eslint: {
    config: {
      stylistic: {
        braceStyle: "1tbs",
        quoteProps: "consistent",
        quotes: "double",
        semi: true,
      },
    },
  },
  vite: {
    esbuild: {
      drop: ["debugger"],
      pure: ["console.log", "console.debug"],
    },
  },
});
