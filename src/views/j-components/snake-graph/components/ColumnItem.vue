<template>
  <div :key="`${rowIndex}${colIndex}`">
    <slot></slot>
    <slot name="horizontalArrow" v-if="!isLastOfRow">
    </slot>
    <slot name="verticalArrow" v-if="isLastOfRow && !isLastOfTotal">
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
</style>
