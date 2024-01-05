<template>
  <div class="flex gap-5 justify-center">
    <div class="left w-1/3">
      <ul ref="leftRef" class="border">
        <li class="border-b h-16 flex items-center justify-between px-4" v-for="item in leftData" :key="item.label">
          <span>{{ item.label }}</span>
          <el-icon class="my-handle"><Rank /></el-icon>
        </li>
      </ul>
      <pre>{{ leftData }}</pre>
    </div>

    <div class="right w-1/3">
      <ul class=" border">
        <li
          class="border-b h-16 flex items-center justify-between px-4"
          v-for="(item, index) in rightData"
          :key="item.label"
        >
          <span>{{ item.label }}</span>
          <el-tag v-for="tag in item.children" :key="tag.index" closable @close="handleCloseTag(item, tag)">{{ tag.fromItem.label }}</el-tag>
          <div v-show="!item.children.length" class="flex-1" :ref="dynamicRef(item.label)" :id="`${index}`"></div>
        </li>
      </ul>
      <pre>{{ rightData }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable, {type SortableEvent,} from 'sortablejs';
import { onMounted, ref, type Ref } from "vue";

const leftRef = ref<HTMLElement|null>()

const leftData = ref([{
  label: '左1'
}, {
  label: '左2'
}, {
  label: '左3'
}, {
  label: '左4'
}])

interface RightChildren {index: number; fromItem: {label: string}}
const rightData = ref<{label: string; children: RightChildren[]}[]>([{
  label: '右1',
  children: []
}, {
  label: '右2',
  children: []
}, {
  label: '右3',
  children: []
}, {
  label: '右4',
  children: []
}])
const rightRefs: Record<string, Ref<HTMLElement[]|null>> = {}
const dynamicRef = (id: string): Ref => {
  if (!rightRefs[id]) {
    rightRefs[id] = ref(null)
  }
  return rightRefs[id]
}

onMounted(() => {
  initSort()
})

function initSort() {
  initLeft()
  initRight()
}

function initLeft() {
  Sortable.create(leftRef.value!, {
    group: {
      name: 'shared',
      put: false
    },
    sort: false,
    handle: ".my-handle",
  })
}

const rightSortableInstanceContainer: Record<string, Sortable> = {}
function initRight() {
  const onAdd = (e: SortableEvent) => {
    const {to, oldIndex} = e
    const fromItem = leftData.value.find((i, index) => index == oldIndex)
    if (!fromItem || oldIndex == undefined) return
    const toIndex = Number(to.id)
    const toItem = rightData.value.find((i, index) => index == toIndex)
    if (!toItem) return
    toItem.children.push({
      index: oldIndex,
      fromItem
    })
    rightSortableInstanceContainer[toItem.label].option('disabled', true)
    
    leftData.value.splice(oldIndex, 1)
  }
  Object.keys(rightRefs).forEach(key => {
    rightSortableInstanceContainer[key] = Sortable.create(rightRefs[key].value![0], {
      group: 'shared',
      onAdd,
      sort: false
    })
  })
}

const handleCloseTag = (item: {label: string; children: RightChildren[]}, tag: RightChildren) => {
  item.children = []
  const {index, fromItem} = tag
  leftData.value.splice(index, 0, fromItem)
  rightSortableInstanceContainer[item.label].option('disabled', false)
}

</script>

<style scoped lang="scss">
.my-handle {
  cursor: move;
  color: #bfbfbf;
  &:hover {
      color: #5c8ef2;
  }
}
</style>
