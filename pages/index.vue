<template>

  <div class="container"
       @click="scrollDown" >
    <div class="main-contents">
      <WhoAmI :show-modal="showComeModal"/>
      <PhotoGallery/>
      <WeddingLocation/>
      <CircleDivider/>
      <SendAccount/>
      <DdayFooter/>
    </div>
  </div>
  <div style="position: fixed; left: 0; top: 0; width: 100vw; height: 100vh;">
    <div class="container"
         id="background" >
      <LandingIntroduction/>
    </div>
  </div>
  <Modal ref="modal"
         :init="!showForm">
    <div class="modal-wrapper"
         v-if="!showForm">
      <p class="modal-content-1">결혼식에 참석해주시는<br/>
        모든 분들을 귀하게 모실 수 있도록<br/>
        참석 의사를 말씀해주세요.</p>
<!--
      <p class="modal-content-1">결혼식에 참석해주시는<br/>
        모든 분들을 귀하게 모실 수 있도록<br/>
        참석 의사를 말씀해주세요.</p>
      <CircleDivider/>
      <p class="modal-content-2">
        신랑 김은택 & 신부 정윤영<br/>
        2024년 6월 8일 토요일 오후 1시<br/>
        연세대학교 동문회관 3층 그랜드볼룸
      </p>
      -->
      <button class="modal-btn"
              @click="showForm = true;">
        참석 의사 전달하기
      </button>
    </div>
    <div class="modal-wrapper"
         v-if="showForm">
      <SendForm :close-modal="closeModal"/>
    </div>
  </Modal>
<!--
  <Modal ref="modalRef"
         :dont-show="false">
    <SendForm :close-modal="closeModal"/>
  </Modal>-->
</template>

<script setup lang="ts">
useSeoMeta({
  title:"김은택 & 정윤영 결혼식에 초대합니다",
  ogTitle: '2024년 6월 8일(토) 오후 1시',
  description:"김은택 & 정윤영 결혼식에 초대합니다",
  ogDescription: '연세대학교 동문회관 3층 그랜드볼룸',
  ogUrl: 'https://invite-to-our-wedding.com',
  ogSiteName: '2024년 6월 8일(토) 오후 1시',
  ogType: 'website',
  ogImage: 'https://invite-to-our-wedding.com/og.png',
  formatDetection: 'telephone=no',
  viewport: 'initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=no;'
})

</script>

<script lang="ts">
import LandingIntroduction from "../components/LandingIntroduction.vue";
import VibleMent from "../components/VibleMent.vue";
import WeddingLocation from "../components/WeddingLocation.vue";
import CircleDivider from "../components/CircleDivider.vue";
import PersonContact from "../components/PersonContact.vue";
import SendAccount from "~/components/SendAccount.vue";
import WhoAmI from "~/components/WhoAmI.vue";
import PhotoGallery from "~/components/PhotoGallery.vue";
import DdayFooter from "~/components/DdayFooter.vue";
import Cookie from "js-cookie";

const onScroll = () => {
  const { scrollY } = window;
  Cookie.set('scroll', `${scrollY}`);
  const container = document.querySelector<HTMLDivElement>('#background');
  if (container) {
    const { offsetHeight } = container;
    if(scrollY > offsetHeight) {
      container.classList.add('hide');
    } else {
      container.classList.remove('hide');
    }
  }
}

export default {
  name: "index",
  beforeUnmount() {
    window.removeEventListener('scroll', onScroll);
  },
  mounted() {
    this.loadScript();
    const scrollTop = Number(Cookie.get('scroll'));
    const enabled = Cookie.get('scrollEnabled');
    if(!Number.isNaN(scrollTop) && enabled === 'true') {
      setTimeout(()=>{
        window.scrollTo(({top: scrollTop, behavior: 'instant'}));
      }, 200);
    }
    Cookie.remove('scrollEnabled');
    window.addEventListener('scroll', onScroll);


    /*
    let lastOffset = 0;
    let timer: any = null;
    let animated = false;
    window.addEventListener('scroll', ()=>{
      if(timer) {
        return;
      }
      const vible = document.querySelector<HTMLDivElement>('#vible');
      const whoAmI = document.querySelector<HTMLDivElement>('#who-am-i');

      if(!animated) {
        if(vible && window.scrollY<vible.offsetTop && window.scrollY>lastOffset) {
          window.scrollTo({top: vible.offsetTop, behavior:'smooth'});
          animated = true;
        } else if(whoAmI&& window.scrollY<whoAmI.offsetTop && window.scrollY>lastOffset) {
          window.scrollTo({top: whoAmI.offsetTop, behavior:'smooth'});
          animated = true;
        }
      }
      lastOffset = window.scrollY;
      timer = setTimeout(()=>{
        timer = null;
        animated = false;
      }, 400);
    });

     */

  },
  components: {
    DdayFooter,
    PhotoGallery,
    WhoAmI, SendAccount, PersonContact, CircleDivider, WeddingLocation, VibleMent, LandingIntroduction},
  methods: {
    handleOnLoad() {
      //@ts-ignore
      AOS.init();
    },
    loadScript() {
      const style = document.createElement('link');
      style.href  = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
      style.rel = 'stylesheet';
      document.head.appendChild(style);
      const script =  document.createElement('script');
      script.src = `https://unpkg.com/aos@2.3.1/dist/aos.js`;
      script.onload = this.handleOnLoad;
      document.head.appendChild(script);
    },
    showComeModal() {
      // this.$refs.modalRef.showModal();
      this.$refs.modal.showModal();
    },
    closeModal() {
      // this.$refs.modalRef.closeModal();
      this.$refs.modal.closeModal();
    },
    scrollDown() {
      const element = document.querySelector<HTMLDivElement>('.main-contents');
      const { scrollY } = window;
      if(element && element.offsetTop>scrollY) {
        window.scrollTo({top: element.offsetTop, behavior: 'smooth'});
      }
    }
  },
  data() {
    return {
      showForm: false,
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.modal-content-1 {
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 18px;
}

.modal-content-2 {
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  margin-top: 26px;
  margin-bottom: 20px;
}

.modal-btn {
  background-color: rgba(0, 0, 0, 0.58);
  color: white;
  border: none;
  width: calc(100% - 16px);
  font-size: 18px;
  padding: 12px 0;
  cursor: pointer;
}

.modal-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-contents {
  width: 100%;
  background-color: white;
}

.clear-fix {
  width: 100%;
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  opacity: 0;
}

.hide {
  opacity: 0;
}
</style>
