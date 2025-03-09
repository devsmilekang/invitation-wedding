<script lang="ts">

import SendCome from "~/components/SendCome.vue";
export default {
  name: 'WhoAmI',
  components: [SendCome],
  props: {
    showModal: Function
  },
  mounted() {
    const onScroll = ()=>{
      const element = document.querySelector<HTMLDivElement>('.main-contents');
      const {scrollY} = window;
      if(element) {
        element.style.opacity = `${(scrollY*1.25)/element.offsetTop}`;
      }
    };
    const onReSize = () => {
      const landing = document.querySelector<HTMLDivElement>('#landing');
      const element = document.querySelector<HTMLDivElement>('.main-contents');
      if(element && landing) {
        element.style.marginTop = `${landing.offsetHeight}px`;
      }
      window.removeEventListener('scroll', onScroll);
      window.addEventListener('scroll',onScroll);
    }

    onReSize();
    window.addEventListener('resize', onReSize);
  }
}
</script>

<template>
  <section class="container"
           id="who-am-i"
           data-aos="fade-up"
           data-aos-offset="400"
           data-aos-easing="ease-out-cubic"
           data-aos-duration="1300"
  >
    <div id="who-am-i-container"
         class="who-am-i-container">
      <div id='who-am-i'
           class="who-am-i">
        <div class="parent">
          <p class="who">
            <span>김외진• 최영자</span>의 차남 <span>은택</span>
          </p>
          <p class="who">
            <span>정해만• 김지영</span>의 장녀 <span>윤영</span>
          </p>
          <CircleDivider/>
        </div>
        <article class="plz">
          하나님을 섬기는 자리에서 만나<br/>
          사랑의 열매를 맺었습니다.<br/>
          <br/>
          행복이 넘치는 가정을 꾸리기 위해<br/>
          이제 한 걸음 내딛어보려 합니다.<br/>
          <br/>
          오로지 믿음과 사랑만을 약속하는 귀한 날에<br/>
          모두가 즐거운 결혼식이 되도록<br/>
          <br/>
          부디 오셔서 저희를 축복해주세요!
        </article>
      </div>
    </div>
    <p class="location"
       data-aos="fade-up"
       data-aos-offset="100"
       data-aos-easing="ease-out-cubic"
       data-aos-duration="1300">
      2024년 6월 8일 토요일 오후 1시<br/>
      연세대학교 동문회관 3층 그랜드볼룸</p>
  </section>
  <SendCome :show-modal="showModal"/>
</template>

<style scoped>
.who-am-i-container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.who-am-i {
  left: 0;
  top: 0;
  //position: absolute;
  width: 100%;
  //opacity: 0;
  background-color: white;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 21rem;
  scroll-snap-align: start;
}
.who {
  font-size: 20px;
}

.who:nth-of-type(2) {
  margin-top: 10px;
  margin-bottom: 40px;
}

.who span {
  font-size: 24px;
}

.plz {
  font-size: 19px;
  text-align: center;
  line-height: 1.6;
  margin-top: 40px;
}

.parent {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.location {
  font-size: 19px;
  line-height: 26px;
  text-align: center;
  margin-top: 92px;
}

</style>
