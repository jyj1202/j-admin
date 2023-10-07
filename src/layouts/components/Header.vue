<template>
  <div class="flex-1 flex items-center text-4xl">
    <el-icon id="collapseIcon" class="header-icon" @click="handleMenuCollapse">
      <component :is="settingStore.isCollapse?'Expand':'Fold'"></component>
    </el-icon>
    <el-icon id="refreshIcon" class="header-icon"><RefreshRight /></el-icon>
    <el-breadcrumb id="breadcrumb" class="px-2" separator="/">
      <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.title">{{ item.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="flex items-center text-4xl">
    <el-icon id="fullScreenIcon" class="header-icon" @click="handleFullScreen"><FullScreen /></el-icon>
    <el-dropdown  id="personalSetting">
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
    <SettingDrawer id="settingDrawer" class="header-icon text-xl"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from 'vue-router'
import {useSettingStore} from "@/stores/modules/setting";
import { toggleFullScreen } from "@/utils/screen";
import SettingDrawer from "./SettingDrawer/index.vue";

/** fold */
const settingStore = useSettingStore()
const handleMenuCollapse = () => {
  settingStore.isCollapse = !settingStore.isCollapse
}

/** breadcrumb */
const breadcrumbs = computed(() => {
  const route = useRoute()
  const breadcrumb: Array<{title: string, icon?: string}> = []
  for (let i = 1; i < route.matched.length; i++) {
    const routeItem = route.matched[i];
    const {meta: {title, icon}} = routeItem
    title && breadcrumb.push({title, icon})
  }
  return breadcrumb
})

/** FullScreen */
const handleFullScreen = () => {
  toggleFullScreen(document.documentElement)
}

/** personal setting */
const avatarUrl = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')
const handlePersonalSetting = () => {
  
}
const handleLogout = () => {}

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
