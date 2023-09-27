<!-- 注意vue3动态组件易错点
  https://cn.vuejs.org/api/sfc-script-setup.html#using-components
-->
<template>
  <el-form
    ref="formRef"
    :model="formData"
    :size="getProp('size')"
    :label-width="getProp('labelWidth')"
    :label-position="getProp('labelPosition')"
  >
  <el-row :gutter="rowGutter">
    <el-col
      v-for="col in option.column"
      :key="col.prop"
      :span="getProp('span', col)"
    >
      <el-form-item
        :label="col.label"
        :prop="col.prop"
        :rules="col.rules"
      >
        <component
          :is="getComponentType(col.type)"
          v-model="formData[col.prop]"
          v-bind="col"
        >
          <template v-if="getSlotComponent(col.type)">
            <component
              v-for="dicData in col.dicData"
              :key="dicData.value"
              :is="`el-${getSlotComponent(col.type)}`"
              v-bind="dicData"
            />
          </template>
        </component>
      </el-form-item>
    </el-col>
  </el-row>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit(formRef)">Submit</el-button>
      <el-button @click="handleReset(formRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="JForm">
import { reactive, toRaw, watch, computed, ref } from "vue";
import type { OptionType, formDataType, ColumnItem } from "./type.d";
import { defaultConfig } from "./config";
import type { FormInstance } from 'element-plus'

/* form ref */
const formRef = ref<FormInstance>()
/* prop and emit */
interface PropsType {
  option: OptionType;
  modelValue: formDataType
}
const props = defineProps<PropsType>()
const emit = defineEmits<{
  submit: [form: {}, done: Function]
  'update:model-value': [value: formDataType]
}>()

/* 表单数据 */
const formData = reactive<formDataType>({})
for (const key in props.modelValue) {
  formData[key] = props.modelValue[key]
}

/**TODO: notice underlying problem
 * @description to realize v-model(:modelValue)
*/
watch(formData, (newFormData) => {
  emit('update:model-value', toRaw(newFormData))
})

/**@description get component to be render */
const getComponentType = (type: string) => {
  /* 组件映射 */
  const compTypeMap: Record<string, string> = {
    'date': 'date-picker' // FIXME:bug
  }
  type = compTypeMap[type] ?? type
  return `el-${type}`
}

/**
 * @description 获取组件插槽内子组件
 * @param type 
 */
const getSlotComponent = (type: string): string|undefined => {
  /* 插槽子组件映射 */
  const slotCompMap: Record<string, string> = {
    'select': 'option',
    'radio-group': 'radio',
    'checkbox-group': 'checkbox',
  }
  return slotCompMap[type]
}

/**
 * get vue component prop
 * @param propName
 * @param option
 */
const getProp = (propName: string, option: Record<string, any>={}):any => {
  let propValue
  propValue = option[propName] ?? props.option[propName as keyof OptionType] ?? defaultConfig[propName]
  return propValue
}

const done = () => {
  
}

const rowGutter = computed((): number => {
  return 30
})

/**
 * @description 提交
 */
const handleSubmit = async (formRef: FormInstance | undefined) => {
  if (!formRef) return
  await formRef.validate((valid, fields) => {
    if (valid) {
      emit('submit', toRaw(formData), done)
    } else {
      console.log('error submit!', fields)
    }
  })
}
/**
 * @description 重置
 */
 const handleReset = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.resetFields()
}

</script>

<style scoped>

</style>
