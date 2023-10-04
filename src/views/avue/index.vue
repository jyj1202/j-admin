<template>
  <div>
    <ElButton @click="formData={name: 'da'}">click</ElButton>
    <avue-form v-model="formData" :option="option"></avue-form>
    <div ref="divRef">dada</div>
    <avue-crud :data="tableData" :option="tableOption"></avue-crud>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import type { AvueCrudOption } from "@smallwei/avue";

const divRef = ref<HTMLElement>()
onMounted(()=> {
  console.log(divRef.value!.innerHTML);
})

const formData = ref<{name?:string, age?:number}>({
  name: 'dad',
  age: 18
})
const option = reactive({
  column: [{
    label: 'name',
    prop: 'name'
  }, {
    label: 'age',
    prop: 'age'
  }]
})

const tableData = reactive([
  {
    name:'张三',
    // sex:'男',
    select:'110000'
  }, {
    name:'李四',
    sex:'女',
    select:'120000'
  }
])
const tableOption = reactive<AvueCrudOption>({
  column:[
    {
    label:'姓名',
    prop:'name',
    formatter:(val,value,label)=>{
      return value+'00'
    }
  }, {
    label:'性别',
    prop:'sex'
  },{
    label: '字典',
    prop: 'select',
    type: 'select',
    formatter:(val,value,label)=>{
      return `${label}(${value})`
    },
    props: {
      label: 'name',
      value: 'code'
    },
    dicUrl: 'https://cli.avuejs.com/api/area/getProvince'
  }]
})
</script>

<style scoped>

</style>
