<template>
  <div class="flex flex-wrap">
    <div class="img-container" v-for="(item, index) in images" :key="index">
      <img v-lazyImg="item" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
const images = Object.values(import.meta.glob('@/assets/images/waterfall/*', { as: 'url', eager: true }))

</script>

<style scoped>
.img-container {
  width: 25%;
}
img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
