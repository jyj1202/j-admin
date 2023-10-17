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
    <el-button text icon="View" @click="handleView">View</el-button>
    <el-button text type="danger" icon="Delete" @click="handleClear">Clear</el-button>
  </el-button-group>

  <el-dialog
    v-model="viewDialogVisible"
    title="View"
    width="60%"
  >
    <JForm
      class="border p-5 rounded"
      v-model="viewFormData"
      :option="currentFormOption"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="viewDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="viewDialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useFormGeneratorStore } from "@/stores/modules/formGenerator";
import JForm from "@/views/j-form/components/JForm.vue";


const formGeneratorStore = useFormGeneratorStore()
const { clearFormItemList, undo, redo } = formGeneratorStore
const { currentFormOptionIndex, historyFormOptions, currentFormOption } = storeToRefs(formGeneratorStore)

const handleClear = () => {
  clearFormItemList()
}

const viewDialogVisible = ref(false)
const viewFormData = ref({})
const handleView = () => {
  viewDialogVisible.value = true
}
</script>

<style scoped>

</style>
