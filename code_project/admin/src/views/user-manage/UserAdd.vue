<template>
  <div>
    <el-page-header icon="null" title="用户管理">
      <template #content>
        <span class="font-600">添加用户 </span>
      </template>
    </el-page-header>
    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="userFormRules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select
          v-model="userForm.role"
          placeholder="保密"
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

      <el-form-item label="个人简介" prop="introduction">
        <el-input v-model="userForm.introduction" type="textarea" />
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <Upload :avatar="userForm.avatar" @weiduchange="handleChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"> 添加用户 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import Upload from "@/components/upload/Upload.vue";
import upload from "@/util/upload";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
const userFormRef = ref();
const userForm = reactive({
  username: "",
  password: "",
  role: 2, //
  introduction: "",
  avatar: "",
  file: null,
  gender: 0,
});
const userFormRules = reactive({
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
  role: [
    {
      required: true,
      message: "请选择权限",
      trigger: "blur",
    },
  ],
  introduction: [
    {
      required: true,
      message: "请输入简介",
      trigger: "blur",
    },
  ],
  avatar: [
    {
      required: true,
      message: "请输入头像",
      trigger: "blur",
    },
  ],
});

const options = [
  {
    label: "管理员",
    value: 1,
  },
  {
    label: "编辑",
    value: 2,
  },
];
const handleChange = (file) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};
const router = useRouter();
const submitForm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      await upload("/adminapi/user/add", userForm);
      router.push(`/user-manage/listuser`);
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
