<template>
  <div>
    component1<br/>
    <el-button type="primary" @click="emit">emit</el-button>
    <el-button>{{ count }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { emitter } from "@/plugins/mitt";

const count = ref(0)

const emit = () => {
  count.value++
  emitter.emit('event1', { count: count.value })
}


</script>

<style scoped>

</style>
