<template>
  <!-- FIXME:ts error implicit any-->
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
      <template v-if="!column.children">
        <slot :name="`${column.prop}`" v-bind="{row, column, size: defaultConfig.size}">
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
      </template>
      <!-- <component v-else :is="JColumn" :columns="column.children"></component> -->
      <JColumn v-else :columns="column.children">
        <template v-for="(val, key) in getColumnSlots" :key="key" #[key]="scope">
          <slot :name="key" v-bind="scope"></slot>
        </template>
      </JColumn>
    </template>
  </el-table-column>
</template>

<script setup lang="ts" name="Column">
import type { JCrudColumn, DicData } from "@/views/j-crud/components/jCrud";
import { defaultConfig } from "../config";
import { inject, type ComputedRef } from "vue";
import { getPropKey, getColumnSlotsKey } from "../utils/keys";
import JColumn from "./JColumn.vue";


/** inject getProp method FIXME: ts type */
const getProp = inject<Function>(getPropKey)!
const getColumnSlots = inject<ComputedRef<Record<string, Function>>>(getColumnSlotsKey)!

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
