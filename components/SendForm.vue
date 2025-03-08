<script lang="ts">
import { createClient } from '@supabase/supabase-js';
import Cookie from "js-cookie";
enum FOOD {
  SCHEDULE = '예정',
  NONE = '안함',
  UNDETERMINED = '미정'
}

enum FRIEND {
  MEN = '신랑측',
  WOMAN = '신부측'
}

let supbaseUrl ='';
let supabaseKey = '';
let supabase = undefined;
export default {
  name: 'SendForm',
  props: {
    closeModal: Function,
  },
  setup(){
    const config = useRuntimeConfig();
    supbaseUrl = config.public.supabaseUrl;
    supabaseKey = config.public.supabaseKey;
    supabase = createClient(supbaseUrl, supabaseKey);
  },
  data() {
    return {
      friend: FRIEND.MEN,
      name: '',
      cnt: -1,
      other: '',
      meal: FOOD.SCHEDULE,
      FRIEND,
      FOOD,
    }
  },
  methods: {
    async createMemo(){
      if(this.name.length===0){
        window.alert('성함을 입력해주세요.');
        return;
      }
      if(this.cnt===-1) {
        window.alert('참석 인원을 입력해주세요.');
        return;
      }
      const {error} = await supabase
          .from('memo')
          .insert({friend: this.friend,
          name: this.name,
          cnt: this.cnt,
          meal: this.meal,
          other: this.other});
      if(error) {
        console.error(error);
        window.alert('오류가 발생하였습니다.');
      } else {
        this.friend = FRIEND.MEN;
        this.name = '';
        this.cnt = -1;
        this.other = '';
        this.meal = FOOD.SCHEDULE;
        this.closeModal();
        window.alert('전달되었습니다.');
        Cookie.set('modal', 'true', {
          expires: 1,
        });
      }
    }
  }
}
</script>

<template>
  <div class="form-container">
    <form class="grid">
      <label>
        구분
      </label>
      <div class="radio">
        <button :class="['radio-btn', friend===FRIEND.MEN&&'checked']"
                type="button"
                @click="friend = FRIEND.MEN" >
          신랑측
        </button>
        <button :class="['radio-btn', friend===FRIEND.WOMAN&&'checked']"
                type="button"
                @click="friend = FRIEND.WOMAN" >
          신부측
        </button>
      </div>
      <label>
        성함
      </label>
      <input v-model="name" />
      <label>
        참석인원
      </label>
      <input :value="cnt!==-1?cnt: ' '"
             @change="(e)=>cnt =Number(e.target.value)"
             min="1"
             placeholder="본인 포함 총 참석 인원을 알려주세요"
             type="number">
      <label>
        동행인
      </label>
      <input v-model="other"
             placeholder="함께 오시는 분 성함을 알려주세요" >
      <label>식사여부</label>
      <div class="radio">
        <button :class="['radio-btn', meal===FOOD.SCHEDULE&&'checked']"
                type="button"
                @click="meal = FOOD.SCHEDULE" >
          예정
        </button>
        <button :class="['radio-btn', meal===FOOD.NONE&&'checked']"
                type="button"
                @click="meal = FOOD.NONE" >
          안함
        </button>
        <button :class="['radio-btn', meal===FOOD.UNDETERMINED&&'checked']"
                type="button"
                @click="meal = FOOD.UNDETERMINED" >
          미정
        </button>
      </div>
    </form>
    <button class="send-btn"
            @click="createMemo"
            type="button" >
      참석 의사 전달하기
    </button>
  </div>

</template>

<style scoped>

.form-container {
  //width: calc(100% - 36px);
  width: 100%;
}
.grid {
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
  margin-top: 20px;
  grid-gap: 20px 8px;

}
.grid label {
  font-size: 16px;
  line-height: 26px;
  white-space: nowrap;
}
.grid input {
  font-size: 14px;
  padding: 6px 8px;
  border: .5px solid black;
  border-radius: 0;
  width: calc(100% - 16px);
  //max-width: 100%;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.grid input::placeholder {
  color: rgba(0, 0, 0, 0.8);
}

.grid input:focus {
  outline: none;
}

.radio {
  display: flex;
  column-gap: 10px;
}

.radio-btn {
  flex: 1;
  padding: 4px;
  font-size: 16px;
  border-radius: 0;
  border: .5px solid black;
  cursor: pointer;
  color: black;
  background-color: white;
}

.radio-btn.checked {
  background-color: rgba(0, 0, 0, 0.58);
  border: none;
  color: white;
}

.send-btn {
  font-size: 18px;
  width: 100%;
  margin-top: 26px;
  background-color: rgba(0, 0, 0, 0.58);
  color: white;
  border: none;
  padding: 12px 0;
  cursor: pointer;
}
</style>
