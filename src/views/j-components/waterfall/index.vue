<template>
  <Waterfall :urls="images">
    <!-- <template #default="{urls}">
      <div class="h-20" v-for="item in urls" :key="item">{{ item }}</div>
    </template> -->
  </Waterfall>
</template>

<script setup lang="ts">
import Waterfall from "./components/Waterfall.vue";

const images = Object.values(import.meta.glob('@/assets/images/waterfall/*', { as: 'url', eager: true }))

</script>

<style lang="scss" scoped>
.waterfall {
  column-count: 1; /* 列数 */
  column-gap: 1.2rem; /* 列之间的间距 */
}
.item {
  break-inside: avoid; /* 防止项目在中间断开 */
  margin-bottom: 1.2rem; /* 每个项目之间的间距 */
  border-radius: 4px;
}
/** tailwind sm */
@media screen and (min-width: 640px) {
  .waterfall {
    column-count: 2; /* 列数 */
  }
}
/** tailwind md */
@media screen and (min-width: 768px) {
  .waterfall {
    column-count: 3; /* 列数 */
  }
}
/** tailwind lg */
@media screen and (min-width: 1024px) {
  .waterfall {
    column-count: 4; /* 列数 */
  }
}
/** xl */
@media screen and (min-width: 1280px) {
  .waterfall {
    column-count: 5; /* 列数 */
  }
}
/** 2xl */
@media screen and (min-width: 1536px) {
  .waterfall {
    column-count: 6; /* 列数 */
  }
}
</style>
