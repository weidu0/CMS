<template>
  <div>
    <el-carousel
      height="calc(100vh - 60px)"
      direction="vertical"
      motion-blur
      :autoplay="false"
      v-if="looplist.length"
    >
      <el-carousel-item v-for="item in looplist" :key="item._id">
        <div
          class="item"
          :style="{
            backgroundImage: `url(http://localhost:3000${item.cover})`,
          }"
        >
          <el-card style="max-width: 480px" class="box-card">
            <template #header>
              <div class="card-header">
                <h2>{{ item.title }}</h2>
              </div>
            </template>
            <div>{{ item.introduction }}</div>
            <div class="detail">{{ item.detail }}</div>
            <div class="more">
              更多信息，请访问：
              <br />
              http://weidu5173
            </div>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div v-else>
      <el-empty description="暂无产品" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const looplist = ref([]);

onMounted(async () => {
  const res = await axios.get("/webapi/product/list");
  //console.log(res.data);
  looplist.value = res.data.data;
});
</script>

<style scoped lang="scss">
.item {
  width: 100%;
  height: 100%;
  background-image: cover;
}
.box-card {
  width: 50%;
  height: 100%;
  background-color: rgb(255, 255, 255, 0.7);
  .detail,
  .more {
    margin-top: 20px;
  }
}
</style>
