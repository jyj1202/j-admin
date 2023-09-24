<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  prefix?: string;
  name: string;
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
  color: '#333',
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped>

</style>
