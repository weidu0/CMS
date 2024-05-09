<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <router-view></router-view>
</template>
<script></script>

<style>

* {
  padding: 0;
  margin: 0;
}

/* 滚动条设置 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-slider-thumb {
  background: #1890ff;
}
::-webkit-scrollbar-track {
  background: #ddd;
}
</style>
