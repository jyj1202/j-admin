import type { FormComponentMeta } from "@/views/j-form-generator/src/typings";


const inputMeta: FormComponentMeta = {
  label: 'input',
  type: 'input',
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
  }]
}

export default inputMeta
