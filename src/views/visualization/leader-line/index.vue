<template>
  <div class="flex gap-8">
    <div class="flex-1 space-y-4">
      <div v-for="item in col1" :key="item.id" :id="`node${item.id}`" class="node" @click="onNodeClick(item)">{{ item.label }}</div>
    </div>

    <div class="flex-1 space-y-4">
      <div v-for="item in col2" :key="item.id" :id="`node${item.id}`" class="node" @click="onNodeClick(item)">{{ item.label }}</div>
    </div>

    <div class="flex-1 space-y-4">
      <div v-for="item in col3" :key="item.id" :id="`node${item.id}`" class="node" @click="onNodeClick(item)">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeaderLine from 'leader-line-vue';
import { onMounted } from 'vue';

interface Node {
  id: string,
  label: string,
  parent: string[]
}

const col1: Node[] = [{
  id: '1',
  label: '1',
  parent: []
}, {
  id: '2',
  label: '2',
  parent: []
}]

const col2: Node[] = [{
  id: '1-1',
  label: '1-1',
  parent: ['1']
}, 
{
  id: '1-2',
  label: '1-2',
  parent: ['1']
}, 
{
  id: '2-1',
  label: '2-1',
  parent: ['2']
}, {
  id: '2-2',
  label: '2-2',
  parent: ['2']
}
]

const col3: Node[] = [{
  id: '1-1-1',
  label: '1-1-1',
  parent: ['1-1']
}, {
  id: '1-1-2',
  label: '1-1-2',
  parent: ['1-1']
}, {
  id: '1-1-3',
  label: '1-1-3',
  parent: ['1-1']
}, {
  id: '1-2-1',
  label: '1-2-1',
  parent: ['1-2']
}, {
  id: '1-2-2',
  label: '1-2-2',
  parent: ['1-2']
}]

const lineInstances: any[] = []
function setLine(data: Node[][]) {
  data.forEach((nodes) => {
    nodes.forEach((node) => {
      const parent = node.parent
      if (parent.length === 0) return
      parent.forEach((pid) => {
        const i = LeaderLine.setLine(
          document.getElementById(`node${pid}`),
          document.getElementById(`node${node.id}`),
          {
            color: 'var(--el-color-primary)',
            // startSocket: 'right', endSocket: 'left'
            path: 'grid',
            startSocket: 'right',
            endSocket: 'left',
            startSocketGravity: 10,
            endSocketGravity: 10,
            startPlug: 'disc',
            startPlugSize: 3, // 线头尺寸
            endPlugSize: 2,
            size: 1,
            dash: {
              animation: true,
              len: 5,
              gap: 2
            },
            // y: '50%'
            // startPlug: 'square',
            // endPlug: 'hand'
          }
        )
        lineInstances.push(i)
      })
    })
  })
}

onMounted(() => {
  setLine([col1, col2, col3])
})

const onNodeClick = (n: Node) => {
  lineInstances.forEach((l) => {
    
  })
}
</script>

<style scoped>
.node {
  height: 100px;
  border-radius: 8px;
  background-color: var(--el-color-primary-light-7);
  text-align: center;
  cursor: pointer;
}
</style>
