<template>
  <el-button-group size="default">
    <el-button text icon="Back" />
    <el-button text icon="Right" />
  </el-button-group>
  <el-button-group size="default">
    <el-button text icon="Upload">Import JSON</el-button>
    <el-button text icon="Download">Export JSON</el-button>
    <el-button text icon="View">View</el-button>
    <el-button text type="danger" icon="Delete" @click="handleClear">Clear</el-button>
  </el-button-group>
</template>

<script setup lang="ts">
import { useFormGeneratorStore } from "@/stores/modules/formGenerator";

const formGeneratorStore = useFormGeneratorStore()
const { clearFormItemList } = formGeneratorStore

const handleClear = () => {
  clearFormItemList()
}
</script>

<style scoped>

</style>
