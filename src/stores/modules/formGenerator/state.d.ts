import type { FormComponentMeta } from "@/views/j-form-generator/src/formComponents/type";

export interface FormItemMeta extends FormComponentMeta {
  id: string;
  prop: string;
  icon?: string;
  rules?: global.Arrayable<FormItemRule>;
}

export interface State {
  currentFormItem: FormItemMeta|undefined;
  formItemList: FormItemMeta[]
}
