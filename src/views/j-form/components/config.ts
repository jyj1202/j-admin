import type { JFormOptionType } from "./jForm.d";
export const defaultConfig: Record<keyof Omit<JFormOptionType, 'column'>, any> = {
  size: 'default',
  labelWidth: 130,
  labelPosition: 'left',
  labelSuffix: '',
  // gutter: 30,
  span: 12,
  type: 'input',
  menuBtn: true,
  submitBtn: true,
  emptyBtn: true,
  submitText: 'Submit',
  emptyText: 'Reset',
}
