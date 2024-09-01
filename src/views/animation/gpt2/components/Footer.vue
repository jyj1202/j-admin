<template>
  <div class="footer border rounded-md" tabindex="0">
    <div class="border-b p-3">
      <el-button type="primary" size="small">file</el-button>
    </div>
    <div class="p-2">
      <el-input
        v-model="toSendMessage"
        placeholder="Please input"
        type="textarea"
        autosize
        @keypress="handleEnter"
      />
      <div class="flex flex-row-reverse">
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, } from 'vue'

const emit = defineEmits<{
  (e: 'sendMessage', message: string): void
}>()

const toSendMessage = ref<string>('')

const sendMessage = () => {
  if (!toSendMessage.value) {
    return
  }
  emit('sendMessage', toSendMessage.value)
}

function handleEnter(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
}

function resetToSendMessage() {
  toSendMessage.value = ''
}

defineExpose({
  resetToSendMessage
})
</script>

<style scoped>
.footer:focus-within {
  border-color: var(--el-color-primary);
}
.el-textarea :deep(.el-textarea__inner) {
  resize: none;
  box-shadow: none;
}
</style>
