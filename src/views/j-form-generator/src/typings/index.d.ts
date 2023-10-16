import type { JFormColumn, JFormOptionType } from "@/views/j-form/components/jForm.d";

/** 左侧表单组件元数据类型 */
export interface FormComponentMeta extends JFormColumn {
  /** override JFormColumn.prop, because FormComponentMeta doesn't need prop, FormComponent instance need this */
  prop?: string;
  /** add icon */
  icon?: string;
  /** add FormComponent's unique Prop Config Form Option */
  option?: JFormColumn[];
}

/** 中间表单项元数据类型 */
export interface FormItemMeta extends FormComponentMeta {
  /** id and prop is required */
  id: string;
  prop: string;
}

export interface FormOption extends JFormOptionType {
  /** override column */
  column: FormItemMeta[]
}
