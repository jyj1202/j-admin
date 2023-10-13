import { markRaw } from "vue";
import DicSetting from "./DicSetting.vue";
import type { FormComponentMeta } from "@/views/j-form-generator/src/formComponents/type.d";


const selectMeta: FormComponentMeta = {
  label: 'Select',
  type: 'select',
  labelWidth: 100,
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
    label: 'multiple',
    prop: 'multiple',
    type: 'switch',
    span: 24
  }, {
    label: 'dic data',
    prop: 'dicData',
    component: markRaw(DicSetting),
    span: 24
  }]
}

export default selectMeta
