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

  plugins: [{ src: "~/plugins/swiper.js", mode: "client"  }],

  runtimeConfig: {
    public: {
      naverClient: process.env.NAVER_MAP_CLIENT,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },

  modules: ["@nuxt/image"],

  ssr: false,

  app: {
    buildAssetsDir: "assets",
    baseURL:
      process.env.NODE_ENV === "production" ? "/invitation-wedding/" : "/",
    head: {
      title: "강민서 ♥ 정솔 결혼식에 초대합니다",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "2025년 7월 13일 일요일 오후 12시 40분",
        },
      ],
    },
  },

  build: {
    transpile: ["swiper", "vue-awesome-swiper"],
  },

  nitro: {
    preset: "static",
  },

  generate: {
    fallback: "404.html",
  },
});
