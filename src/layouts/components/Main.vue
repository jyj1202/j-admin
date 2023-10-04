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
