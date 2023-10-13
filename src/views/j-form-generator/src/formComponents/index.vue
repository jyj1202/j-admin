<template>
  <div>
    <draggable
      class="grid grid-cols-2 gap-2"
      tag="ul"
      :list="componentList"
      :group="{ name: 'form', pull: 'clone', put: false }"
      ghost-class="ghost"
      :sort="false"
      :clone="handleClone"
      item-key="type"
    >
      <template #item="{element}">
        <li class="px-1.5 py-0.5 rounded-sm cursor-move leading-normal align-middle">
          <a>
            <i :class="element.icon"></i>
            <span>{{element.label}}</span>
          </a>
        </li>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import draggable from 'vuedraggable'
import { getId } from "@/utils";
import type { FormItemMeta } from "@/stores/modules/formGenerator/state.d";
import type { FormComponentMeta } from "@/views/j-form-generator/src/formComponents/type.d";
import selectMeta from "./select";


const componentList = reactive<FormComponentMeta[]>([{
  label: 'input',
  type: 'input',
  labelWidth: 100,
  option: [{
    label: 'placeholder',
    prop: 'placeholder',
    type: 'input',
    span: 24,
  }, {
    label: 'clearable',
    prop: 'clearable',
    type: 'switch',
    span: 24,
  }, {
    label: 'type',
    prop: 'type',
    type: 'select',
    span: 24,
    dicData: [{
      label: 'password',
      value: 'password',
    }, {
      label: 'textarea',
      value: 'textarea',
    }]
  }, {
    label: 'is password',
    prop: 'showPassword',
    type: 'switch',
    span: 24,
  }, {
    label: 'autosize',
    prop: 'autosize',
    type: 'switch',
    span: 24,
  }]
}, {
  label: 'Input Number',
  type: 'inputNumber',
  labelWidth: 100,
  option: [{
    label: 'step',
    prop: 'step',
    type: 'input-number',
    span: 24,
  }, {
    label: 'step strictly',
    prop: 'stepStrictly',
    type: 'switch',
    span: 24,
  }, {
    label: 'controls position',
    prop: 'controlsPosition',
    type: 'select',
    span: 24,
    dicData: [{
      label: 'right',
      value: 'right'
    }, {
      label: '',
      value: ''
    }]
  }]
}, selectMeta, {
  label: 'Radio',
  type: 'radio',
  labelWidth: 100,
}, {
  label: 'Checkbox',
  type: 'checkbox',
  labelWidth: 100,
}, {
  label: 'Switch',
  type: 'switch',
  labelWidth: 100,
}, {
  label: 'Rate',
  type: 'rate',
  labelWidth: 100,
}])

/**
 * clone formComponent handler
 * (init) first deep clone form component's meta, then add relative props.
 * @param formComponent
 */
const handleClone = (formComponent: FormComponentMeta): FormItemMeta => {
  const id = getId()
  return {...formComponent, id, prop: formComponent.type+id}
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
