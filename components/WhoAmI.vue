<script lang="ts">

import CircleDivider from "~/components/CircleDivider.vue";

export default {
  name: 'WhoAmI',
  components: {
    CircleDivider
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
            <span>강기선• 노명옥</span>의 차남 <span>민서</span>
          </p>
          <p class="who">
            <span>정우진• 조미순</span>의 장녀 <span>솔</span>
          </p>
          <CircleDivider/>
        </div>
        <article class="plz">
          네 번째 여름엔 부부라는 이름으로<br/>
          믿음과 사랑 안에서<br/>
          새로운 시작을 준비합니다<br/>
          <br/>
          모든 날, 모든 순간을 아름답게 만들어 가고<br/>
          이끌어 주고, 응원해 주는<br/>
          서로가 되겠습니다.<br/>
          <br/>
          새로 시작하는 이 자리에 오셔서<br/>
          축복이 가득하길 함께 해 주시기 바랍니다.<br/>
        </article>
      </div>
    </div>
    <p class="location"
       data-aos="fade-up"
       data-aos-offset="100"
       data-aos-easing="ease-out-cubic"
       data-aos-duration="1300">
      2025년 7월 13일 일요일 오후 12시 40분<br/>
      월드컵컨벤션 그랜드볼룸홀</p>
  </section>
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
  /* position: absolute; */
  width: 100%;
  /* opacity: 0; */
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
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  text-align: center;
  margin-top: 92px;
}
</style>
