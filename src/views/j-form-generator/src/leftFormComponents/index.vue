<template>
  <draggable
    class="grid grid-cols-2 gap-2"
    tag="ul"
    :list="componentList"
    :group="{ name: 'form', pull: 'clone', put: false }"
    ghost-class="ghost"
    :sort="false"
    :clone="draggableCloneHandler"
    item-key="type"
  >
    <template #item="{element}">
      <li class="px-1.5 py-0.5 rounded-sm cursor-move leading-normal align-middle">
        <a>
          <i :class="element.icon"></i>
          <span class="text-sm leading-none">{{element.label}}</span>
        </a>
      </li>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import draggable from 'vuedraggable'
import { getId, deepClone } from "@/utils";
import type { FormItemMeta, FormComponentMeta } from '@/views/j-form-generator/src/typings'
import inputMeta from "./input";
import passwordMeta from "./password";
import textareaMeta from "./textarea";
import inputNumberMeta from "./inputNumber";
import selectMeta from "./select";
import radioGroupMeta from "./radio-group";
import checkboxGroupMeta from "./checkbox-group";
import switchMeta from "./switch";
import rateMeta from "./rate";

/** left aside form component list */
const componentList = reactive<FormComponentMeta[]>([
  inputMeta,
  passwordMeta,
  textareaMeta,
  inputNumberMeta,
  selectMeta,
  radioGroupMeta,
  checkboxGroupMeta,
  switchMeta,
  rateMeta
  ])

/**
 * clone formComponent handler
 * (init) first deep clone form component's meta, then add relative props.
 * @param formComponent
 */
const draggableCloneHandler = (formComponent: FormComponentMeta): FormItemMeta => {
  const id = getId()
  const formItemUniqueProps = {id, prop: formComponent.type+id}
  const defaultFormItemProps = {
    span: 24, disabled: false, display: true
  }
  /** add id, prop */
  /** add formItem prop: span 24, disable: false, size: 'default' */  
  return {...deepClone(formComponent), ...defaultFormItemProps, ...formItemUniqueProps,} as FormItemMeta
}
</script>

<style scoped lang="scss">
li {
  border: 1px solid var(--el-color-primary-light-9);
  background-color: var(--el-color-primary-light-9);
  &:hover {
    border-color: var(--el-color-primary);
  }
}
.ghost-class {
  border-Top: 2px solid var(--el-color-primary);
  width: 100%;
  height: 0;
  font-size: 0;
  /* box-sizing: border-box;
  overflow: hidden; */
}
</style>
