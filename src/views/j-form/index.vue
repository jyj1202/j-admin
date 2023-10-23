<template>
  <div class="p-5 page-card">
    <el-alert title="🤡 二次封装el-form组件，实现传入配置生成表单。" type="success" :closable="false"/>
    <JForm
      ref="formRef"
      class="mt-5"
      v-model="formData"
      :option="formOption"
      @submit="handleSubmit"
    >
      <template #uploadDefault>
        <el-icon><Plus /></el-icon>
      </template>
    </JForm>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import JForm from "./components/JForm.vue";
import type { JFormOptionType } from "./components/jForm.d";
import { toRaw } from "vue";
import { ElMessage } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'

const formData = ref({
  'input-number': 1,
  input: 'default value'
})
const formRef = ref<InstanceType<typeof JForm> | null>(null)

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
])
const dialogVisible = ref(false)
const dialogImageUrl = ref('')
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
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
    span: 12,
  }, {
    label: 'password',
    prop: 'password',
    type: 'password',
    showPassword: true,
    span: 12
  }, {
    label: 'select',
    prop: 'select',
    type: 'select',
    multiple: true,
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
    prop: 'radioGroup',
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
  }, {
    label: 'upload',
    prop: 'upload',
    type: 'upload',
    span: 24,
    action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
    multiple: true,
    listType: "picture-card",
    fileList: fileList,
    onPreview: handlePictureCardPreview
  }]
})

const handleSubmit = (form: object, done: Function) => {
  // console.log(formRef.value!.$refs.uploadRef[0].elUploadRef.submit);
  console.log(form, done);
  console.log(toRaw(formData.value));
  console.log(toRaw(formData.value) === form) // true
  ElMessage.success(JSON.stringify(form))
}

</script>
