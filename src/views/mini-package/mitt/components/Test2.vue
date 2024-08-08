<template>
  <div>
    component2<br/>
    message: {{ message }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { emitter } from "@/plugins/mitt";

const message = ref<any>();
emitter.on('event1', e => {
  console.log(e);
  message.value = e
})

</script>

<style scoped>

</style>
