<template>
  <section class="container"
           id="landing"
           @click="scrollDown" >
    <p :class="['happily', txtLoad&&'on-load']">
      Happily<br/>
      Ever After!</p>
    <article :class="['contents', imgLoad&&'on-load']">
      <div class="introduction-img-container">
<!--
        <img v-for="(img, idx) in imgs"
             :key="`${img} ${idx}`"
             :id="`intro-img-${idx}`"
             :src="img"
             class="introduction-img"
             :style="`opacity: ${idx===0?1:0}`"
             alt="" />
             -->
        <NuxtImg src="/introduction/img1.png"
                 preload
                 alt=''
                 class="introduction-img" />
      </div>

      <p class="date">2024.06.08</p>
      <h1 class="title">
        김은택 & 정윤영
        <span>결혼식에 초대합니다</span>
      </h1>
    </article>
  </section>
</template>

<script lang="ts">
import 'swiper/css';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
// import SmoothScroll from 'smooth-scroll';
const slider = ref(null);

export default {
  name: "LandingIntroduction",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (s: any) => {
      slider.value = s;
    }
    return {
      modules: [EffectFade, Navigation, Pagination, Autoplay],
      onSwiper,
    }
  },
  mounted() {
    const timeout1 = setTimeout(()=>{
      this.txtLoad = true;
    }, 200);
    const timeout2 = setTimeout(()=>{
      this.imgLoad = true;
    }, 650);
    /*
    const imgs = document.querySelectorAll<HTMLImageElement>('.introduction-img');
    let current = 0;
    let next = 1;
    const interval = setInterval(()=>{
      current += 1;
      next +=1;
      if(current>=imgs.length) {
        current = 0;
      }
      if(next>=imgs.length) {
        next = 0;
      }
      imgs[current].style.opacity = '0';
      imgs[next].style.opacity = '1';
    }, 2300);

     */
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      // clearInterval(interval);
    }
  },
  methods: {
    scrollDown() {
      const next = document.querySelector<HTMLDivElement>('#who-am-i');
      window.scrollTo({top: next!.offsetTop, behavior: 'smooth'});
    }
  },
  data() {
    return {
      /*
      imgs: ['/introduction/img2.png', '/introduction/img1.png', '/introduction/img2.png', '/introduction/img1.png',
        '/introduction/img2.png', '/introduction/img1.png',
        '/introduction/img2.png', '/introduction/img1.png'],

       */
      txtLoad: false,
      imgLoad: false,
      slickOptions: {
        fade: true, // fade effect 사용
        autoplay: true, // 자동 재생 여부
      }
    }
  }
}
</script>

<style scoped>
.original {
  top: 0;
  width: 100%;
}
.swiper {
  width: 100%;
  aspect-ratio: calc(393 / 437);
  margin: 28px 0 40px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 54px;
  //position: absolute !important;
  top: 0;
  background-color: white;
  min-height: 100vh;
}

.date {
  font-size: 21px;
  line-height: 30px;
  margin-bottom: 8px;
}

.happily {
  font-size: 32px;
  line-height: 32px;
  text-align: center;
  transition: 550ms ease-in-out;
  opacity: 0;
  transform: translateY(20%);
  margin-bottom: 16px;
}

.introduction-img {
  width: 100%;
  object-fit: cover;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: opacity 400ms ease-in-out;
  //opacity: 0;
}

.introduction-img-container {
  position: relative;
  width: 100%;
  aspect-ratio: calc(393 / 437);
  margin-bottom: 28px;
}

.title {
  font-size: 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 400;
}

.title span {
  margin-top: 8px;
  font-size: 18px;
}

.location {
  margin-top: 20px;
  font-size: 15px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
}

.contents {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 550ms ease-out;
  opacity: 0;
  transform: translateY(30px);
}

.on-load {
  opacity: 1;
  transform: none;
}
</style>
