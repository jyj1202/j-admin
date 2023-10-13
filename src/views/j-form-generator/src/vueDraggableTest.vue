<template>
  <div class="flex justify-between">
    <div class="col-3">
      <h3>Draggable 1</h3>
      <draggable
        class="list-group"
        :list="list1"
        :sort="false"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="handleChange"
        item-key="name"
      >
        <template #item="{ element }">
          <div class="list-group-item">{{ element.name }}</div>
        </template>
      </draggable>
    </div>

    <div class="col-3">
      <h3>Draggable 2</h3>
      <draggable
        class="list-group"
        :list="list2"
        group="people"
        @change="handleChange"
        item-key="name"
      >
        <template #item="{ element }">
          <div class="list-group-item">{{ element.name }}</div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import draggable from 'vuedraggable'

const list1 = reactive([
  { name: "1", id: 1 },
  { name: "2", id: 2 },
  { name: "3", id: 3 },
  { name: "4", id: 4 }
])
const list2 = reactive([
  // { name: "5", id: 5 },
  // { name: "6", id: 6 },
  // { name: "7", id: 7 }
])

const handleChange = (e) => {
  console.log(e);
}
</script>

<style scoped>
.list-group-item {
  width: 100px;
  height: 60px;
  border: 1px solid gray;
}
</style>
