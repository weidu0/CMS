<template>
  <div>
    <el-card>
      <el-page-header icon="null" title="用户管理 ">
        <template #content>
          <span class="font-600">用户列表用户 </span>
        </template>
      </el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column label="头像" width="180">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar
                :size="50"
                :src="'http://localhost:3000' + scope.row.avatar"
              >
              </el-avatar>
            </div>
            <div v-else>
              <el-avatar
                :size="50"
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              >
              </el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色" width="180">
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.role === 1">管理员</el-tag>

            <el-tag type="success" v-else>编辑</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-popconfirm
              title="你确定要删除吗?"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑 -->
    <el-dialog
      v-model="dialogVisible"
      title="编辑用户"
      width="40%"
      :before-close="handleClose"
    >
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
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditconfirm()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import axios from "axios";

const dialogVisible = ref(false);
const tableData = ref([]);
const userFormRef = ref();
const userForm = reactive({
  username: "",
  password: "",
  role: 2, //
  introduction: "",
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
onMounted(() => {
  getTableData();
});
const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list");
  // console.log(res.data);
  tableData.value = res.data.data;
};
//编辑回调
const handleEdit = async (data) => {
  //console.log(data);
  const res = await axios.get(`/adminapi/user/list/${data._id}`);

  Object.assign(userForm, res.data.data[0]);
  dialogVisible.value = true;
};
//编辑确认回调
const handleEditconfirm = () => {
  userFormRef.value.validate(async (valid) => {
    if (valid) {
      //更新后端
      await axios.put(`/adminapi/user/list/${userForm._id}`, userForm);
      //dialog隐藏
      dialogVisible.value = false;
      //获取table数据
      getTableData();
    } else {
    }
  });
};
//删除列表
const handleDelete = async (data) => {
  console.log(data);
  await axios.delete(`/adminapi/user/list/${data._id}`);
  getTableData();
};
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>
