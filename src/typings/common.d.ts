export interface CommonOption {
  size?: '' | 'large' | 'default' | 'small';
}

export type DicData = Array<{
  label: string;
  value: any
}>
