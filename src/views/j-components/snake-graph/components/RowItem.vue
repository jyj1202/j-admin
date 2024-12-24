<template>
  <div class="row grid gap-14" :class="{ 'direction-rtl': isEven(rowIndex + 1) }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { isEven } from './utils'

defineProps<{
  rowIndex: number
}>()
</script>

<style scoped>
.row {
  grid-template-columns: repeat(var(--col-num), 1fr);
}
.direction-rtl {
  direction: rtl;
  .arrow-horizontal {
    left: calc(-1 * var(--arrow-width) - var(--arrow-gap-horizontal));
    right: auto;
    transform: rotate(180deg);
  }
}
</style>
