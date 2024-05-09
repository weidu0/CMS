<template>
  <el-row>
    <el-col :span="16" :offset="1" :pull="1">
      <div>
        <h2>{{ currentNews.title }}</h2>
        <div class="time">
          {{ whichTime(currentNews.editTime) }}
        </div>
      </div>
      <!-- 分割线 -->
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div v-html="currentNews.content"></div>
    </el-col>
    <el-col :span="4" :offset="1" :pull="1">
      <!-- 最新新闻 -->
      <el-card style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span style="font-size: 16px; font-weight: bold"> 最近新闻</span>
          </div>
        </template>
        <div
          v-for="item in toptNews"
          :key="item._id"
          style="padding: 14px"
          @click="handleChange(item._id)"
        >
          <span>{{ item.title }}</span>
          <div class="time">
            {{ whichTime(item.editTime) }}
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect, onUnmounted } from "vue";
import moment from "moment";
import axios from "axios";
import { StarFilled } from "@element-plus/icons-vue";

const route = useRoute();
const currentNews = ref({});
const toptNews = ref([]);
const router = useRouter();

//watchEffect==>route.params.id发生改变会执行
//里面所依赖的值改变会执行一次
//实现详情跳详情

const stop = watchEffect(async () => {
  //跳转新闻中心也会执行一次，由于服务器getlist拿到的值，是字符串undefind，所有拦截不到报错

  if (!route.params.id) return;

  const res1 = await axios.get(`/webapi/news/list/${route.params.id}`);
  const res2 = await axios.get(`/webapi/news/toplist?limit=4`);
  console.log(res2.data.data[0]);
  currentNews.value = res1.data.data[0];
  toptNews.value = res2.data.data;
});

//从详情页面返回时，顺便销毁watchEffect，又因为watchEffect比onUnmounted，先走了
//所有在watchEffect里面要写一个判断if
onUnmounted(() => {
  // console.log("onBeforeUnMoun");
  stop();
});
//设置中文
moment.locale("zh-cn");

const whichTime = (item) => {
  return moment(item).format("YYYY年MM月DD日 HH:mm:ss");
};
//最近新闻跳转  详情页
const handleChange = (id) => {
  //console.log(id);
  router.push(`/news/${id}`);
};
</script>
<style scoped lang="scss">
.el-row {
  margin-top: 30px;
}
.time {
  font-size: 13px;
  color: gray;
}
.card-header {
  text-align: center;
}
</style>
