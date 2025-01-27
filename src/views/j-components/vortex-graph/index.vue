<template>
  <div>
    <VortexGraph
      class="vortex-graph space-y-14"
      :on-size-change="cb"
      :source-data="sourceData"
    >
      <template #default="{data}">
        <RowItem v-for="(row, rowIndex) in data" :key="rowIndex">
          <template
            v-for="(col, colIndex) in row"
            :key="`${rowIndex}${colIndex}`"
          >
            <ColumnItem
              class="item rounded-md p-5"
              :class="{'empty': !col}"
              :col-index="colIndex"
              :row-index="rowIndex"
              :row-count="row.length"
              :total="data.length"
            >
              <template v-if="col">
                <SvgIcon v-if="col.direction == 'right'" name="arrow" class="arrow arrow-right"></SvgIcon>
                <SvgIcon v-if="col.direction == 'left'" name="arrow" class="arrow arrow-left"></SvgIcon>
                <SvgIcon v-if="col.direction == 'down'" name="arrow" class="arrow arrow-down"></SvgIcon>
                <SvgIcon v-if="col.direction == 'up'" name="arrow" class="arrow arrow-up"></SvgIcon>
                <div>row: {{ rowIndex+1 }} col: {{ colIndex+1 }} <br> {{ col.value.label }}</div>
              </template>
            </ColumnItem>
          </template>
        </RowItem>
      </template>
    </VortexGraph>
  </div>
</template>

<script setup lang="ts">
import { VortexGraph, RowItem, ColumnItem } from "./components";

const cb = (containerWidth: number, reSize: (colNum: number) => void) => {
  const colNum = Math.max(Math.floor(containerWidth / 150), 1)
  reSize(colNum)
}

const sourceData = Array.from({ length: 30 }).map((i, index) => ({
  label: 'item: ' + (index + 1)
}))

</script>

<style scoped>
.item:not(.empty) {
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
.arrow-right {
  right: calc(-1 * var(--arrow-width) - var(--arrow-gap-horizontal));
  top: 50%;
  margin-top: calc(-1 * var(--arrow-height) / 2);
}
.arrow-left {
  left: calc(-1 * var(--arrow-width) - var(--arrow-gap-horizontal));
  top: 50%;
  margin-top: calc(-1 * var(--arrow-height) / 2);
  transform: scaleX(-1);
}
.arrow-down {
  right: 50%;
  bottom: calc(-1 * var(--arrow-height) - var(--arrow-gap-vertical));
  transform: rotate(90deg) translateY(-50%);
}
.arrow-up {
  right: 50%;
  top: calc(-1* var(--arrow-height) - var(--arrow-gap-vertical));
  transform: rotate(-90deg) translateY(50%);
}
</style>
