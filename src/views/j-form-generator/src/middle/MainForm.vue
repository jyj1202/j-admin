<template>
  <el-form class="h-full"
    ref="formRef"
    :size="currentFormOption.size"
    :label-width="currentFormOption.labelWidth"
    :label-position="currentFormOption.labelPosition"
    @click="handleFormClick"
  >
    <el-row class="h-full">
      <Draggable
        class="flex items-start content-start flex-wrap h-full w-full overflow-hidden"
        :list="currentFormOption.column"
        :group="{ name: 'form' }"
        item-key="id"
        ghost-class="ghost-class"
        :animation="300"
        @change="handleDragChange"
      >
        <template #item="{element}">
          <el-col
            class="form-item px-3 pt-2 relative cursor-move"
            :class="{'form-item-active': element.id==currentFormItem?.id}"
            :span="element.span"
            @click.stop="handleFormItemClick(element)"
          >
            <el-form-item
              :label="element.label"
              :label-width="`${element.labelWidth}px`"
              :prop="element.prop"
              :rules="element.rules"
            >
              <component
                :is="getFormItemComponent(element.type)"
                v-bind="getFormComponentProps(element)"
              >
                <template v-if="!element.component && getSlotComponent(element.type)">
                  <!-- 当同时使用时，v-if 比 v-for 优先级更高。我们并不推荐在一元素上同时使用这两个指令 -->
                  <template v-if="element.dicData">
                    <component
                      v-for="dicData in element.dicData"
                      :key="dicData.value"
                      :is="getSlotComponent(element.type)"
                      v-bind="dicData"
                    />
                  </template>
                </template>
              </component>
            </el-form-item>
            <el-button class="absolute bottom-0 right-12 z-10" size="default" plain type="primary" icon="CopyDocument" circle
              @click.stop="handleCopyFormItem(element)"
            />
            <el-button class="absolute bottom-0 right-3 z-10" size="default" plain type="danger" icon="Delete" circle
              @click.stop="handleDeleteFormItem(element)"
            />
          </el-col>
        </template>
      </Draggable>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { storeToRefs } from 'pinia'
import Draggable from 'vuedraggable'
import { getId } from "@/utils";
import type { FormItemMeta } from '@/views/j-form-generator/src/typings'
import { useFormGeneratorStore } from "@/stores/modules/formGenerator";
import { getComponentType as getFormItemComponent, getSlotComponent } from "@/utils/form";


const formGeneratorStore = useFormGeneratorStore()
const {
  setCurrentFormItem, setFormItem, deleteFormItem,
  pushHistory
} = formGeneratorStore
const { currentFormItem, currentFormOption } = storeToRefs(formGeneratorStore)

pushHistory() /** push init state into history */
const formData = reactive({})


interface ChangeEvent extends Event {
  added?: {
    element: FormItemMeta;
    newIndex: number;
  };
  moved?: {
    element: FormItemMeta;
    newIndex: number;
    oldIndex: number;
  };
}
/**
 * @description drop handle.
 * set current currentFormItem.
 * set current formOption.
*/
const handleDragChange = (e: ChangeEvent) => {
  console.log(e);
  
  const { added, moved } = e
  if (added) {
    const {element, newIndex} = added
    // console.log(element == currentFormOption.value.column[newIndex]); // false
    /** make currentFormItem==currentFormOption.value.column[newIndex] */
    setCurrentFormItem(currentFormOption.value.column[newIndex])
  }
  if (moved) {
    const {newIndex, oldIndex} = moved
  }
  /**
   * since drag event modify store's currentFormOption.column directly
   * instead of use store's setFormItem action,
   * drag event need to push history and backward pinter manually.
  */
  pushHistory()
}

const handleFormItemClick = (element: FormItemMeta) => {
  setCurrentFormItem(element)
}


/**
 * @description copy
 * 1. deep clone formItem
 * 2. push into currentFormOption.value.column
 * 3. set focus
*/
const handleCopyFormItem = (element: FormItemMeta) => {
  const id = getId()
  /** need deep clone */
  const newFormItem = {...element, id, prop: element.type+id}
  setFormItem(newFormItem, currentFormOption.value.column.length)
  setCurrentFormItem(newFormItem)
}
const handleDeleteFormItem = (element: FormItemMeta) => {
  const index = currentFormOption.value.column.findIndex(item => item.id==element.id)
  deleteFormItem(element.id)
  if (currentFormOption.value.column.length-1 >= index) {
    setCurrentFormItem(currentFormOption.value.column[index])
  } else {
    setCurrentFormItem(currentFormOption.value.column[index-1])
  }
}

const handleFormClick = () => {
  setCurrentFormItem(undefined)
}

/** method */

/**
 * https://element-plus.org/zh-CN/component/input.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * element ui input has "formatter" prop, so need to delete "formatter" prop to avoid collide
 * @param element
 */
function getFormComponentProps(element: FormItemMeta) {
  // const {formatter, ...formCol} = element
  // return formCol
  const { id, option, icon, ...compProps } = element
  return compProps
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
  border-top: 2px solid var(--el-color-primary);
}
</style>
