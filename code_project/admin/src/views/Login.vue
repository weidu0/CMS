<template>
  <div>
    <vue-particles id="tsparticles" :options="options" />
    <div class="formContainer">
      <h2>企业门户网站管理系统</h2>
      <el-form
        ref="loginFormRef"
        style="max-width: 500px"
        :model="loginForm"
        status-icon
        :rules="loginRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import store from "@/store/index.";
const on = () => {
  localStorage.setItem("token", "keww");
};
const router = useRouter();
const loginForm = reactive({
  username: "",
  password: "",
}); //表单的响应式对象

const loginFormRef = ref(); //表单的引用对象

const loginRules = reactive({
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
});

//提交表单函数
const submitForm = () => {
  //1.校验表单，
  loginFormRef.value.validate((valid) => {
    console.log(valid);
    if (valid) {
      // console.log(loginForm);
      axios.post("/adminapi/user/login", loginForm).then((res) => {
        console.log(res.data);
        if (res.data.ActionType === "ok") {
          //console.log(res.data.data);接收传过来的数据
          store.commit("changeUserInfo", res.data.data);
          store.commit("changGetterRouter", false);
          router.push({ path: "/index" });
        } else {
          ElMessage.error("用户名密码不匹配");
        }
      });
    }
  });

  //2.拿到表单内容
  //3.设置 token  locaStorage.setItem("token")
};
const options = {
  background: {
    color: {
      value: "#2d3a4b",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(#000000, $alpha: 0.5);
  color: white;
  text-align: center;
  padding: 20px;
}

::v-deep .el-form-item__label {
  color: white;
}

h2 {
  width: auto;
  padding-bottom: 30px;
}
</style>
