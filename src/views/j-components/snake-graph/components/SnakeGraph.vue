<template>
  <div ref="containerRef" class="container-box">
    <slot v-bind="{data: flowData}"></slot>
  </div>
</template>

<script lang="ts" setup>
import { throttle } from 'lodash'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  cb: (containerWidth: number, reSize: (colNum: number) => void) => void;
  sourceData: Array<any>;
  delay?: number;
}>()

const flowData = ref<Array<Array<any>>>([])

const containerRef = ref<HTMLDivElement>()

function generateFlow(source: Array<any>, colNum: number) {
  const result: number[][] = []
  for (let i = 0; i < source.length; i += colNum) {
    result.push(source.slice(i, i + colNum))
  }
  return result
}

function init(
  el: HTMLElement,
  sourceData: Array<any>,
  cb: (containerWidth: number, reSize: (colNum: number) => void) => void,
  delay = 500
) {
  const debouncedCb = throttle(cb, delay)
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize: ResizeObserverSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize
        const containerWidth = contentBoxSize.inlineSize
        const reSize = (colNum: number) => {
          flowData.value = generateFlow(sourceData, colNum)
          containerRef.value?.style.setProperty('--col-num', colNum + '')
        }
        debouncedCb(containerWidth, reSize)
      }
    }
  })

  resizeObserver.observe(el)
}

onMounted(() => {
  init(containerRef.value!, props.sourceData, props.cb, props.delay)
})
</script>

<style scoped lang="scss">
.container-box {
  --col-num: 0;
}
</style>
