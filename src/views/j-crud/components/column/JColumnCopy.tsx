import { defineComponent, inject, onMounted, type Ref } from 'vue'
import Sortable, { type SortableEvent } from 'sortablejs'
import { type TableInstance } from "element-plus";
import type { JCrudColumn, DicData } from "@/views/j-crud/components/jCrud";
import { getPropKey, JCrudOptionKey, getElTableRefKey, getEmitKey } from "../utils/keys";
import { defaultConfig } from "../config";

/**
 * setup 函数的第一个参数是组件的 props。
 * 和标准的组件一致，一个 setup 函数的 props 是响应式的，并且会在传入新的 props 时同步更新。
 */
export default defineComponent( (props: { columns: JCrudColumn[]}, context) => {
    /** 该上下文对象是非响应式的，可以安全地解构： */
    const { slots } = context /** attrs, slots, emit, expose */
    const getProp = inject(getPropKey)!
    const option = inject(JCrudOptionKey)!
    const elTableRef = inject(getElTableRefKey)!
    const parentEmit = inject(getEmitKey)!

    onMounted(() => {
      const tbody = elTableRef.value!.$el.querySelectorAll('.el-table__body-wrapper table tbody')[0]
      setSort(tbody)
    })
    

    function setSort(el: HTMLElement) {
      if (!el) return
      rowDrop(el)
      // columnDrop()
    }

    function rowDrop(el: HTMLElement) {
      tableDrop(el, evt => {
        const { oldIndex, newIndex } = evt
        parentEmit('sortable-change', oldIndex, newIndex)
        // const oldIndex = evt.oldIndex;
        // const newIndex = evt.newIndex;
        // const targetRow = list.splice(oldIndex, 1)[0]
        // list.splice(newIndex, 0, targetRow)
        // $emit('sortable-change', oldIndex, newIndex)
        // refreshTable(() => this.rowDrop())

      })
    }

    function tableDrop (el: HTMLElement, cb: (evt: SortableEvent) => void) {
      if (!option.sortable) return
      Sortable.create(el, {
        ghostClass: 'j-ghost',
        chosenClass: 'j-ghost',
        animation: 500,
        delay: 0,
        onEnd: evt => cb(evt)
      })
    }
    
    const getDefaultCell = (column: JCrudColumn, row: any) => {
      if (column.html) {
        return <span innerHTML={getCellValue(row, column)}></span>
      } else if (column.cell === true) {
        return getCellValue(row, column) /** TODO: */
      } else {
        return getCellValue(row, column)
      }
    }

    /**
     * @method 获取cell值(处理格式化、数据字典、数组join等)
     */
    function getCellValue (row: Record<string, any>, col: JCrudColumn ): string|undefined {
      const {prop, formatter, dicData} = col
      const cellVal = row[prop]

      if (dicData) {
      /** 处理有字典 */
        /** 格式化 */
        if (formatter) return formatter(row, cellVal, getDicLabel(cellVal, dicData), col)
        /** 处理cell值是数组情况 */
        if(cellVal instanceof Array) 
        return cellVal.map((i:any) => getDicLabel(i, dicData)).join(' | ')

        return getDicLabel(cellVal, dicData)
    } else {
      /** 处理没有字典 */
        if (formatter)
          return formatter(row, cellVal, cellVal, col)
        if(cellVal instanceof Array)
          return cellVal.join(' | ')

        return cellVal
      }
    }
    /**
     * @method 获取数据字典映射label
     */
    function getDicLabel(value:unknown, dicData:DicData):string|undefined {
      let label = dicData.find(i=> i.value==value)?.label
      if (label) return label
      // throw new Error("JCrud: can not find matched cell label in column's dicData");
    }

    const getRender = (columns: JCrudColumn[]) => {
      return columns.map(column => {
        return (
          <el-table-column
            key={column.prop}
            label={column.label}
            prop={column.prop}
            width={column.width}
            fixed={column.fixed}
            align={getProp('align', column)}
            show-overflow-tooltip={getProp('overHidden', column)}
            resizable
            sortable={getProp('sortable', column)}
            v-slots={{
              default: (scoped: any) => {
                if (scoped && !column.children) {
                  const { row } = scoped
                  return slots[column.prop] ? slots[column.prop]!({row, column, size: defaultConfig.size}) : getDefaultCell(column, row)
                } else {
                  return getRender(column.children!)
                }
              }
            }}
          >
          </el-table-column>
        )
      })
    }

    return () => (
      <>
        { getRender(props.columns) }
      </>
    )
  },
  // 目前仍然需要手动声明运行时的 props
  {
    props: ['columns'],
    // emits: {
    //   'sortable-change': (oldIndex: number|undefined, newIndex: number|undefined) => void
    // }
  }
)
