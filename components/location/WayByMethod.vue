<template>
  <article class="way">
    <h6 class="title">{{title}}</h6>
    <ul class="contents">
      <li v-if="header"
          class="header" >
        {{header}}
      </li>
      <li v-for="item in contents">
        {{item}}
      </li>
    </ul>
  </article>
</template>

<script lang="ts">
export default {
  name: "WayByMethod",
  props: {
    title: String,
    contents: Array,
    header: String | undefined
  }
}
</script>

<style scoped>
.way {
  width: 100%;
  max-width: calc(100% - 72px);
  margin-top: 32px;
}

.title {
  font-size: 22px;
  font-weight: 400;
  line-height: 34px;
  text-decoration: underline;
  text-decoration-thickness: .7px;
  text-underline-offset: 7px;
  margin-bottom: 4px;
}

.contents {
  font-size: 15px;
  line-height: 20px;
  list-style: '∙';
  padding-left: 6px;
  word-break: keep-all;
}

.contents li:nth-last-of-type(n + 2) {
  margin-bottom: 4px;
}

.header {
  list-style: none;
  margin-left: -6px;
}
</style>
