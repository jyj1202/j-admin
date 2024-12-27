<template>
  <div>
    <SnakeGraph
      class="snake-graph space-y-14"
      :cb="cb"
      :source-data="sourceData"
    >
      <template #default="{data}">
        <RowItem v-for="(row, rowIndex) in data" :key="rowIndex" :row-index="rowIndex">
          <ColumnItem
            class="item rounded-md p-5"
            v-for="(col, colIndex) in row"
            :key="`${rowIndex}${colIndex}`"
            :col-index="colIndex"
            :row-index="rowIndex"
            :row-count="row.length"
            :total="data.length"
          >
            <template #horizontalArrow>
              <SvgIcon name="arrow" class="arrow arrow-horizontal"></SvgIcon>
            </template>
            <template #verticalArrow>
              <SvgIcon name="arrow" class="arrow arrow-vertical"></SvgIcon>
            </template>
            <div>{{ rowIndex+1 }}{{ colIndex+1 }} {{ col.label }}</div>
          </ColumnItem>
        </RowItem>
      </template>
    </SnakeGraph>
  </div>
</template>

<script setup lang="ts">
import { SnakeGraph, RowItem, ColumnItem } from "./components";

const cb = (containerWidth: number, reSize: (colNum: number) => void) => {
  const colNum = Math.max(Math.floor(containerWidth / 150), 1)
  reSize(colNum)
}

const sourceData = Array.from({ length: 10 }).map((i, index) => ({
  label: index + 1 + 'item' 
}))

</script>

<style scoped>
.item {
  --arrow-width: 2rem;
  --arrow-height: 2rem;
  --arrow-gap-horizontal: 0.8rem;
  --arrow-gap-vertical: 0.8rem;
  --border-color: var(--el-color-primary-light-5);
  position: relative;
  border: 1px solid var(--border-color);
  background-color: var(--el-color-primary-light-9);
  text-align: center;
}
.arrow {
  width: var(--arrow-width);
  height: var(--arrow-height);
  color: var(--border-color);
  position: absolute;
}
.arrow-horizontal {
  right: calc(-1 * var(--arrow-width) - var(--arrow-gap-horizontal));
  top: 50%;
  margin-top: calc(-1 * var(--arrow-height) / 2);
}
.arrow-vertical {
  right: 50%;
  bottom: calc(-1 * var(--arrow-height) - var(--arrow-gap-vertical));
  transform: rotate(90deg) translateY(-50%);
}
</style>
