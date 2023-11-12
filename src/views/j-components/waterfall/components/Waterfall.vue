<!--
  1.图片预加载处理
  2.预留插槽
-->
<template>
  <div class="waterfall">
    <slot v-bind="props">
      <ImgLoad
        v-for="(item, index) in urls"
        :key="index"
        :pre-src="getPreSrc(item)"
        :next-src="item"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import ImgLoad from "@/components/ImgLoad.vue";
import { getFilenameFromPath, getDir, getExt } from "@/utils/file";

/** props */
interface JWaterfallProp {
  urls: string[];
  imgBorderRadius?: string;
}
const props = withDefaults(defineProps<JWaterfallProp>(), {
  imgBorderRadius: '2px'
})

const getPreSrc = (src: string) => {
  const filename = getFilenameFromPath(src)
  const dir = getDir(src)
  const ext = getExt(src)
  return `${dir}/min/${filename}.${ext}`
}

</script>

<style lang="scss" scoped>
.waterfall {
  column-count: 1; /* 列数 */
  column-gap: 1.2rem; /* 列之间的间距 */
  &>* {
    break-inside: avoid; /* 防止项目在中间断开 */
    margin-bottom: 1.2rem; /* 每个项目之间的间距 */
    border-radius: v-bind(imgBorderRadius);
  }
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
