<template>
  <Navbar></Navbar>
  <router-view></router-view>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<style lang="scss">
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
