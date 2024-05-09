<template>
  <div class="container">
    <el-carousel height="calc(100vh - 60px)">
      <el-carousel-item :key="1">
        <img :src="container_home1" alt="" class="news_img" />
      </el-carousel-item>
      <el-carousel-item :key="2">
        <img :src="container_home2" alt="" class="news_img" />
      </el-carousel-item>

      <el-carousel-item :key="3">
        <img :src="container_home3" alt="" class="news_img" />
      </el-carousel-item>

      <el-carousel-item :key="4">
        <img :src="container_home4" alt="" class="news_img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup>
const container_home1 = new URL("@/assets/home1.jpg", import.meta.url).href;
const container_home2 = new URL("@/assets/home2.jpg", import.meta.url).href;
const container_home3 = new URL("@/assets/home3.jpg", import.meta.url).href;
const container_home4 = new URL("@/assets/home4.jpg", import.meta.url).href;
</script>
<style scoped lang="scss">
.news_img {
  height: 100%;
  width: 100%;
}
</style>
