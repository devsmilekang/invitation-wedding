<script setup lang="ts">
import {Swiper, SwiperSlide, useSwiper} from "swiper/vue";
import 'swiper/css';
import {Navigation, Pagination} from "swiper/modules";
import Cookie from 'js-cookie';

useSeoMeta({
  title:"김은택 & 정윤영 결혼식에 초대합니다",
  ogTitle: '김은택 & 정윤영 결혼식에 초대합니다',
  description:"김은택 & 정윤영 결혼식에 초대합니다",
  ogDescription: '김은택 & 정윤영 결혼식에 초대합니다',
  ogUrl: 'https://invitation-letter-green.vercel.app',
  ogSiteName: '김은택 & 정윤영 결혼식에 초대합니다',
  ogType: 'website',
  ogImage: 'https://invitation-letter-green.vercel.app/introduction.png',
  formatDetection: 'telephone=no',
  viewport: 'initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;'
});

enum Category {
  STUDIO, YONSEI, FRIENDS, SELF
}

const allImgs = Array.from({length: 16}, (_, i)=>{
  return {
    category: Category.STUDIO,
    img: `/gallery/studio/${i}.jpg`
  }
})

const imgs= allImgs.map((i)=>i.img);

const idMap = new Map();
idMap.set(Category.STUDIO, 0);
idMap.set(Category.YONSEI, 0);
idMap.set(Category.FRIENDS, 0);
idMap.set(Category.SELF, 0);

const imgWithId = allImgs.map((value)=>{
  const newID = idMap.get(value.category)+1;
  idMap.set(value.category, newID);
  return {
    ...value,
    id: `img_${value.category}_${newID}`,
    isHead: newID === 1,
  }
});

/*
const imgs = ref(allImgs.filter((i)=>i.category===Category.STUDIO)
    .map((n)=>n.img));

 */
let currentCategory =  ref(Category.STUDIO);
const modules = [Navigation, Pagination];

const changeCategory = (category: Category) => {
  // currentCategory.value = category;
  const item = document.querySelector<HTMLImageElement>(`#img_${category}_1`);
  const header = document.querySelector<HTMLDivElement>('#header');
  if(item && header) {
    const top = item.offsetTop - header.offsetHeight;
    window.scrollTo({ top, behavior: 'smooth'});
  }
  /*
  imgs.value = allImgs.filter((i)=>i.category===currentCategory)
      .map((i)=>i.img);

   */
};

const slider = ref(null);
const onSwiper = (s: any) => {
  slider.value = s;
}

let hide = ref<boolean>(true);
let none = ref<boolean>(true);
const showModal =(num: number) =>{
  //@ts-ignore
  slider.value.slideTo(num, 0);
  none.value = false;
  setTimeout(()=>{
    hide.value = false;
  }, 100);
}

const hideModal = () => {
  hide.value = true;
  setTimeout(()=>{
    none.value = true;
  }, 400);
}

const slideNext = () => {
  //@ts-ignore
  slider.value.slideNext();
}

const slidePrev = () => {
  //@ts-ignore
  slider.value.slidePrev();
}

onMounted(()=>{
  window.scrollTo({top: 0, behavior: 'instant' });
  const items = [...document.querySelectorAll<HTMLImageElement>('img[data-is-head=true]')]
      .sort((a, b)=>{
        return Number(b.getAttribute('data-category')) - Number(a.getAttribute('data-category'));
      });
  const header = document.querySelector<HTMLDivElement>('#header');
  window.addEventListener('scroll', ()=> {
    const { scrollY } = window;
    let changed = false;
    for(let i=0; i<items.length; i++) {
      if(scrollY + header!.offsetHeight >= items[i].offsetTop ) {
        currentCategory.value = Number(items[i].getAttribute('data-category'));
        changed = true;
        break;
      }
    }
    if(!changed) {
      currentCategory.value = Category.STUDIO;
    }
  });
  setTimeout(()=>{
    const container = document.querySelector('.container');
    container?.classList.add('show');
  }, 200);
});

onUnmounted(()=>{
  const container = document.querySelector('.container');
  container?.classList.remove('show');
  Cookie.set('scrollEnabled', 'true');
})
</script>

<script lang="ts">
export default {

}
</script>


