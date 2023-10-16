import type { FormComponentMeta } from "@/views/j-form-generator/src/typings";


const rateMeta: FormComponentMeta = {
  label: 'Rate',
  type: 'rate',
  option: [
    {
      label: 'allowHalf',
      prop: 'allowHalf',
      type: 'switch',
      span: 24
    },
    {
      label: 'clearable',
      prop: 'clearable',
      type: 'switch',
      span: 24
    }
  ]
}

export default rateMeta
