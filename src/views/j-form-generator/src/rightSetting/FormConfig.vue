<template>
  <JForm
    :model-value="formGeneratorStore.currentFormOption"
    :option="formOption"
    @update:model-value="handleUpdate"
  >

  </JForm>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import JForm from "@/views/j-form/components/JForm.vue";
import type { JFormOptionType } from "@/views/j-form/components/jForm.d";
import { useFormGeneratorStore } from "@/stores/modules/formGenerator";


const formGeneratorStore = useFormGeneratorStore()
const { pushHistory } = formGeneratorStore

const formOption = reactive<JFormOptionType>({
  labelWidth: 100,
  labelPosition: 'left',
  labelSuffix: '',
  size: 'default',
  menuBtn: false,
  // disabled: false,
  column: [{
    label: 'label width',
    prop: 'labelWidth',
    type: 'input-number',
    min: 1,
    span: 24,
  },
  {
    label: 'label position',
    prop: 'labelPosition',
    type: 'select',
    span: 24,
    placeholder: 'select label position',
    dicData: [{
      label: 'left',
      value: 'left'
    }, {
      label: 'right',
      value: 'right'
    }, {
      label: 'top',
      value: 'top'
    }]
  },
  {
    label: 'label suffix',
    prop: 'labelSuffix',
    type: 'input',
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
    label: 'menuBtn',
    prop: 'menuBtn',
    type: 'switch',
    span: 24,
  }, {
    label: 'submitBtn',
    prop: 'submitBtn',
    type: 'switch',
    span: 24,
  }, {
    label: 'submitText',
    prop: 'submitText',
    type: 'input',
    span: 24,
  }, {
    label: 'emptyBtn',
    prop: 'emptyBtn',
    type: 'switch',
    span: 24,
  }, {
    label: 'emptyText',
    prop: 'emptyText',
    type: 'input',
    span: 24,
  },
  // {
  //   label: 'disabled',
  //   prop: 'disabled',
  //   type: 'switch',
  //   span: 24,
  // },
  // {
  //   label: 'display',
  //   prop: 'display',
  //   type: 'switch',
  //   span: 24,
  // }, {
  //   label: 'required',
  //   prop: 'required',
  //   type: 'switch',
  //   span: 24,
  // },
  ]
})

const handleUpdate = (newVal: any) => {
  Object.keys(newVal).forEach(key => {
    (formGeneratorStore.currentFormOption as any)[key] = newVal[key]
  })
  pushHistory()
}

</script>

<style scoped>

</style>
