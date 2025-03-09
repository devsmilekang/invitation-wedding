<script lang="ts">

import {defineComponent} from "vue";
import CopyAccount from "~/components/account/CopyAccount.vue";

export default defineComponent({
  components: {CopyAccount},
  props: {
    type: String,
    account1: String,
    account2: String,
    account3: String,
    id: Number,
  },
  methods: {
    toggle() {
    this.expand = !this.expand;
      const content = document.querySelector<HTMLDivElement>(`#bank-account-${this.id}`);
      if(content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    },
    onMouseOver() {
      if(this.expand) {
        this.label = '눌러서 닫기';
      } else {
        this.label = '눌러서 확인하기';
      }
    }
  },
  data() {
    return {
      expand: false,
      label: `${this.type} 측 계좌번호`
    }
  }
})
</script>

<template>
  <div class="top">
    <div class="header">
      <div class="side"
              @click="toggle"
              @mouseenter="onMouseOver"
              @mouseleave="this.label = `${this.type} 측 계좌번호`;" >
        {{label}}
      </div>
    </div>
    <div :id="`bank-account-${id}`"
         class="article-wrapper">
      <p class="copy">텍스트를 눌러서 복사할 수 있어요.</p>
      <article class="account-article">
        <CopyAccount :who="type"
                     :account="account1" />
        <CopyAccount who="아버지"
                     :account="account2" />
        <CopyAccount who="어머니"
                     :account="account3 " />
      </article>
    </div>
  </div>

</template>

<style scoped>
.top {
}
.copy {
  margin-top: 21px;
  font-size: 15px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.62);
  margin-bottom: 6px;
}

.account-article {
  padding: 12px 16px;
  box-sizing: border-box;
  background-color: #D9D9D9;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  align-items: center;
  //margin-bottom: 2rem
}

.article-wrapper {
  transition: max-height 350ms ease-in-out;
  overflow: hidden;
  max-height: 0;
  width: 100%;
}

.side {
  font-size: 18px;
  line-height: 31px;
  padding: 4px 12px;
  text-align: left;
  border: 0.5px solid black;
  width: 100%;
  background-color: white;
  cursor: pointer;
  color: black;
}

.side:hover {
  background-color: #D9D9D9;
}

.header {
  width: 100%;
}

.header:nth-of-type(3) {
  margin-top: 20px;
}
</style>
