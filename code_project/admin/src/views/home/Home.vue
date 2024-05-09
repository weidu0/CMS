<template>
  <div>
    <el-page-header icon="null" title="企业门户网站管理系统">
      <template #content>
        <span class="font-600"> 首页</span>
      </template>
    </el-page-header>
    <el-card class="box_card">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h2 style="line-height: 100px">
            欢迎{{ store.state.userInfo.username }}回来 ,{{ welcomeText }}
          </h2>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box_card">
      <template #header>
        <div class="card-header">
          <span>公司产品</span>
        </div>
      </template>
      <!-- 轮播 -->
      <el-carousel
        :interval="4000"
        type="card"
        height="200px"
        v-if="loopList.length"
      >
        <el-carousel-item v-for="item in loopList" :key="item._id">
          <div
            :style="{
              backgroundImage: `url(http://localhost:3000${item.cover})`,
              backgroundSize: 'cover',
            }"
          >
            <h3 justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
const loopList = ref([]);
const store = useStore();
console.log(store.state);
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);
const welcomeText = computed(() =>
  new Date().getHours() < 12 ? "要开心每一天。" : "喝杯咖啡提提神吧。"
);

//获取列表
onMounted(() => {
  getData();
});
const getData = async () => {
  const res = await axios.get("/adminapi/product/list");

  loopList.value = res.data.data;
  //console.log(loopList.value);
};
</script>

<style scoped lang="scss">
.box_card {
  margin-top: 50px;
}
.el-carousel__item h3 {
  color: #ffffff;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
