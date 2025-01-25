<template>
  <div :key="`${rowIndex}${colIndex}`">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isLast } from '../utils'

defineProps<{
  rowIndex: number
  colIndex: number
}>()

</script>

<style scoped>
</style>
