export interface columnItem {
  label: string;
  prop: string;
  type: string;
  span?: number;
  dicData?: Array<{
    label: string,
    value: string|number|object
  }>;
}

export interface OptionType {
  labelWidth?: string|number;
  column: columnItem[];
}
