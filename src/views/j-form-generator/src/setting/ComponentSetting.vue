<template>
  <JForm
    v-model="formData"
    :option="formOption"
  >

  </JForm>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useFormGeneratorStore } from "@/stores/modules/formGenerator";
import type { JFormOptionType } from "@/views/j-form/components/jForm.d";
import JForm from "@/views/j-form/components/JForm.vue";

const formGeneratorStore = useFormGeneratorStore()
const { currentFormItem } = storeToRefs(formGeneratorStore)

const formOption = computed<JFormOptionType>(() => {
  if (currentFormItem.value && currentFormItem.value.option) {
    return {
      labelPosition: 'left',
      labelWidth: 120,
      submitBtn: false,
      emptyBtn: false,
      column: currentFormItem.value.option
    }
  }
  return {
    labelPosition: 'left',
    labelWidth: 100,
    submitBtn: false,
    emptyBtn: false,
    column: []
  }
})
const formData = ref({})

</script>

<style scoped>

</style>
