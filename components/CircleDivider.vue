<template>
<div class="divider-container">
  <div class="line" />
  <div class="circle" />
  <div class="line" />
</div>
</template>

<script>
export default {
  name: "CircleDivider"
}
</script>

<style scoped>
.divider-container {
  display: flex;
  align-items: center;
  width: 100%;
  column-gap: 8px;
}

.line {
  background-color: rgba(0, 0, 0, 0.37);
  flex: 1;
  height: 1px;
}

.circle {
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: black;
}
</style>
