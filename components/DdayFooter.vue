<script lang="ts">
import dayjs from "dayjs";
import axios from "axios";
let name: string = '';
let message: string = '';
let engage: number = -1;

export default {
  name: 'DdayFooter',
  data() {
    return {
      dday: dayjs('2024-06-08').diff(dayjs(),'day').toString().padStart(2, '0'),
      name,
      message,
      engage,
      shareEnable: false,
    }
  },
  mounted() {
    this.shareEnable = window.navigator.share !== undefined;
  },
  methods: {
    add() {
      if(!this.name) {
        window.alert('이름을 입력해주세요.');
        return;
      }
      if(!this.message) {
        window.alert('메세지를 입력해주세요.');
        return;
      }
      if(this.engage===-1) {
        window.alert('참석 여부를 선택해주세요.');
        return;
      }
      axios.post('/api/engage', {
        name: this.name,
        message: this.message,
        engage: this.engage,
      }).then((res)=>{
        console.log(res);
        window.alert('메세지를 남겼습니다.');
      }).catch(()=>{
        window.alert('오류가 발생하였습니다.');
      })
    },
    shareLink() {
      if(window.navigator.share) {
        window.navigator.share({
          title: '김은택 & 정윤영 결혼식에 초대합니다',
          text: '김은택 & 정윤영 결혼식에 초대합니다',
          url: 'https://invitation-letter-green.vercel.app',
        });
      }
    },
    copyLink() {
      window.navigator.clipboard.writeText('https://invitation-letter-green.vercel.app')
          .then(()=>{
            window.alert('주소가 복사되었습니다.');
          })
    }
  },
}
</script>

<template>
  <BackgroundDivider text="“ 무엇보다도 뜨겁게 서로 사랑할지니<br>사랑은 허다한 죄를 덮느니라 ”"
                     :is-small="true" />
  <footer class="footer">
    <div class="btn-container">
      <a class="btn"
         v-if="shareEnable"
         @click="shareLink" >
        <img src="../assets/imgs/ic_share.png"
             alt='' />
        링크 공유하기
      </a>
      <a class="btn"
         @click="copyLink">
        <img src="../assets/imgs/ic_link.png"
             alt='' />
        주소 복사하기
      </a>
    </div>
    <p>Copyright 2024. Yunyoung Jeong. All right reserved.</p>
    <p>Thanks to Hash the Deverloper.</p>
  </footer>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px;
}
.dday {
  margin: 52px 0 10px;
  font-size: 25px;
  line-height: 28px;
  font-weight: 400;
  text-align: center;
}

.message {
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 40px;
}

.input {
  font-size: 20px;
  width: 100%;
  border: 0.5px solid black;
  line-height: 1;
  padding: 8px 16px;
  box-sizing: border-box;
  margin-bottom: 20px;
  border-radius: 0;
  background-color: white;
  color: black;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  min-height: 42px;
}

.input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.input:focus {
  outline: none;
}

.placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.button {
  font-size: 18px;
  background: black;
  color: white;
  padding: 12px 0;
  border: none;
  width: 100%;
  margin-top: 1.5rem;
}

.footer {
  background-color: rgba(0, 0, 0, 0.06);
  padding: 40px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer p {
  font-size: 15px;
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
}

.footer p:nth-last-of-type(1) {
  margin-top: 6px;
}

.btn-container {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-bottom: 40px;
}


.btn {
  font-size: 16px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: pointer;
}

.btn img {
  width: 22px;
  height: 22px;
}
</style>
