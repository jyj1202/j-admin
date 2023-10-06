<template>
  <div class="flex-1 flex items-center text-4xl">
    <el-icon class="header-icon" @click="handleMenuCollapse">
      <component :is="settingStore.isCollapse?'Expand':'Fold'"></component>
    </el-icon>
    <el-icon class="header-icon"><RefreshRight /></el-icon>
    <el-breadcrumb class="px-2" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="flex items-center text-4xl">
    <el-icon class="header-icon" @click="handleFullScreen"><FullScreen /></el-icon>
    <el-dropdown>
      <div class="header-icon flex items-center space-x-2">
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
    <SettingDrawer class="header-icon text-xl"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {useSettingStore} from "@/stores/modules/setting";
import { toggleFullScreen } from "@/utils/screen";
import SettingDrawer from "./SettingDrawer/index.vue";

/** emit */
const emit = defineEmits<{
  (e: 'menuCollapse'): void
}>()

const avatarUrl = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')

const handlePersonalSetting = () => {
  
}
const handleLogout = () => {}

const settingStore = useSettingStore()
const handleMenuCollapse = () => {
  settingStore.isCollapse = !settingStore.isCollapse
}

const handleFullScreen = () => {
  toggleFullScreen(document.documentElement)
}
</script>

<style scoped lang="scss">
.el-dropdown {
  height: 100%;
}
.header-icon {
  padding: 0 0.5rem;
  height: 100%;
  cursor: pointer;
  // font-size: var(--el-font-size-medium);
  &:hover {
    background-color: var(--el-bg-color-page);
  }
}
</style>
