<template>
  <div class="flex-1 flex items-center text-4xl">
    <el-icon class="h-full px-2 cursor-pointer hover:bg-gray-100"><Fold /></el-icon>
    <el-icon class="h-full px-2 cursor-pointer hover:bg-gray-100"><RefreshRight /></el-icon>
    <el-breadcrumb class="px-2" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="flex items-center text-4xl">
    <el-icon class="h-full px-2 cursor-pointer hover:bg-gray-100"><FullScreen /></el-icon>
    <el-dropdown>
      <div class="flex items-center px-2 cursor-pointer hover:bg-gray-100 space-x-2">
        <el-avatar :src="avatarUrl" />
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handlePersonalSetting">个人设置</el-dropdown-item>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-icon class="h-full px-2 cursor-pointer hover:bg-gray-100"><Setting /></el-icon>
  </div>
</template>

<script setup lang="ts">
import {
  ref
} from "vue";

const avatarUrl = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')

const handlePersonalSetting = () => {
  console.log('handlePersonalSetting');
  
}
const handleLogout = () => {}


</script>

<style scoped lang="scss">
.h-full {
  height: 100%;
}
.el-dropdown {
  height: 100%;
}
</style>
