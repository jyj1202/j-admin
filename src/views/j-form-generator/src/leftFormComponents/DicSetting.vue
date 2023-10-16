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
import { ref, watch } from 'vue';

interface Dic {
  label: string, value: string
}
const dicData = ref<Dic[]>([])

const props = defineProps<{
  modelValue: Dic[];
}>()
const emit = defineEmits<{
  'change': [value: Dic[]],
  'update:model-value': [value: Dic[]],
}>()

watch(()=> props.modelValue, (newVal) => {
  dicData.value = newVal
}, {
  immediate: true,
  deep: true
})

const addDic = () => {
  dicData.value.push({
    label: 'label'+Date.now(),
    value: 'value'+Date.now()
  })
  
  /** first update model value, then handle change */
  emit('update:model-value', dicData.value)
  emit('change', dicData.value)
}
const deleteDic = (dic: Dic) => {
  const index = dicData.value.findIndex(item => item.value == dic.value)
  dicData.value.splice(index, 1)
}
</script>

<style scoped>

</style>
