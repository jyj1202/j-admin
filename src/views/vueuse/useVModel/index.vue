<template>
  <div>
    <CustomForm
      v-model:hobby="hobby"
      v-model:customHobby="customHobby"
      v-model:form="form"
      v-model:customForm="customForm"
      @update:form="formChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CustomForm from "./components/CustomForm.vue";


const hobby = ref('sing')
const customHobby = ref('jump')

const form = ref({
  name: 'son'
})
const customForm = ref({
  name: 'son'
})
const log = (e) => {
  customForm.value = e
}

const formChange = (e) => {
  console.log('formChange', e);
}
</script>

<style scoped>

</style>
