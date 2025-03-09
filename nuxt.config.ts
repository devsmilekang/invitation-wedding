import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/styles/reset.css",
    "~/assets/styles/fonts.css",
    "swiper/css",
    "swiper/css/navigation",
    "swiper/css/pagination",
  ],

  plugins: [{ src: "~/plugins/swiper.js", mode: "client" }],

  runtimeConfig: {
    public: {
      naverClient: process.env.NAVER_MAP_CLIENT,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  modules: ["@nuxt/image"],

  ssr: false,

  nitro: {
    preset: "node-server",
  },

  app: {
    buildAssetsDir: "/_nuxt/",
    baseURL: "/",
  },

  experimental: {
    payloadExtraction: false,
  },

  build: {
    transpile: ["swiper", "vue-awesome-swiper"],
  },
});
