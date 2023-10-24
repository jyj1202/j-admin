<template>
  <div class="h-full">
    <el-alert
      title="🤖 https://github.com/microsoft/monaco-editor"
      type="warning"
      :closable="false"
    />
    <JMonacoEditor class="mt-5 j-monaco-editor"/>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.j-monaco-editor {
  height: calc(100% - 2*var(--el-main-padding) - 3rem);
}
</style>
