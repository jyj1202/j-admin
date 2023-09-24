<!-- 内容主体区域 -->
<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-transform">
      <keep-alive>
        <component :is="Component" :key="route.fullPath"/>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">

</script>

<style scoped >
:deep(.el-scrollbar__view) {
  padding: 1.2rem;
}
</style>
