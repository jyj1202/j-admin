<template>
  <div class="flex justify-between items-center px-5">
    <el-tabs
      class="flex-1"
      v-model="editableTabsValue"
      closable
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <el-icon id="fullScreenIcon" class="cursor-pointer" @click="handleFullScreen"><FullScreen /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toggleFullScreen } from "@/utils/screen";


const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])
const removeTab = () => {

}


/** FullScreen */
const handleFullScreen = () => {
  toggleFullScreen(document.getElementById('pageBody')!)
}
</script>

<style scoped>
:deep(.el-tabs__header) {
  margin-bottom: 0;
}
:deep(.el-tabs__nav-wrap::after) {
  content: '';
  display: none;
  background-color: transparent;
}
</style>
