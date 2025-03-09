import { defineNuxtPlugin } from "#app";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Swiper", Swiper);
  nuxtApp.vueApp.component("SwiperSlide", SwiperSlide);

  return {
    provide: {
      swiperModules: [Navigation, Pagination, Autoplay],
    },
  };
});
