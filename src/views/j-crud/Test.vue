<template>
  <div>
    <slot name="a"></slot>
    <slot name="b"></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useSlots } from "vue";

onMounted(() => {
  const slots = useSlots()
  console.log(slots);
  
})
</script>

<style scoped>

</style>
