<template>
  <div ref="containerRef" class="container">
    <img ref="preRef" class="pre" :src="preSrc" alt="">
    <img ref="nextRef" class="next" :src="nextSrc" alt="" @load="loaded">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Prop {
  preSrc: string;
  nextSrc: string;
}
const props = defineProps<Prop>()

const containerRef = ref()
const preRef = ref()
const nextRef = ref()

// onMounted(() => {
  
  
// })

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
  filter: blur(10px);
  transition: filter 2s ease-in-out;
}
.pre.loaded {
  filter: blur(0);
}
.next {
  opacity: 0;
  transition: opacity 2s ease-in-out;
}
.next.loaded {
  opacity: 1;
}
</style>
