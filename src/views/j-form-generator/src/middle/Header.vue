<template>
  <el-button-group size="default">
    <el-button
      :disabled="currentFormOptionIndex<1"
      text icon="Back"
      @click="redo"
    />
    <el-button :disabled="currentFormOptionIndex>=historyFormOptions.length-1" text icon="Right"
      @click="undo"  
    />
  </el-button-group>
  <el-button-group size="default">
    <el-button text icon="Upload">Import JSON</el-button>
    <el-button text icon="Download">Export JSON</el-button>
    <el-button text icon="View">View</el-button>
    <el-button text type="danger" icon="Delete" @click="handleClear">Clear</el-button>
  </el-button-group>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFormGeneratorStore } from "@/stores/modules/formGenerator";


const formGeneratorStore = useFormGeneratorStore()
const { clearFormItemList, undo, redo } = formGeneratorStore
const { currentFormOptionIndex, historyFormOptions } = storeToRefs(formGeneratorStore)

const handleClear = () => {
  clearFormItemList()
}
</script>

<style scoped>

</style>
