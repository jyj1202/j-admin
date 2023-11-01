<template>
  <div>
    <el-button type="primary" @click="openDialog">Show Dialog</el-button>
    <Dialog
      v-model:visible="isDialogShow"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Dialog from "./components/Dialog.vue";

const isDialogShow = ref(false)
const openDialog = () => {
  isDialogShow.value = true
}
</script>

<style scoped>

</style>
