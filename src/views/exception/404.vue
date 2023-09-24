<template>
  <div class="go-error">
    <h1 class="text-base text-gray-500">404抱歉，你访问的页面不存在</h1>
    <el-button type="primary" @click="handleGoHome">回到首页</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter()
function handleGoHome() {
  router.replace('/')
}
</script>

<style lang="scss" scoped>
</style>
