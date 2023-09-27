<template>
  <div>
    <avue-form v-model="formData" :option="option"></avue-form>
    <div ref="divRef">dada</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';

const divRef = ref<HTMLElement>()
onMounted(()=> {
  console.log(divRef.value!.innerHTML);
})

const formData = ref({})
const option = reactive({
  column: [{
    label: '多选',
    prop: 'checkbox',
    type: 'checkbox',
    dicData: [{
      label: '男',
      value: 0
    }, {
      label: '女',
      value: 1
    }, {
      label: '未知',
      value: ''
    }]
  }, {
    label: '多选',
    prop: 'checkbox',
    type: 'checkbox',
    dicData: [{
      label: '男',
      value: 0
    }, {
      label: '女',
      value: 1
    }, {
      label: '未知',
      value: ''
    }]
  }, {
    label: '多选',
    prop: 'checkbox',
    type: 'checkbox',
    dicData: [{
      label: '男',
      value: 0
    }, {
      label: '女',
      value: 1
    }, {
      label: '未知',
      value: ''
    }]
  }
  ]
})
</script>

<style scoped>

</style>
