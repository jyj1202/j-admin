import { markRaw } from "vue";
import type { FormComponentMeta } from "@/views/j-form-generator/src/typings";
import DicSetting from "../DicSetting.vue";


const radioMeta: FormComponentMeta = {
  label: 'Checkbox group',
  type: 'checkbox-group',
  // border: false,
  dicData: [{
    label: 'label1',
    value: 'value1'
  }],
  option: [
  //   {
  //   label: 'border',
  //   prop: 'border',
  //   type: 'switch',
  //   span: 24
  // },
   {
    label: 'dic data(value unique)',
    prop: 'dicData',
    component: markRaw(DicSetting),
    span: 24
  }]
}

export default radioMeta
