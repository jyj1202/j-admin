<template>
  <JForm
    v-if="formOption.column.length"
    v-model:model-value="formData"
    :option="formOption"
  >
  </JForm>
</template>

<script setup lang="ts">
import JForm from "@/views/j-form/components/JForm.vue";
import { inject, ref, computed } from "vue";
import { JCrudOptionKey } from "@/views/j-crud/components/utils/keys";
import type { JCrudColumn, JCrudOptionType } from "@/views/j-crud/components/jCrud";

/** inject */
const option = inject<JCrudOptionType>(JCrudOptionKey)

const formData = ref({
})

const formOption = computed(() => {
  const filteredOption = {...option, column: getNeedSearchCols(option!.column)}
  return filteredOption
})

function getNeedSearchCols(cols: JCrudColumn[], needSearchCols: JCrudColumn[]=[]): JCrudColumn[] {
  cols.forEach((col) => {
    if (col.children) {
      getNeedSearchCols(col.children, needSearchCols)
    } else if(col.search) {
      needSearchCols.push(col)
    }
  })
  return needSearchCols
}

</script>

<style scoped>

</style>
