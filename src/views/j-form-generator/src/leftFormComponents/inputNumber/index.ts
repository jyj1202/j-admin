import type { FormComponentMeta } from "@/views/j-form-generator/src/typings";


const inputNumberMeta: FormComponentMeta = {
  label: 'Input Number',
  type: 'inputNumber',
  option: [{
    label: 'step',
    prop: 'step',
    type: 'input-number',
    span: 24,
  }, {
    label: 'step strictly',
    prop: 'stepStrictly',
    type: 'switch',
    span: 24,
  }, {
    label: 'controls position',
    prop: 'controlsPosition',
    type: 'select',
    span: 24,
    dicData: [{
      label: 'right',
      value: 'right'
    }, {
      label: '',
      value: ''
    }]
  }]
}

export default inputNumberMeta
