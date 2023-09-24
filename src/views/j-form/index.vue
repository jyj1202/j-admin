<template>
  <JForm :option="formOption"/>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import JForm from "./components/JForm.vue";
import type { OptionType } from "./components/type.d";


const formOption = reactive<OptionType>({
  column: [{
    label: 'input',
    prop: 'input',
    type: 'input'
  }, {
    label: 'select',
    prop: 'select',
    type: 'select',
    dicData: [{
      label: '字典1',
      value: 0
    }, {
      label: '字典2',
      value: 1
    }]
  }]
})

</script>

<style scoped>

</style>
