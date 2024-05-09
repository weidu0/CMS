<template>
  <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleChange"
  >
    <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { Plus } from "@element-plus/icons-vue";
const props = defineProps({
  avatar: String,
});
const uploadAvatar = computed(() =>
  props.avatar.includes("blob")
    ? props.avatar
    : "http://localhost:3000" + props.avatar
);
const emit = defineEmits(["weiduchange"]);
const handleChange = (file) => {
  emit("weiduchange", file.raw);
};
</script>
<style scoped>
::v-deep .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep.el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
}
</style>
