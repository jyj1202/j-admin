import { markRaw } from "vue";
import DicSetting from "../DicSetting.vue";
import type { FormComponentMeta } from "@/views/j-form-generator/src/typings";
import JMonacoEditor from "@/components/JMonacoEditor.vue";


const uploadMeta: FormComponentMeta = {
  label: 'base upload',
  type: 'upload',
  headers: [],
  // class: 'h-10',
  option: [{
    label: 'action',
    prop: 'action',
    type: 'input',
    span: 24,
  }, {
    label: 'requestMethod',
    prop: 'method',
    type: 'select',
    placeholder: 'default: post',
    span: 24,
    dicData: [{
      label: 'post',
      value: 'post',
    }, {
      label: 'get',
      value: 'get',
    }]
  }, {
    label: 'accept',
    prop: 'accept',
    type: 'input',
    span: 24,
  }, {
    label: 'file field name',
    prop: 'name',
    type: 'input',
    span: 24,
  }, {
    label: 'list type',
    prop: 'list type',
    type: 'select',
    span: 24,
    dicData: [{
      label: 'text',
      value: 'text',
    }, {
      label: 'picture',
      value: 'picture',
    }, {
      label: 'picture-card',
      value: 'picture-card',
    }]
  }, {
    label: 'limit',
    prop: 'limit',
    type: 'input-number',
    min: 1,
    span: 24
  }, {
    label: 'multiple file',
    prop: 'multiple',
    type: 'switch',
    span: 24,
  }, {
    label: 'show file list',
    prop: 'showFileList',
    type: 'switch',
    span: 24,
  }, {
    label: 'drag',
    prop: 'drag',
    type: 'switch',
    span: 24,
  }, {
    label: 'request header',
    prop: 'headers',
    component: markRaw(DicSetting),
    span: 24
  }, {
    label: 'request header',
    prop: 'beforeUpload',
    component: markRaw(JMonacoEditor),
    span: 24,
  }]
}

export default uploadMeta
