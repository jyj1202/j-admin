<template>
  <div class="main flex flex-col h-full overflow-hidden">
    <div ref="scrollRef" class="message flex-1 overflow-y-auto pb-5">
      <Message
        v-for="(item, index) in currentMessageList"
        :key="index"
        :date-time="item.dateTime"
        :text="item.text"
        :inversion="item.inversion"
        :error="item.error"
        :loading="item.loading"
      />
    </div>
    <Footer ref="footerRef" class="" @send-message="sendMessage"></Footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import Footer from "./components/Footer.vue";
import Message from "./components/Message/index.vue";
import data from "./data.json";
import { useScroll } from '@/hooks/useScroll'

const footerRef = ref<InstanceType<typeof Footer>>()

const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll()

scrollToBottom()

interface Text {
  dateTime?: string
  text?: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
}

const currentMessageList = ref<Message[]>(data[0].data)

const sendMessage = async (toSendMessage: string) => {
  const text = toSendMessage
  footerRef.value!.resetToSendMessage()
  const message: Text = {
    dateTime: new Date().toLocaleString(),
    text: text,
    inversion: true,
    error: undefined,
    loading: true,
  }
  currentMessageList.value.push(message)
  const newMessage: Text = {
    dateTime: new Date().toLocaleString(),
    text: undefined,
    inversion: false,
    error: false,
    loading: false,
  }
  currentMessageList.value.push(newMessage)
  scrollToBottom()
  try {
    const last = currentMessageList.value.at(-1)!
    await axios.post<any, any, Message>('http://localhost:3000/fake-gpt', {
      text: text,
    }, {
      onDownloadProgress: ({ event }) => {
          const xhr = event.target
          const { responseText } = xhr
          // Always process the final line
          console.log(xhr, xhr.responseText.lastIndexOf('\n', responseText.length - 2));
          
          const lastIndex = responseText.lastIndexOf('\n', responseText.length - 2)
          let chunk = responseText
          if (lastIndex !== -1)
          chunk = responseText.substring(lastIndex)
        try {
          let lastText = ''
          console.log(lastIndex, chunk, 'data');
          
          last.text = lastText + (chunk ?? ''),
          lastText = chunk
          last.loading = false
          
            scrollToBottomIfAtBottom()
          }
          catch (error) {
            //
            console.log(error);
            
          }
        },
    })
    // console.log(res);
    // const last = currentMessageList.value.at(-1)!
    // last.text = res.data.text
    // last.loading = false
    // last.error = false
    // scrollToBottom()
  } catch (error) {
    newMessage.error = true
  }
}

</script>

<style scoped>

</style>
