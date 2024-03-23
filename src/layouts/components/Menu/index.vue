<template>
  <el-scrollbar>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="activeMenu"
      :collapse="settingStore.isCollapse"
      :collapse-transition="false"
      @select="handleSelect"
    >
      <MenuTree :menu-list="menuList"/>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import MenuTree from "./MenuTree.vue";
import { useSettingStore } from "@/stores/modules/setting";
import type { RouteRecordRaw } from "vue-router";

const router = useRouter()
const route = useRoute()
const routes = router.options.routes

const rootRoute = routes.find(r => r.path == '/')
const menuList = generateMenuList(rootRoute?.children);

function generateMenuList(routes: RouteRecordRaw[]=[], menuList:Menu.MenuOption[]=[]) {
  routes.forEach(route => {
    const { path, children, meta } = route
    if (!meta) return
    const { menu, title } = meta
    if (!menu) return
    const menuItem: Menu.MenuOption = { path, meta }
    if (children) {
      menuItem.children = generateMenuList(children)
    }
    menuList.push(menuItem)
  });
  return menuList
}

const handleSelect = (index: string) => {
  if (typeof index === 'string' && index.startsWith('http')) return window.open(index, '_blank')
  if (/^\//.test(index)) {
    router.push(index)
  }
}

const settingStore = useSettingStore()

const activeMenu = computed(() => (route.path));

</script>

<style scoped lang="scss">
.el-menu {
  border-right: none;
  width: 100%;
  transition: width .1s ease;
}
// .el-scrollbar {
//   width: auto;
// }
:deep(.el-menu-item.is-active) {
  border-right: 2px solid var(--el-color-primary);
  background-color: var(--el-color-primary-light-8);
}
</style>
