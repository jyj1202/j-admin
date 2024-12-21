<template>
  <div ref="containerRef" class="container-box space-y-14">
    <div v-for="(r, rowIndex) in flowData" :key="rowIndex"
      class="row grid gap-14" :class="{'direction-rtl': isEven(rowIndex+1)}"
    >
      <div v-for="(c, colIndex) in r" :key="`${rowIndex}${colIndex}`" class="item rounded-md p-5">
        <span>{{c}}</span>
        <SvgIcon v-if="!isLast(colIndex, r.length)"
          name="arrow" class="arrow arrow-horizontal" :class="{'rotate-180': isEven(rowIndex+1)}"
        ></SvgIcon>
        <SvgIcon v-if="isLast(colIndex, r.length) && !isLast(rowIndex, flowData.length)"
          name="arrow"
          class="arrow arrow-vertical"
        ></SvgIcon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { throttle } from 'lodash';
import { onMounted, ref } from 'vue';

const sourceData = Array.from({length: 10}).map((i, index)=>index+1)

const flowData = ref()

const containerRef = ref<HTMLDivElement>()

function generateFlow(source: Array<any>, colNum: number) {
  const result: number[][] = [];
  for (let i = 0; i < source.length; i += colNum) {
      result.push(source.slice(i, i + colNum));
  }
  return result;
}

function isLast(currentIndex: number, total: number) {
  return currentIndex == total - 1
}

function isEven(num: number) {
  return num % 2 === 0
}

function init(el: HTMLElement,
  cb: (inlineSize: number, reSize: (colNum: number) => void) => void, delay = 500
) {
  const debouncedCb = throttle(cb, delay)
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize: ResizeObserverSize = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize;
        const inlineSize = contentBoxSize.inlineSize;
        const reSize = (colNum: number) => {
          flowData.value = generateFlow(sourceData, colNum)
          containerRef.value?.style.setProperty('--col-num', colNum+'');
        }
        debouncedCb(inlineSize, reSize)
      }
    }
  });

  resizeObserver.observe(el);
}

const cb = (inlineSize: number, reSize: (colNum: number) => void) => {
  const colNum = Math.max(Math.floor(inlineSize / 150), 1);
  reSize(colNum)
}

onMounted(() => {
  init(containerRef.value!, cb)
})
</script>

<style scoped lang="scss">
.container-box {
  --col-num: 0;
}
.row {
  grid-template-columns: repeat(var(--col-num), 1fr);
}
.item {
  --arrow-width: 2rem;
  --arrow-height: 2rem;
  --arrow-gap-horizontal: 0.8rem;
  --arrow-gap-vertical: 0.8rem;
  --border-color: var(--el-color-primary-light-5);
  position: relative;
  border: 1px solid var(--border-color);
  background-color: var(--el-color-primary-light-9);
  text-align: center
}
.arrow {
  width: var(--arrow-width);
  height: var(--arrow-height);
  color: var(--border-color);
  position: absolute;
}
.arrow-horizontal {
  right: calc(-1 * var(--arrow-width) - var(--arrow-gap-horizontal));
  top: 50%;
  margin-top: calc(-1 * var(--arrow-height) / 2);
}
.arrow-vertical {
  right: 50%;
  bottom: calc(-1 * var(--arrow-height) - var(--arrow-gap-vertical));
  transform: rotate(90deg) translateY(-50%);
}
.direction-rtl {
  direction: rtl;
  .arrow-horizontal {
    left: calc(-1 * var(--arrow-width) - var(--arrow-gap-horizontal));
    right: auto;
  }
}
</style>
