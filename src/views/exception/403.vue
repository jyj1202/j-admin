<template>
  <div class="go-error">
    <h1 class="text-base text-gray-500">403抱歉，你无权访问该页面</h1>
    <n-button type="primary" @click="handleGoHome">回到首页</n-button>
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
