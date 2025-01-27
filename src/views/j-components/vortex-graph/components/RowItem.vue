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
</style>
