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
        <h4 :id="titleId" :class="titleClass">{{ dialogFormTitle }}</h4>
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
import { ref, computed, inject } from 'vue';
import { ElMessage } from 'element-plus'
import { toggleFullScreen } from "@/utils/screen";
import { JCrudOptionKey } from "@/views/j-crud/components/utils/keys";
import type { JFormOptionType, JFormColumn } from "@/views/j-form/components/jForm.d";
import type { JCrudOptionType, JCrudColumn } from "@/views/j-crud/components/jCrud";
import JForm from "@/views/j-form/components/JForm.vue";


/** inject */
const crudOption = inject<JCrudOptionType>(JCrudOptionKey)

const dialogVisible = ref(false)
const dialogFormTitle = ref('')
const formData = ref({})
const formOption = computed<JFormOptionType>(()=>{
  const cols = getFormColsFromCrudCols(crudOption!.column)
  const option: JFormOptionType = {
    column: cols,
    menuBtn: false,
  }
  return option
})
/**
 * get formCols from crudCols, because crud col may has children, but form cols array need to be flat.
 * @param crudCols
 * @param cols
 */
function getFormColsFromCrudCols(crudCols: JCrudColumn[], cols: JFormColumn[]=[]): JFormColumn[] {
  crudCols.forEach((col) => {
    if (col.children) {
      getFormColsFromCrudCols(col.children, cols)
    } else {
      const {formatter, ...otherProps} = col
      cols.push(otherProps)
    }
  })
  return cols
}

const handleSubmit = (form: object, done: Function) => {
  console.log(form, done);
  ElMessage.success(JSON.stringify(form))
}

const _show = (title: string, data={}) => {
  formData.value = data
  dialogFormTitle.value = title
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
