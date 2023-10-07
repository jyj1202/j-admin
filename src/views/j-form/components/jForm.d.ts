import type { FormItemRule } from 'element-plus'
import type { CommonOption, DicData } from "@/typings/common";

export interface JFormOptionType extends CommonOption {
  labelWidth?: string|number;
  labelPosition?: 'left'|'right'|'top';
  column: JFormColumn[];
  submitBtn?: boolean;
  emptyBtn?: boolean;
}

export interface JFormColumn {
  label: string;
  prop: string;
  type?: string;
  placeholder?: string;
  rules?: global.Arrayable<FormItemRule>;
  span?: number;
  min?: number;
  max?: number;
  data?: unknown;
  inlinePrompt?: boolean;
  activeIcon?: string;
  inactiveIcon?: string;
  formatTooltip?: Function;
  dicData?: DicData;
}
