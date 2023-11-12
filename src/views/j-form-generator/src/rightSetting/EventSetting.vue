<template>
  <div class="space-y-3">
    <JMonacoEditor class="j-monaco-editor"/>
    <JMonacoEditor class="j-monaco-editor"/>
    <JMonacoEditor class="j-monaco-editor"/>
  </div>
</template>

<script setup lang="ts">
import JMonacoEditor from "@/components/JMonacoEditor.vue";

</script>

<style scoped>
.j-monaco-editor {
  height: 12rem;
}
</style>
