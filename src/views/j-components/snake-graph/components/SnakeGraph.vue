<template>
  <div ref="containerRef" class="container-box space-y-14">
    <RowItem v-for="(r, rowIndex) in flowData" :key="rowIndex" :row-index="rowIndex">
      <ColumnItem
        v-for="(col, colIndex) in r"
        :key="`${rowIndex}${colIndex}`"
        :col-index="colIndex"
        :row-index="rowIndex"
        :row-count="r.length"
        :total="flowData.length"
      >
        {{ col }}
      </ColumnItem>
    </RowItem>
  </div>
</template>

<script lang="ts" setup>
import { throttle } from 'lodash'
import { onMounted, ref } from 'vue'
import RowItem from './RowItem.vue'
import ColumnItem from './ColumnItem.vue'

const props = defineProps<{}>()

const sourceData = Array.from({ length: 10 }).map((i, index) => index + 1)

const flowData = ref()

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
  cb: (inlineSize: number, reSize: (colNum: number) => void) => void,
  delay = 500
) {
  const debouncedCb = throttle(cb, delay)
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize: ResizeObserverSize = Array.isArray(entry.contentBoxSize)
          ? entry.contentBoxSize[0]
          : entry.contentBoxSize
        const inlineSize = contentBoxSize.inlineSize
        const reSize = (colNum: number) => {
          flowData.value = generateFlow(sourceData, colNum)
          containerRef.value?.style.setProperty('--col-num', colNum + '')
        }
        debouncedCb(inlineSize, reSize)
      }
    }
  })

  resizeObserver.observe(el)
}

const cb = (inlineSize: number, reSize: (colNum: number) => void) => {
  const colNum = Math.max(Math.floor(inlineSize / 150), 1)
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
</style>
