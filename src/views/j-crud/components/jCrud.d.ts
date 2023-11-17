import type { CommonOption, DicData } from "@/typings/common";
import { JFormColumn } from "@/views/j-form/components/jForm";

export interface JCrudOptionType<T= any> extends CommonOption  {
  column: JCrudColumn<T>[];
  stripe?: boolean;
  border?: boolean;
  menuWidth?: string | number;
  editBtn?: boolean;
  editBtnText?: string;
  editBtnIcon?: string;
  delBtn?: boolean;
  delBtnText?: string;
  delBtnIcon?: string;
  index?: boolean;
  indexLabel?: string;
  selection?: boolean;
  header?: boolean;
  defaultSort?: {
    prop: string;
    order: 'descending'|'ascending'
  }
}

/** T: type of row */
export interface JCrudColumn<T= any> extends JFormColumn {
  children?: JCrudColumn<T>[];
  width?: string | number;
  fixed?: boolean;
  align?: 'left'|'center'|'right';
  html?: boolean;
  cell?: boolean;
  dicData?: DicData;
  formatter?: (row: T, value: any, label: string|undefined, column: JCrudColumn) => string|undefined;
  type?: string;
  search?: boolean;
  sortable?: boolean|'custom';
}

export {DicData}

export interface PageOption {
  /** 总条数,如果为0的话不显示分页 */
  total?: number;
  /** 当前页数 */
  currentPage?: number;
  /** 是否为分页按钮添加背景色 */
  background?: boolean;
  /** 每页显示条目个数，支持.sync修饰符 */
  pageSize?: number;
  /** 分页的数组分段 */
  pageSizes?: number[];
  /** 页码按钮的数量，当总页数超过该值时会折叠 */
  pagerCount?: number;
}