<template>
  <section class="container">
    <div class="header"
         id="header" >
      <div class="title-container">
        <h1 class="title">결혼 사진</h1>
        <nuxt-link class="back"
                   href="/" >
          <img src="../assets/imgs/ic_back.png"
               alt=""
          />
        </nuxt-link>
      </div>
<!--
      <nav class="nav">
        <button :class="['nav-item', currentCategory===Category.STUDIO&&'selected']"
                @click="changeCategory(Category.STUDIO)"
                type="button">
          Studio
        </button>
        <button :class="['nav-item', currentCategory===Category.YONSEI&&'selected']"
                @click="changeCategory(Category.YONSEI)"
                type="button">
          Yonsei
        </button>
        <button :class="['nav-item', currentCategory===Category.FRIENDS&&'selected']"
                @click="changeCategory(Category.FRIENDS)"
                type="button">
          with Friends
        </button>
        <button :class="['nav-item', currentCategory===Category.SELF&&'selected']"
                @click="changeCategory(Category.SELF)"
                type="button">
          Self
        </button>
      </nav>
      -->
    </div>
    <article class="grid">
      <NuxtImg v-for="(img, idx) of imgWithId"
               quality="80"
               width="200"
               :src="img.img"
               :id="img.id"
               @click="()=>showModal(idx)"
               :data-category="img.category"
               :data-is-head="img.isHead"
               alt=''
               :key="`img ${idx}`" />
    </article>
  </section>
 <!-- 상세보기 모달 -->
  <div :class="['modal', hide&&'hide', none&&'none']"
       @click="hideModal" >
    <div class="modal-contents"
         @click="(e)=> {
           e.preventDefault();
           e.stopPropagation();
         }" >
      <div class="swiper-wrapper">
        <img src="../assets/imgs/ic_back.png"
             @click="slidePrev"
             alt=""
             class="arrow" />
       <div class="swiper-content">
         <swiper
             @swiper="onSwiper"
             :modules="modules"
             :slidePerView="1"
             :spaceBetween="30"
             :loop="true"
             class="swiper">
           <swiper-slide v-for="img in imgs"
                         :key="img" >
             <NuxtImg :src="img"
                  alt=''
                  class="modal-img" />
           </swiper-slide>
         </swiper>
       </div>
        <img src="../assets/imgs/ic_back.png"
             @click="slideNext"
             alt=""
             class="arrow" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-content {
  width: 100%;
  position: relative;
  z-index: 1;
}
.swiper-wrapper {
  display: flex;
  position: relative;
  align-items: center;
}

.arrow {
  width: 28px;
  height: 28px;
  cursor: pointer;
  position: absolute;
  z-index: 3;
  left: 4px;
  opacity: 0.6;
}

.arrow:nth-of-type(2) {
  transform: rotate(180deg);
  left: unset;
  right: 4px;
}

.close {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.close button {
  font-size: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.modal-img {
  width: 100%;
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 3;
  transition: opacity 400ms;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: none;
}
.modal.hide {
  opacity: 0;
}

.modal.none {
  transform: translateY(-100vh);
}

.modal-contents {
  background-color: white;
  max-width: 400px;
  width: calc(100% - 40px);
  //padding: 12px 16px 24px;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  position: sticky;
  top: 0;
  background-color: white;
  padding-top: 44px;
}

.back {
  position: absolute;
  left: 0;
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.back img {
  width: 100%;
  height: 100%;
}

.title-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32px 40px;
  background-color: white;
  min-height: 100vh;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  transition: 450ms ease-in-out;
  transform: translateY(40px);
  opacity: 0;
}

.container.show {
  opacity: 1;
  transform: none;
}

.title {
  font-size: 22px;
  font-weight: 400;
}

.nav {
  display: flex;
  align-items: center;
  column-gap: 18px;
  width: 100%;
  //margin-bottom: 18px;
  background-color: white;
  padding: 10px;
}

.nav-item {
  padding: 0;
  border: none;
  background-color: transparent;
  font-size: 22px;
  white-space: nowrap;
  cursor: pointer;
  color: black;
}

.nav-item.selected {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 5px;
}

.grid {
  grid-gap: 16px 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 10px;
  margin-top: 18px;
}

.grid img {
  width: 100%;
  aspect-ratio: 1;
  cursor: pointer;
}

.swiper-button-prev {
  background-color: red !important;
  color: red !important;
  display: none !important;
}

</style>
