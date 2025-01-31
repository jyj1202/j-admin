<template>
  <div>
    <ImgLoad :pre-src="preSrc" :next-src="nextSrc"></ImgLoad>
  </div>
</template>

<script setup lang="ts">
import ImgLoad from '@/components/ImgLoad.vue'
import preSrc from '@/assets/images/waterfall/min/01.jpg'
import nextSrc from '@/assets/images/waterfall/01.jpg'
</script>

<style scoped></style>
