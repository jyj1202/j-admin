import type { FormComponentMeta } from "@/views/j-form-generator/src/typings";


const switchMeta: FormComponentMeta = {
  label: 'Switch',
  type: 'switch',
  option: [
  // {
  //   label: 'activeIcon',
  //   prop: 'activeIcon',
  //   type: 'select',

  // },
    {
      label: 'activeText',
      prop: 'activeText',
      type: 'input',
      span: 24
    },
    {
      label: 'inactiveText',
      prop: 'inactiveText',
      type: 'input',
      span: 24
    }
  ]
}

export default switchMeta
