<template>
  <template v-for="{children, meta, path} in menuList" :key="path || meta.title">
    <!-- index	唯一标志 -->
    <el-sub-menu v-if="children" :index="path || meta.title">
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ meta.title }}</span>
      </template>
      <MenuTree :menu-list="children"/>
    </el-sub-menu>
    <el-menu-item v-else :index="path || meta.title">
      <el-icon><setting /></el-icon>
      <span>{{ meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts" name="MenuTree">
interface propsType {
  menuList: Menu.MenuOption[]
}
const props = withDefaults(defineProps<propsType>(), {
})
</script>

<style scoped></style>
