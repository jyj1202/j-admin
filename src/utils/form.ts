import type { JFormColumn } from "@/views/j-form/components/jForm";


/**@description get component to be render */
export const getComponentType = (type: string, col:JFormColumn={label: '', prop: ''}): string|object => {
  /** if col has custom component, use component */
  if (col.component) {
    return col.component
  }
  /* if col doesn't have custom component, use col's type to get form component */
  const JCompTypeMap: Record<string, string> = {
    'upload': 'JUpload'
  }
  if (JCompTypeMap[type]) {
    return JCompTypeMap[type]
  }
  const elCompTypeMap: Record<string, string> = {
    'date': 'date-picker', // FIXME:bug
    'password': 'input',
    'textarea': 'input'
  }
  const compType = elCompTypeMap[type] ?? type
  return `el-${compType}`
}

/**
 * @description 获取组件插槽内子组件
 * @param type 
 */
export function getSlotComponent (type: string):string|undefined {
  /* 插槽子组件映射 */
  const slotCompMap: Record<string, string> = {
    'select': 'option',
    'radio-group': 'radio',
    'checkbox-group': 'checkbox'
  }
  return `el-${slotCompMap[type]}`
}

