<template>
  <div class="flex gap-5 h-full">
    <div class="flex-1">
      <el-input
        ref="selectRef"
        v-model="value"
        @input="filterMethod"
        @focus="()=> {popVisible = true}"
      >
        <template #suffix>
          <el-icon><ArrowDown /></el-icon>
        </template>
      </el-input>
      <el-popover
        ref="popoverRef"
        :virtual-ref="selectRef"
        virtual-triggering
        :width="$refs.selectRef?.$el.offsetWidth"
        :visible="popVisible"
        @focus="handlePopFocus"
      >
        <el-tree
          :data="data"
          @node-click="handleNodeClick"
          >
        </el-tree>
      </el-popover>
    </div>

    <el-select v-model="value" filterable :filter-method="filterMethod">
      <el-option>
        <el-tree
          :data="data"
          node-key="label"
          :default-expanded-keys="expandedKeys"
          @node-click="handleNodeClick"
          @node-collapse="handleNodeCollapse"
          @node-expand="handleNodeExpand"
        >
        </el-tree>
      </el-option>
    </el-select>

    <pre class="h-full overflow-y-auto overflow-x-hidden">
      {{ sourceData }}
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const selectRef = ref()
const popVisible = ref(false)

interface Tree {
  label: string
  children?: Tree[]
}

const handlePopFocus = () => {
  console.log('xxx');
}

const expandedKeys = ref([])

const value = ref('')
const sourceData = ref<Tree[]>([
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
])
const data = ref<Tree[]>([])
const handleNodeClick = (data: Tree) => {
  if (!data.children) {
    value.value = data.label
    // expandedKeys.value.
  }
}

const handleNodeCollapse = (item, node, comp) => {
  const index = expandedKeys.value.findIndex(i => i == item.label)
  expandedKeys.value.splice(index, 1)
  
}

const handleNodeExpand = (item, node, comp) => {
  expandedKeys.value.push(item.label)
  
}



const filterMethod = (keyword?: string) => {
  if (keyword == undefined || keyword == null) return data.value = sourceData.value
  data.value = getFilteredData(sourceData.value, keyword)
}
filterMethod()

interface Item {
  label: string;
  children?: Item[]
}
function getFilteredData(data: Item[], keyword: string): Item[] {
  const arr: Item[] = []
  data.forEach((i => {
    if (i.label.includes(keyword)) return arr.push(i)
    if (i.children) {
      const {label, children} = i
      const newChildren = getFilteredData(children, keyword)
      newChildren.length && arr.push({
        label,
        children: newChildren
      })
    }
  }))
  return arr
  

  // return data.filter(i => {
  //   if (i.label.includes(keyword)) return true
  //   if (i.children) {
  //     i.children = getFilteredData(i.children, keyword);
  //     return i.children.length
  //   }
  //   return false
  // })
}
</script>

<style>
.el-select-dropdown__item {
  height: auto;
  padding: 0;
}
.el-popover.el-popper {
  padding-left: 0;
  padding-right: 0;
}
</style>
