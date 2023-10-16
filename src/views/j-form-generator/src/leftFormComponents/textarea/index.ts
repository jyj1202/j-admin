import type { FormComponentMeta } from "@/views/j-form-generator/src/typings";


const textareaMeta: FormComponentMeta = {
  label: 'textarea',
  type: 'textarea',
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
    label: 'autosize',
    prop: 'autosize',
    type: 'switch',
    span: 24,
  }]
}

export default textareaMeta
