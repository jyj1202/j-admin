<template>
  <div class="bg-white p-5 rounded-md shadow">
    <el-alert title="二次封装el-form组件，实现传入配置生成表单。" type="success" :closable="false"/>
    <JForm
      class="mt-5"
      v-model="formData"
      :option="formOption"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import JForm from "./components/JForm.vue";
import type { JFormOptionType } from "./components/jForm.d";
import { toRaw } from "vue";
import { ElMessage } from 'element-plus'

const formData = ref({
  'input-number': 1,
  input: 'default value'
})

const formOption = reactive<JFormOptionType>({
  labelPosition: 'left',
  column: [{
    label: 'input',
    prop: 'input',
    type: 'input',
    span: 12,
    placeholder: 'try to input something',
    rules: {
      required: true,
      message: "Please input something",
      trigger: "blur"
    }
  }, {
    label: 'input-number',
    prop: 'input-number',
    type: 'input-number',
    min: 1,
    max: 2,
  }, {
    label: 'select',
    prop: 'select',
    type: 'select',
    placeholder: 'make a selection',
    rules: [{
      required: true,
      message: "Please select something",
      trigger: "blur"
    }],
    dicData: [{
      label: 'select1',
      value: 0
    }, {
      label: 'select2',
      value: 1
    }]
  }, {
    label: 'switch',
    prop: 'switch',
    type: 'switch',
    inlinePrompt: true,
    activeIcon: "Check",
    inactiveIcon: "Close",
  }, {
    label: 'radio-group',
    prop: 'radio-group',
    type: 'radio-group',
    rules: {
      required: true,
      message: "Please select something",
      trigger: "blur"
    },
    dicData: [{
      label: 'radio1',
      value: 0
    }, {
      label: 'radio2',
      value: 1
    }]
  }, {
    label: 'checkbox-group',
    prop: 'checkbox-group',
    type: 'checkbox-group',
    dicData: [{
      label: 'checkbox1',
      value: 0
    }, {
      label: 'checkbox2',
      value: 1
    }]
  }, {
    label: 'date-picker',
    prop: 'date-picker',
    type: 'date',
    rules: {
      required: true,
      message: "Please select date",
      trigger: "blur"
    },
  }, {
    label: 'rate',
    prop: 'rate',
    type: 'rate',
  }, {
    label: 'slider',
    prop: 'slider',
    type: 'slider',
    span: 24,
    formatTooltip: (val: number) => {
      return val / 100
    },
  }, {
    label: 'transfer',// FIXME:bug
    prop: 'transfer',
    type: 'transfer',
    span: 24,
    data: ref<{
      key: number
      label: string
      disabled: boolean
    }[]>([{
      key: 1,
      label: 'option 1',
      disabled: false
    }, {
      key: 2,
      label: 'option 2',
      disabled: true
    }, {
      key: 3,
      label: 'option 3',
      disabled: false
    }, ])
  }]
})

const handleSubmit = (form: object, done: Function) => {
  console.log(form, done);
  console.log(toRaw(formData.value));
  console.log(toRaw(formData.value) === form) // true
  ElMessage.success(JSON.stringify(form))
}

</script>
./components/jForm
