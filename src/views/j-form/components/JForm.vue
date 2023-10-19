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
    :label-suffix="getProp('labelSuffix')"
    @submit.prevent
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
        <slot :name="col.prop" v-bind="{col, size: getProp('size', col)}">
          <component
            :is="getComponentType(col, getProp('type', col))"
            v-model="formData[col.prop]"
            v-bind="getComponentProps(col)"
            :key="col.prop"
            @change="handleFormItemValueChange"
          >
            <template v-if="!col.component && getSlotComponent(getProp('type', col))">
              <component
                v-for="dicData in col.dicData"
                :key="dicData.value"
                :is="`el-${getSlotComponent(getProp('type', col))}`"
                v-bind="dicData"
              />
            </template>
          </component>
        </slot>
      </el-form-item>
    </el-col>
  </el-row>
    <el-form-item v-if="getProp('menuBtn')">
      <el-button v-if="getProp('submitBtn')" type="primary" @click="handleSubmit()">{{ getProp('submitText') }}</el-button>
      <el-button v-if="getProp('emptyBtn')" @click="handleReset()">{{ getProp('emptyText') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="JForm">
import { reactive, toRaw, watch, computed, ref } from "vue";
import type { JFormOptionType, JFormColumn } from "./jForm.d";
import { defaultConfig } from "./config";
import type { FormInstance } from 'element-plus'

type FormDataType = Record<string, unknown>
/* prop and emit */
interface JFormProps {
  option: JFormOptionType;
  modelValue: FormDataType
}
const props = defineProps<JFormProps>()
const emit = defineEmits<{
  submit: [form: {}, done: Function]
  'update:model-value': [value: FormDataType]
}>()

/* 表单数据 */
const formData = reactive<FormDataType>({})
watch(()=> props.modelValue, (newVal) => {
  setFormData()
}, {
  immediate: true
})
function setFormData() {
  /* Object.keys do not traverse the prototype */
  Object.keys(props.modelValue).forEach(key => {
    /** set or update old formData's key */
    formData[key] = props.modelValue[key]
  })
  
  /** delete old formData's keys which new modelValue doesn't exists */
  const deletedKeys = getDeletedKeys(formData, props.modelValue)
  deletedKeys.forEach(key=> {
    delete formData[key]
  })
}
/** @description get keys that need to delete when toggle row form */
function getDeletedKeys(oldObj:object, newObj:object) {
  const deletedKeys:Array<string> = [];
  const newKeys = Object.keys(newObj)
  Object.keys(oldObj).forEach(key => {
    // if (Object.prototype.hasOwnProperty.call(oldObj, key) && !(key in newObj)) {
    if (!newKeys.includes(key)) {
      deletedKeys.push(key)
    }
  })
  return deletedKeys
}
/**
 * TODO: notice underlying problem
 * @description to realize v-model(:modelValue)
*/
// watch(formData, (newFormData) => {
//   emit('update:model-value', toRaw(newFormData))
// })
const handleFormItemValueChange = () => {
  emit('update:model-value', toRaw(formData))
}


/**@description get component to be render */
const getComponentType = (col: JFormColumn,type: string): string|object => {
  /** if col has custom component, use component */
  if (col.component) {
    return col.component
  }
  /* if col doesn't have custom component, use col's type to get form component */
  const compTypeMap: Record<string, string> = {
    'date': 'date-picker', // FIXME:bug
    'password': 'input',
    'textarea': 'input'
  }
  type = compTypeMap[type] ?? type
  return `el-${type}`
}
/**
 * https://element-plus.org/zh-CN/component/input.html#%E6%A0%BC%E5%BC%8F%E5%8C%96
 * element ui input has "formatter" prop, so need to delete "formatter" prop to avoid collide
 * @param col
 */
const getComponentProps = (col: JFormColumn) => {
  col.placeholder = `please ${getProp('type', col)} ${col.label}`
  /** FIXME: if user set formatter on column, delete it */
  const {formatter, ...otherProps} = col as any
  return otherProps
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
  propValue = option[propName] ?? props.option[propName as keyof JFormOptionType] ?? (defaultConfig as any)[propName]
  return propValue
}

const done = () => {
  
}

const rowGutter = computed((): number => {
  return 30
})

/* form ref */
const formRef = ref<FormInstance|null>(null)
/**
 * @description 提交
 */
const handleSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate((valid, fields) => {
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
 const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}

</script>

<style scoped>

</style>
