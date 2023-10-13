/** 表单组件元数据 */
import type { JFormColumn } from "@/views/j-form/components/jForm.d";

export interface FormComponentMeta {
  label: string;
  type?: string;
  icon?: string;
  labelWidth?: number;
  option?: JFormColumn[];
}
