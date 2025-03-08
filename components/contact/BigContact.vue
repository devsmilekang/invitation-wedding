<template>
  <div>
    <div class="title-container"
         @click="toggle" >
      <img src="../../assets/imgs/arrow_up.png"
           :class="['icon', expand&&'expand']"
           alt=''/>
      <p class="title">{{name}}에게 연락하기</p>
    </div>
    <div class="content-wrapper"
         :id="`big-contact-${id}`" >
      <div class="content">
        <em>{{phone}}</em>로 연락해주세요
      </div>
    </div>
  </div>
</template>

<script lang="ts">
let expand: boolean = false;
export default {
  name: "BigContact",
  props: {
    name: String,
    phone: String,
    id: Number,
  },
  data() {
    return {
      expand,
    }
  },
  methods: {
    toggle() {
      this.expand = !this.expand;
      const content = document.querySelector<HTMLDivElement>(`#big-contact-${this.id}`);
      if(content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: 200ms ease-in-out;
  transform: rotate(180deg);
}

.icon.expand {
  transform: none;
}


.title {
  font-size: 22px;
  line-height: 32px;
  margin-left: 6px;
}

.title-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.content {
  font-size: 19px;
  margin-top: 8px;
  border: 0.5px solid black;
  padding: 6px 14px 8px;
  line-height: 32px;
  margin-left: 30px;
  background-color: white;
  margin-bottom: 14px;
}

.content em {
  text-decoration: underline;
  text-decoration-thickness: 0.5px;
  text-underline-offset: 4px;
  font-style: normal;
  color: black;
}

.content em:visited {
  color: black;
}

.content-wrapper {
  overflow: hidden;
  max-height: 0;
  transition: max-height 400ms ease-in-out;
}

</style>
