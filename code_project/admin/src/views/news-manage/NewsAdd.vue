<template>
  <div>
    <el-page-header icon="null" title="新闻管理">
      <template #content>
        <span class="font-600">添加新闻</span>
      </template>
    </el-page-header>
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsFormRules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="newsForm.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- 富文本 -->
        <editor @event="handleChange" class="editor" />
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-select
          v-model="newsForm.category"
          placeholder="Select"
          style="width: 100%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <Upload :avatar="newsForm.cover" @weiduchange="handleChangeCover" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"> 添加新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import editor from "@/components/editor/Editor.vue";
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import { useRouter } from "vue-router";
const router = useRouter();
const newsFormRef = ref();
const newsForm = reactive({
  title: "",
  content: "",
  category: 1, //1最新动态，2典型案例，3通知公告
  cover: "",
  file: null,
  isPublish: 0, // 0未发布，1已经发布
});
const newsFormRules = reactive({
  title: [
    {
      required: true,
      message: "请输入标题",
      trigger: "blur",
    },
  ],
  content: [
    {
      required: true,
      message: "请输入内容",
      trigger: "blur",
    },
  ],
  category: [
    {
      required: true,
      message: "请选择分类",
      trigger: "blur",
    },
  ],
  cover: [
    {
      required: true,
      message: "请上传图片",
      trigger: "blur",
    },
  ],
});
const options = [
  {
    label: "最新动态",
    value: 1,
  },
  {
    label: "典型案例",
    value: 2,
  },
  {
    label: "通知公告",
    value: 3,
  },
];
//每次editor内容改变时回调
const handleChange = (data) => {
  //console.log(data);
  newsForm.content = data;
};

const handleChangeCover = (file) => {
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file;
};

const submitForm = () => {
  newsFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(newsForm);
      //后台通信
      await upload("/adminapi/news/add", newsForm);
      router.push(`/news-manage/listnews`);
    }
  });
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
  margin-left: 50px;
}
.editor {
  max-width: 1200px;
}
</style>
