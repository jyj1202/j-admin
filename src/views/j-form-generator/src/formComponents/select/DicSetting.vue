<template>
  <div>
    <ul class="space-y-2">
      <li class="flex items-center gap-2" v-for="dic in dicData" :key="dic.value">
        <el-input v-model="dic.label"></el-input>
        <el-input v-model="dic.value"></el-input>
        <el-button size="small" plain type="danger" icon="Minus" @click="deleteDic(dic)"></el-button>
      </li>
    </ul>
    <el-button size="small" plain type="primary" icon="Plus" @click="addDic"></el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Dic {
  label: string, value: string
}
const dicData = ref<Dic[]>([{
  label: 'label1',
  value: 'value1',
}])

const addDic = () => {
  dicData.value.push({
    label: '',
    value: 'value'+Date.now()
  })
}
const deleteDic = (dic: Dic) => {
  const index = dicData.value.findIndex(item => item.value == dic.value)
  dicData.value.splice(index, 1)
}
</script>

<style scoped>

</style>
