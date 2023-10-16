<template>
  <JForm
    v-if="formGeneratorStore.currentFormItem"
    :option="formOption"
    :model-value="formGeneratorStore.currentFormItem"
    @update:model-value="handleUpdate"
  >

  </JForm>
</template>

<script setup lang="ts">
/*
  label
  span
  default value
  disable
  display
  required
*/
import { reactive } from "vue";
import JForm from "@/views/j-form/components/JForm.vue";
import type { JFormOptionType } from "@/views/j-form/components/jForm.d";
import { useFormGeneratorStore } from "@/stores/modules/formGenerator";


const formGeneratorStore = useFormGeneratorStore()
const { pushHistory } = formGeneratorStore

const formOption = reactive<JFormOptionType>({
  labelPosition: 'left',
  labelWidth: 100,
  submitBtn: false,
  emptyBtn: false,
  column: [{
    label: 'label',
    prop: 'label',
    type: 'input',
    span: 24,
    placeholder: 'label',
  }, {
    label: 'label width',
    prop: 'labelWidth',
    type: 'input-number',
    min: 1,
    span: 24,
  }, {
    label: 'span',
    prop: 'span',
    type: 'input-number',
    max: 24,
    min: 1,
    span: 24,
  }, {
    label: 'size',
    prop: 'size',
    type: 'select',
    span: 24,
    dicData: [{
      label: 'large',
      value: 'large'
    }, {
      label: 'default',
      value: 'default'
    }, {
      label: 'small',
      value: 'small'
    }]
  }, {
    label: 'disabled',
    prop: 'disabled',
    type: 'switch',
    span: 24,
  }, {
    label: 'display',
    prop: 'display',
    type: 'switch',
    span: 24,
  }, {
    label: 'required',
    prop: 'required',
    type: 'switch',
    span: 24,
  },]
})

const handleUpdate = (newVal: any) => {
  Object.keys(newVal).forEach(key => {
    // if (key in formGeneratorStore.currentFormItem!) {
      (formGeneratorStore.currentFormItem as any)[key] = newVal[key]
    // }
  })
  pushHistory()
}

</script>

<style scoped>

</style>
