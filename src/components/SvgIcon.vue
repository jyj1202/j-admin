<template>
  <svg aria-hidden="true">
    <use :href="symbolId" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  prefix?: string;
  name: string;
}
const props = withDefaults(defineProps<Props>(), {
  prefix: 'icon',
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped>

</style>
