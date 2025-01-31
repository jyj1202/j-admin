<template>
  <div ref="containerRef" class="container">
    <img ref="preRef" class="pre" :src="preSrc" alt="" />
    <img ref="nextRef" class="next" :src="nextSrc" alt="" @load="loaded" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Prop {
  preSrc: string
  nextSrc: string
}
defineProps<Prop>()

const containerRef = ref()
const preRef = ref()
const nextRef = ref()

function loaded() {
  preRef.value.classList.add('hidden')
  preRef.value.classList.add('loaded')
  nextRef.value.classList.add('loaded')
  containerRef.value.removeChild(preRef.value)
  nextRef.value.removeEventListener('load', loaded)
}
</script>

<style scoped>
.container {
  position: relative;
}
.container img {
  position: relative;
  width: 100%;
}
.hidden {
  opacity: 0;
}
.pre {
  opacity: 1;
}
.pre.hidden {
  opacity: 0;
}
.next {
  display: none;
}
.next.loaded {
  display: initial;
}
</style>
