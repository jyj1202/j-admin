<template>
  <JForm
    class="mt-5"
    v-model="formData"
    :option="formOption"
  >

  </JForm>
</template>

<script setup lang="ts">
/*
  label
  label-position
  span
  default value
  disable
  hide
  require
*/
import { reactive, ref } from "vue";
import JForm from "@/views/j-form/components/JForm.vue";
import type { JFormOptionType } from "@/views/j-form/components/jForm.d";

const formData = ref({})
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
    span: 24,
  }, {
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
  }, {
    label: 'span',
    prop: 'span',
    type: 'input-number',
    span: 24,
  }, {
    label: 'disable',
    prop: 'disable',
    type: 'switch',
    span: 24,
  }, {
    label: 'display',
    prop: 'display',
    type: 'switch',
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
  },]
})

</script>

<style scoped>

</style>
