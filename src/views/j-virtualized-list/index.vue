<template>
  <div class="h-full space-y-4">
    <h3>10,000 rows</h3>

    <div v-if="false" class="j-table flex flex-col border h-1/2">
      <div class="j-table-header h-[50px] flex items-center px-4">
        <div class="j-table-col flex-1" v-for="col in column" :key="col.key">{{ col.label }}</div>
      </div>
      <div class="j-table-body flex-1 border overflow-auto px-4">
        <div v-for="(row) in dataSource" :key="row.id"
          class="j-table-row flex items-center border-b h-[40px]"
        >
          <div class="flex-1 overflow-hidden" v-for="col in column" :key="col.key">{{ row[col.dataKey] }}</div>
        </div>
      </div>
    </div>

    <div v-else class="j-table flex flex-col h-1/2">
      <div class="j-table-header h-[50px] flex items-center border px-4">
        <div class="j-table-col flex-1" v-for="col in column" :key="col.key">{{ col.label }}</div>
      </div>
      <div ref="tableBodyRef" class="j-table-body flex-1 border overflow-auto px-4">
        <div class="table-list" :style="getTableListHeight()">
          <div v-for="(row) in viewBoxData" :key="row.id"
            class="j-table-row flex items-center border-b h-[40px]"
          >
            <div class="flex-1 overflow-hidden" v-for="col in column" :key="col.key">{{ row[col.dataKey] }}</div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue';

const isVirtualShow = ref(false)

const generateColumns = (length = 5, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    label: `Column ${columnIndex}`,
    width: 150
  }))
  
  
const generateData = (column: ReturnType<typeof generateColumns>, length = 10000, prefix = 'row-') =>
  Array.from({ length }).map((_, rowIndex) => {
    return column.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null
      }
      )
    })
      
const column = generateColumns()
const dataSource = generateData(column)

/** 虚拟列表 */

const tableBodyRef = ref<HTMLElement|null>()
const trHeight = 40
const startIndex = ref(0)
let viewBoxLength = ref(0)
const endIndex = computed(() => {
  return Math.min(startIndex.value + viewBoxLength.value * 2 - 1, dataSource.length - 1)
})

onMounted(() => {
  initVirtualTable()
})

function initVirtualTable() {
  if (!tableBodyRef.value) return
  viewBoxLength.value = Math.ceil(tableBodyRef.value.offsetHeight / trHeight) * 2
  console.log(viewBoxLength.value);
  tableBodyRef.value.addEventListener("scroll", handleScroll)
}

const viewBoxData = computed(() => {
  const floorIndex = Math.max(0, startIndex.value - viewBoxLength.value * 2 + 1)
  const ceilIndex = endIndex.value + 1
  return dataSource.slice(floorIndex, ceilIndex)
})

let current = Date.now()
function handleScroll(e: Event) {
  const now = Date.now()
  if (now - current > 30) {
    current = now
    requestAnimationFrame(() => scrollHandler(e))
  }
}

function scrollHandler(e: Event) {
  const scrollTop = e.target!.scrollTop
  const count = Math.floor(scrollTop / trHeight)
  startIndex.value = count
  startIndex.value = count
}

function getTableListHeight() {
  const floorIndex = Math.max(0, startIndex.value - viewBoxLength.value * 2 + 1)
  return {
    'padding-top': `${floorIndex * trHeight}px`,
    'padding-bottom': `${(dataSource.length - 1 - endIndex.value) * trHeight}px`
  }
}

</script>

<style scoped>
table {
  /* table-layout: auto; */
  width: 100%;
}
tr {
  height: 40px;
  overflow: hidden;
}
</style>
