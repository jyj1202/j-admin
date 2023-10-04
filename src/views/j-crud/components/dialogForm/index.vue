<template>
  <el-dialog
    v-model="dialogVisible"
    title="Add Row"
    width="50%"
    :close-on-click-modal="false"
  >
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

defineExpose({
  _show
})
</script>

<style scoped>

</style>
