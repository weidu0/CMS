<template>
  <div>
    <el-page-header icon="null" title="产品管理">
      <template #content>
        <span class="font-600">添加产品 </span>
      </template>
    </el-page-header>
    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productFormRules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>

      <el-form-item label="产品简要描述" prop="introduction">
        <el-input v-model="productForm.introduction" type="textarea" />
      </el-form-item>

      <el-form-item label="产品详细描述" prop="detail">
        <el-input v-model="productForm.detail" type="textarea" />
      </el-form-item>

      <el-form-item label="产品图片" prop="cover">
        <Upload :avatar="productForm.cover" @weiduchange="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"> 添加产品 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const productFormRef = ref();
const productForm = reactive({
  title: "",
  introduction: "",
  detail: "",
  cover: "",
  file: null,
});
const productFormRules = reactive({
  title: [
    {
      required: true,
      message: "请输入产品名称",
      trigger: "blur",
    },
  ],

  introduction: [
    {
      required: true,
      message: "请输入简要描述",
      trigger: "blur",
    },
  ],
  detail: [
    {
      required: true,
      message: "请输入详细描述",
      trigger: "blur",
    },
  ],
  cover: [
    {
      required: true,
      message: "请输入图片",
      trigger: "blur",
    },
  ],
});

const handleChange = (file) => {
  productForm.cover = URL.createObjectURL(file);
  productForm.file = file;
};
const router = useRouter();
const submitForm = () => {
  productFormRef.value.validate(async (valid) => {
    if (valid) {
      console.log(productForm);
      await upload("/adminapi/product/add", productForm);
      router.push(`/product-manage/listproduct`);
    }
  });
};
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
  margin-left: 50px;
}
</style>
