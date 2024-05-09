<template>
  <div class="container">
    <div class="news-header">
      <img :src="container_img" alt="" class="news_img" />
      <div class="search">
        <el-popover
          placement="bottom"
          title="检索结果"
          width="50%"
          :visible="visible"
        >
          <template #reference>
            <el-input
              v-model="searchText"
              style="width: 50%; height: 45px"
              placeholder="请输入新闻关键字"
              :prefix-icon="Search"
              @input="visible = true"
              @blur="visible = false"
            />
          </template>
          <!-- 搜索-->
          <div v-if="searchnewslist.length">
            <div
              v-for="data in searchnewslist"
              :key="data._id"
              class="search-item"
              @click="handleChangepage(data._id)"
            >
              {{ data.title }}
            </div>
          </div>
          <div v-else>
            <el-empty description="暂无新闻" :image-size="50" />
          </div>
        </el-popover>
      </div>
    </div>
    <!-- 栅格 -->
    <div class="topnews">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topNewsList" :key="item._id">
          <el-card
            style="max-width: 480px"
            shadow="hover"
            @click="handleChangepage(item._id)"
          >
            <template #footer
              >{{ item.title }}
              <div class="bottom">
                {{ whichTime(item.editTime) }}
              </div>
            </template>
            <div
              class="image"
              :style="{
                backgroundImage: `url(http://localhost:3000${item.cover})`,
              }"
            ></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 分类 -->
    <el-tabs v-model="whichTab" class="demo-tabs" style="margin: 20px">
      <el-tab-pane
        v-for="item in tablist"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <el-row :gutter="20">
          <el-col :span="18">
            <div
              v-for="data in tabnews[item.name]"
              :key="data._id"
              style="padding-bottom: 10px"
            >
              <el-card
                shadow="hover"
                body-style="padding:0"
                @click="handleChangepage(data._id)"
              >
                <div
                  class="tab-image"
                  :style="{
                    backgroundImage: `url(http://localhost:3000${data.cover})`,
                  }"
                ></div>

                <div style="padding: 14px; margin-left: 160px">
                  <span>{{ data.title }}</span>
                  <div class="tab-bottom">
                    {{ whichTime(data.editTime) }}
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <el-col :span="6">
            <el-timeline>
              <el-timeline-item
                v-for="(data, index) in tabnews[item.name]"
                :key="index"
                :timestamp="whichTime(data.editTime)"
              >
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- 滚动返回顶部按钮 -->
    <el-backtop />
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import { useRouter } from "vue-router";

//设置中文
moment.locale("zh-cn");
const searchText = ref();
const visible = ref(false);
const newlist = ref([]);
const whichTab = ref(1);
const router = useRouter();
const container_img = new URL("@/assets/news.jpg", import.meta.url).href;

onMounted(async () => {
  const res = await axios.get("/webapi/news/list");
  //console.log(res.data);
  newlist.value = res.data.data;
});

const searchnewslist = computed(() =>
  searchText.value
    ? newlist.value.filter((item) => item.title.includes(searchText.value))
    : []
);
const topNewsList = computed(() => newlist.value.slice(0, 4));

const whichTime = (item) => {
  return moment(item).format("YYYY年MM月DD日 HH:mm:ss");
};
const tablist = [
  {
    label: "最新动态",
    name: 1,
  },
  {
    label: "典型案例",
    name: 2,
  },
  {
    label: "通知公告",
    name: 3,
  },
];

//分组利用lodash
const tabnews = computed(() =>
  _.groupBy(newlist.value, (item) => item.category)
);

//点击跳转new详情页
const handleChangepage = (id) => {
  //console.log(id);
  router.push(`/news/${id}`);
};
</script>

<style scoped lang="scss">
.news_img {
  height: 400px;
  width: 100%;
}
.news-header {
  position: relative;
}
.search {
  position: absolute;
  top: 300px;
  width: 100%;
  text-align: center;
}
.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    background: whitesmoke;
    color: #4e6ef2;
  }
}
.topnews {
  margin: 20px;
  .image {
    width: 100%;
    height: 150px;
    background-size: cover;
  }
  .bottom {
    font-size: 13px;
    color: gray;
  }
}
.tab-image {
  width: 150px;
  height: 100px;
  background-size: cover;
  float: left;
}
.tab-bottom {
  font-size: 13px;
  color: gray;
}
</style>
