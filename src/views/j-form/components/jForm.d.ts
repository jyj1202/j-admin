import type { FormItemRule, UploadProps } from 'element-plus'
import type { CommonOption, DicData } from "@/typings/common";

export interface JFormOptionType extends CommonOption {
  column: JFormColumn[];
  labelWidth?: string|number;
  labelPosition?: 'left'|'right'|'top';
  labelSuffix?: string;
  menuBtn?: boolean;  /** 表单操作栏是否显示 */
  submitBtn?: boolean;
  submitText?: string;
  emptyBtn?: boolean;
  emptyText?: string;
  type?: string; /** 默认表单item组件 */
  span?: number; /** 默认表单item栅格占据的列数 */
}

/** upload */
type SelectableUploadProps = Partial<UploadProps>

export interface JFormColumn extends SelectableUploadProps {
  /** common */
  label: string;
  prop: string; /** 不可重复 */
  type?: string;
  labelWidth?: number;
  placeholder?: string;
  size?: 'large'|'default'|'small';
  span?: number;
  data?: unknown;
  rules?: global.Arrayable<FormItemRule>;
  inlinePrompt?: boolean;
  component?: string|object;  /** 动态组件 */
  disabled?: boolean;
  display?: boolean;
  /** input */
  showPassword?: boolean;
  max?: number;
  autosize?: boolean;
  clearable?: boolean;
  /** input-number */
  step?: number;
  min?: number;
  stepStrictly?: boolean;
  controlsPosition?: ''|'right';
  /** select */
  multiple?: boolean;
  dicData?: DicData;
  /** switch */
  activeIcon?: string;
  inactiveIcon?: string;
  activeText?: string;
  inactiveText?: string;
  /** checkbox Radio */
  border?: boolean;
  /** slide */
  formatTooltip?: Function;
  /** rate */
  allowHalf?: boolean;
}
