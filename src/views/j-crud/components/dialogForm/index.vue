<template>
  <el-dialog
    id="dialogForm"
    v-model="dialogVisible"
    width="50%"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <template #header="{ titleId, titleClass }">
      <div class="flex justify-between items-center">
        <h4 :id="titleId" :class="titleClass">Add Row</h4>
        <div>
          <el-button type="info" link icon="FullScreen" @click="handleToogleFullScreen"></el-button>
          <el-button type="info" link icon="Close" @click="dialogVisible=false"></el-button>
        </div>
      </div>
    </template>
    <JForm
      class="mt-5"
      v-model="formData"
      :option="formOption"
      @submit="handleSubmit"
    />
    
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import JForm from "@/views/j-form/components/JForm.vue";
import type { OptionType } from "@/views/j-form/components/jForm.d";
import { ElMessage } from 'element-plus'
import { toggleFullScreen } from "@/utils/screen";


/** props and emit */
interface AddDialogProps {
  option: OptionType;
}
const props = defineProps<AddDialogProps>()

const dialogVisible = ref(false)

const formData = ref({})
const formOption = computed(()=>{
  const option = {
    ...props.option,
    submitBtn: false,
    emptyBtn: false
  }
  return option
})
const handleSubmit = (form: object, done: Function) => {
  console.log(form, done);
  ElMessage.success(JSON.stringify(form))
}
const _show = (data={}) => {
  formData.value = data
  dialogVisible.value = true
}

const handleToogleFullScreen = () => {
  toggleFullScreen(document.getElementById('dialogForm')!)
}

defineExpose({
  _show
})
</script>

<style scoped lang="scss">
:deep(.el-dialog__header) {
  margin-right: 0;
}
</style>
