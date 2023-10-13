<template>
  <el-form class="h-full" ref="formRef">
    <el-row class="h-full">
      <draggable
        class="flex items-start content-start flex-wrap h-full w-full overflow-hidden"
        :list="formItemList"
        :group="{ name: 'form' }"
        item-key="id"
        ghost-class="ghost-class"
        :animation="300"
        @change="handleDropChange"
      >
        <template #item="{element}">
          <el-col
            class="form-item px-3 pt-2 relative cursor-move"
            :class="{'form-item-active': element.id==currentFormItem?.id}"
            :span="24"
            @click="handleFormItemClick(element)"
          >
            <el-form-item
              :label="element.label"
              :prop="element.prop"
              :rules="element.rules"
            >
              <component
                :is="getFormItemComponent(element.type)"
                v-bind="getFormItemProps(element)"
              >
              </component>
            </el-form-item>
            <el-button class="absolute bottom-0 right-12 z-10" plain type="primary" icon="CopyDocument" circle
              @click.stop="handleCopyFormItem(element)"
            />
            <el-button class="absolute bottom-0 right-3 z-10" plain type="danger" icon="Delete" circle
              @click.stop="handleDeleteFormItem(element)"
            />
          </el-col>
        </template>
      </draggable>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import draggable from 'vuedraggable'
import { getId } from "@/utils";
import { useFormGeneratorStore } from "@/stores/modules/formGenerator";
import type { FormItemMeta } from "@/stores/modules/formGenerator/state.d";


const formGeneratorStore = useFormGeneratorStore()
const { setCurrentFormItem, setFormItem, deleteFormItem } = formGeneratorStore
const { formItemList, currentFormItem } = storeToRefs(formGeneratorStore)


interface ChangeEvent extends Event {
  added: {
    element: FormItemMeta;
    newIndex: number;
  };
  moved: {
    element: FormItemMeta;
    newIndex: number;
    oldIndex: number;
  };
}
/**
 * @description drop handle.
 * set current currentFormItem when drop.
*/
const handleDropChange = (e: ChangeEvent) => {
  console.log(e);
  
  const { added } = e
  if (added) {
    const {element, newIndex} = added
    setCurrentFormItem(element)
  }
}

const handleFormItemClick = (element: FormItemMeta) => {
  setCurrentFormItem(element)
}


/**
 * @description copy
 * 1. deep clone formItem
 * 2. push into formItemList
 * 3. set focus
*/
const handleCopyFormItem = (element: FormItemMeta) => {
  const id = getId()
  const newFormItem = {...element, id, prop: element.type+id}
  setFormItem(newFormItem, formItemList.value.length)
  setCurrentFormItem(newFormItem)
}
const handleDeleteFormItem = (element: FormItemMeta) => {
  const index = formItemList.value.findIndex(item => item.id==element.id)
  deleteFormItem(element.id)
  if (formItemList.value.length-1 >= index) {
    setCurrentFormItem(formItemList.value[index])
  } else {
    setCurrentFormItem(formItemList.value[index-1])
  }
}



/** method */
/**
 * get vue component prop
 * @param propName
 * @param option
 */
function getProp(propName: string, option: Record<string, any>={}):any {

}

function getItemKey(element: FormItemMeta) {
  // console.log(element);
  // return element.label + Date.now()
}

/** @description get component to be render */
function getFormItemComponent(type: string) {
  /* 组件映射 */
  const compTypeMap: Record<string, string> = {
    'date': 'date-picker', // FIXME:bug
    'password': 'input'
  }
  type = compTypeMap[type] ?? type
  return `el-${type}`
}

/**
 * https://element-plus.org/zh-CN/component/input.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * element ui input has "formatter" prop, so need to delete "formatter" prop to avoid collide
 * @param element
 */
function getFormItemProps(element: FormItemMeta) {
  // const {formatter, ...formCol} = element
  // return formCol
  return element
}
</script>

<style scoped lang="scss">
.el-row {
  margin: 0 !important;
}
/** mask */
.form-item {
  &:hover {
    background-color: var(--el-color-primary-light-9);
  }
  &:after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: block;
    z-index: 1001;
  }
  &.form-item-active {
    border-left: 2px solid var(--el-color-primary);
    background-color: var(--el-color-primary-light-8);
  }
}
.ghost-class {
  border-Top: 2px solid var(--el-color-primary);
}
</style>
