<template>
  <div class="sm-container">
    <div class="title"
         @click="toggle">
      <img src="../../assets/imgs/arrow_up.png"
           :class="['icon', expand&&'expand']"
           alt=''/>
      <p class="name">{{relation}} <strong>{{name}}</strong></p>
    </div>
    <div class="contact-wrapper"
         :id="`sm-contact-${id}`" >
      <div class="contact">
        <em>{{phone}}</em>&nbsp;로<br/>
        연락해주세요.
      </div>
    </div>
  </div>

</template>

<script lang="ts">
let expand:boolean = false;
export default {
  name: 'SmallContact',
  props: {
    name: String,
    phone: String,
    relation: String,
    id: Number
  },
  data() {
    return {
      expand
    }
  },
  methods: {
    toggle() {
      this.expand = !this.expand;
      const content = document.querySelector<HTMLDivElement>(`#sm-contact-${this.id}`);
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
.sm-container {
  flex: 1;
  background: transparent;
}

.icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: 200ms;
  transform: rotate(180deg);
}

.icon.expand {
  transform: none;
}

.title {
  display: flex;
  align-items: center;
  column-gap: 4px;
  cursor: pointer;
}

.name {
  font-size: 19px;
  line-height: 32px;
}

.name strong {
  font-size: 22px;
  font-weight: 400;
  font-style: normal;
}

.contact {
  margin-left: 28px;
  background: white;
  //flex: 1;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 24px;
  border: 0.5px solid black !important;
  margin-top: 6px;
  white-space: nowrap;
}

.contact em {
  font-style: normal;
  text-decoration: underline;
  text-decoration-thickness: 0.5px;
  text-underline-offset: 5px;
  color: black;
}

.contact-wrapper {
  transition: 400ms max-height ease-in-out;
  overflow: hidden;
  max-height: 0;
}
</style>
