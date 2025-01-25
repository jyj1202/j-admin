<template>
  <div class="row grid gap-14">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.row {
  grid-template-columns: repeat(var(--col-num), 1fr);
}
.direction-rtl :deep(.arrow-horizontal) {
  left: calc(-1 * var(--arrow-width) - var(--arrow-gap-horizontal));
  right: auto;
  transform: rotate(180deg);
}
</style>
