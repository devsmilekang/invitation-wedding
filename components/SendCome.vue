<script lang="ts">
import dayjs from "dayjs";
import Cookie from "js-cookie";

export default {
  name: 'SendCome',
  data() {
    return{
      day: 0,
      hour: 0,
      min: 0,
      once: true,
    }
  },
  props: {
    showModal: Function,
  },
  methods: {
    updateTime() {
      const diff = dayjs('2024-06-08 13:00').diff(dayjs(), 'minute');
      this.day = Math.floor(diff/(60*24));
      this.hour = Math.floor(diff/60) % 24;
      this.min = diff % 60;
    },
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
    if(!Cookie.get('modal')) { // 오늘 하루 보지 않기 미선택 시
      const element = document.querySelector('#modal-start');
      if(element) {
        const io = new IntersectionObserver((entries, observer)=>{
          entries.forEach((entry)=>{
            if(!Cookie.get('modal') && entry.intersectionRatio>=0.5 && this.once) {
              this.showModal();
              this.once = false;
            }
          })
        }, {threshold: 0.5});
        io.observe(element);
      }
    }
  }
}
</script>

<template>
  <section class="come"
           data-aos="fade-up"
           data-aos-offset="100"
           data-aos-easing="ease-out-cubic"
           data-aos-duration="1300" >
    <div class="date">
      <div class="date-item">
        {{`${day}`.padStart(2, '0')}}
        <span>일</span>
      </div>
      :
      <div class="date-item">
        {{`${hour}`.padStart(2, '0')}}
        <span>시</span>
      </div>
      :
      <div class="date-item">
        {{`${min}`.padStart(2, '0')}}
        <span>분</span>
      </div>
    </div>
    <p class="left"
       id="modal-start" >
      은택 & 윤영의 결혼식이<br/>
      {{day}}일 남았습니다.
    </p>
    <button class="btn"
            @click="showModal" >
      참석 의사 전달하기
    </button>
  </section>

</template>

<style scoped>
.come {
  background-color: #F0F0F0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px 30px;
  margin-top: 54px;
}

.date {
  display: flex;
  align-items: center;
  font-size: 28px;
  column-gap: 8px;
}

.date-item {
  font-size: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 66px;
  height: 106px;
  justify-content: center;
  row-gap: 15px;
}
.date-item span {
  font-size: 24px;
}

.left {
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  margin: 22px 0 16px;
}

.btn {
  font-size: 18px;
  width: 100%;
  background-color: black;
  color: white;
  border: none;
  border-radius: 0;
  padding: 12px 0;
  cursor: pointer;
}


</style>
