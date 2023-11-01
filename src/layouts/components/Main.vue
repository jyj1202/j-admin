<!-- 内容主体区域 -->
<template>
  <div class="wrapper">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform">
        <!-- <keep-alive> -->
          <component :is="Component" :key="route.fullPath"/>
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  overflow-y: auto;
}
</style>
