<template>
  <JForm
    v-if="currentFormItem"
    :model-value="currentFormItem"
    :option="formOption"
    @update:model-value="handleUpdate"
  >

  </JForm>
</template>

<script setup lang="ts">
import { watchEffect, ref } from "vue";
import { storeToRefs } from "pinia";
import { useFormGeneratorStore } from "@/stores/modules/formGenerator";
import type { JFormOptionType } from "@/views/j-form/components/jForm.d";
import JForm from "@/views/j-form/components/JForm.vue";

const formGeneratorStore = useFormGeneratorStore()
const { pushHistory } = formGeneratorStore
const { currentFormItem } = storeToRefs(formGeneratorStore)

const formOption = ref<JFormOptionType>({
  labelPosition: 'left',
  labelWidth: 100,
  submitBtn: false,
  emptyBtn: false,
  column: []
})
watchEffect(() => {
  if (currentFormItem.value && currentFormItem.value.option) {
    formOption.value.column = currentFormItem.value.option
  }
})


// const formOption = computed<JFormOptionType>(() => {
//   if (currentFormItem.value && currentFormItem.value.option) {
//     currentFormItem.value.option.forEach(item => {
//       if (item.component && typeof item.component == 'object') {
//         item.component = shallowRef(item.component)
//       }
//     })
//     console.log(currentFormItem.value.option);
    
//     return {
//       labelPosition: 'left',
//       labelWidth: 120,
//       submitBtn: false,
//       emptyBtn: false,
//       column: currentFormItem.value.option
//     }
//   }
//   return {
//     labelPosition: 'left',
//     labelWidth: 100,
//     submitBtn: false,
//     emptyBtn: false,
//     column: []
//   }
// })

/** 
 * update -> update "formGeneratorStore.currentFormItem" -> update "formGeneratorStore.formItemList"
 * do not replace whole "formGeneratorStore.currentFormItem" object with new value instead of update it's props,
 * if do this, it will cause "formGeneratorStore.currentFormItem" != "formGeneratorStore.formItemList[index]",
 * so "formGeneratorStore.formItemList" will not update.
*/
const handleUpdate = (newVal: any) => {
  Object.keys(newVal).forEach(key => {
    (formGeneratorStore.currentFormItem as any)[key] = newVal[key]
  })
  pushHistory()
}

</script>

<style scoped>

</style>
