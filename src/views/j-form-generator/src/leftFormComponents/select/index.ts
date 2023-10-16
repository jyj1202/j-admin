import { markRaw } from "vue";
import DicSetting from "../DicSetting.vue";
import type { FormComponentMeta } from "@/views/j-form-generator/src/typings";


const selectMeta: FormComponentMeta = {
  label: 'Select',
  type: 'select',
  dicData: [{
    label: 'label1',
    value: 'value1'
  }],
  option: [{
    label: 'placeholder',
    prop: 'placeholder',
    type: 'input',
    span: 24,
  }, {
    label: 'clearable',
    prop: 'clearable',
    type: 'switch',
    span: 24,
  }, {
    label: 'multiple',  // FIXME: multiple bug
    prop: 'multiple',
    type: 'switch',
    span: 24
  }, {
    label: 'dic data(value unique)',
    prop: 'dicData',
    component: markRaw(DicSetting),
    span: 24
  }]
}

export default selectMeta
