import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/styles/reset.css", "~/assets/styles/fonts.css"],

  buildModules: ["@nuxtjs/dotenv"],

  plugins: [{ src: "~/plugins/vue-slick-carousel.js", ssr: false }],

  runtimeConfig: {
    public: {
      naverClient: process.env.NAVER_MAP_CLIENT,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  modules: ["@nuxt/image"],

  nitro: {
    prerender: {
      failOnError: false,
      routes: ["/", "/gallery"],
    },
  },

  app: {
    baseURL: "/invitation-wedding/",
    buildAssetsDir: "assets",
  },
});
