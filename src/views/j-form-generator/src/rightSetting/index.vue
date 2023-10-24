<template>
  <el-tabs class="item-setting" v-if="formGeneratorStore.currentFormItem" v-model="activeTab">
    <el-tab-pane class="px-3" label="Prop" name="prop">
      <el-collapse>
        <el-collapse-item title="FormItem Prop" name="formItemProp">
          <FormItemSetting/>
        </el-collapse-item>
        <el-collapse-item title="Component unique prop" name="componentProp">
          <ComponentSetting/>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane lazy label="Event" name="event">
      <EventSetting class="mt-2"/>
    </el-tab-pane>
  </el-tabs>
  <el-tabs class="form-setting" v-else model-value="formSetting">
    <el-tab-pane class="px-3" label="Form Config" name="formSetting">
      <FormConfig class="mt-2"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFormGeneratorStore } from "@/stores/modules/formGenerator";
import FormItemSetting from "./FormItemSetting.vue";
import ComponentSetting from "./ComponentSetting.vue";
import FormConfig from "./FormConfig.vue";
import EventSetting from "./EventSetting.vue";


const formGeneratorStore = useFormGeneratorStore()

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
:deep(.el-select), :deep(.el-input-number) {
  width: 100%;
}
.item-setting :deep(.el-tabs__active-bar) {
  width: 50% !important;
}
.item-setting :deep(.el-tabs__item) {
  padding: 0;
  width: 50%;
}
.form-setting :deep(.el-tabs__active-bar) {
  width: 100% !important;
}
.form-setting :deep(.el-tabs__item) {
  padding: 0;
  width: 100%;
}
</style>
