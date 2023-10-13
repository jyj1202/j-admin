<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane class="px-3" label="Prop" name="prop">
      <el-collapse>
        <el-collapse-item title="FormItem Prop" name="formItemProp">
          <FormItemSetting/>
        </el-collapse-item>
        <el-collapse-item title="Component unique prop" name="componentProp">
          <ComponentSetting/>
        </el-collapse-item>
        <el-collapse-item title="Base Prop" name="baseProp">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane class="px-3" label="Event" name="event">

    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormItemSetting from "./FormItemSetting.vue";
import ComponentSetting from "./ComponentSetting.vue";


const activeTab = ref('prop')
</script>

<style scoped>
:deep(.el-tabs__header) {
  margin-bottom: 0;
}
.el-tabs {
  --el-tabs-header-height: 50px;
  height: 100%
}
:deep(.el-tabs__content) {
  overflow-y: auto;
  height: calc(100% - var(--el-tabs-header-height));
}
:deep(.el-tabs__nav) {
  width: 100%;
}
:deep(.el-tabs__item) {
  padding: 0;
  width: 50%;
}
:deep(.el-tabs__active-bar) {
  width: 50% !important;
}
:deep(.el-select), :deep(.el-input-number) {
  width: 100%;
}
</style>
