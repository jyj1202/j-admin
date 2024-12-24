<template>
  <div :key="`${rowIndex}${colIndex}`" class="item rounded-md p-5">
    <slot></slot>
    <slot name="horizontalArrow" v-if="!isLastOfRow">
      <SvgIcon name="arrow" class="arrow arrow-horizontal"></SvgIcon>
    </slot>
    <slot name="verticalArrow">
      <SvgIcon
        v-if="isLastOfRow && !isLastOfTotal"
        name="arrow"
        class="arrow arrow-vertical"
      ></SvgIcon>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isLast } from './utils'

const props = defineProps<{
  rowIndex: number
  colIndex: number
  rowCount: number
  total: number
}>()

const isLastOfRow = computed(() => isLast(props.colIndex, props.rowCount))
const isLastOfTotal = computed(() => isLast(props.rowIndex, props.total))
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
