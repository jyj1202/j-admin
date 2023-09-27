import type { FormItemRule } from 'element-plus'

export interface formDataType {
  [key: string]: unknown
}

export interface OptionType {
  size?: '' | 'large' | 'default' | 'small';
  labelWidth?: string|number;
  labelPosition?: 'left'|'right'|'top';
  column: ColumnItem[];
}

export interface ColumnItem {
  label: string;
  prop: string;
  type: string;
  placeholder?: string;
  rules?: Arrayable<FormItemRule>;
  span?: number;
  min?: number;
  max?: number;
  data?: unknown;
  inlinePrompt?: boolean;
  activeIcon?: string;
  inactiveIcon?: string;
  formatTooltip?: Function;
  dicData?: Array<{
    label: string,
    value: string|number|object
  }>;
}
