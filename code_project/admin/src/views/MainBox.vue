<template>
  <el-container>
    <SideMenu />
    <el-container direction="vertical">
      <TopHeader />
      <le-main>
        <router-view style="padding: 20px"></router-view>
      </le-main>
    </el-container>
  </el-container>
</template>

<script setup>
import SideMenu from "@/components/mainbox/SideMenu.vue";
import TopHeader from "@/components/mainbox/TopHeader.vue";
</script>
<style>
#app {
  padding: 0;
  margin: 0;
}
.el-container {
  min-width: 1200px;
}
.le-main {
  overflow: auto;
  height: calc(100vh - 60px);
}
</style>
