<template>
  <el-table-column
    v-for="column in columns"
    :key="column.prop"
    :label="column.label"
    :prop="column.prop"
    :width="column.width"
    :fixed="column.fixed"
    :align="getProp('align', column)"
    :show-overflow-tooltip="getProp('overHidden', column)"
    resizable
  >
    <template #default="{row}">
      <slot v-if="!column.children" :name="`${column.prop}`" v-bind="{row, column, size: defaultConfig.size}">
        <!-- html -->
        <template v-if="column.html">
          <span v-html="getCellValue(row, column)"></span>
        </template>
        <!-- cell edit -->
        <template v-else-if="column.cell===true">
        </template>
        <!-- default -->
        <template v-else>
          {{getCellValue(row, column)}}
        </template>
      </slot>
      <Column
        v-else
        :columns="column.children"
      >
      </Column>
    </template>
  </el-table-column>
</template>

<script setup lang="ts" name="Column">
import type { JCrudColumn, DicData } from "@/views/j-crud/components/jCrud";
import { defaultConfig } from "../config";
import { inject } from "vue";
import { getPropFnKey } from "../utils/keys";


/** inject getProp method FIXME: ts type */
const getProp = inject<Function>(getPropFnKey)!

interface JCrudColumnProp {
  columns: JCrudColumn[];
}
const props = defineProps<JCrudColumnProp>()

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

</script>

<style scoped>

</style>
