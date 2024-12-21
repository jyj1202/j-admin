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
import { fetchEventSource } from "@microsoft/fetch-event-source";

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

const currentMessageList = ref<Text[]>(data[0].data)

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
    text: '',
    inversion: false,
    error: false,
    loading: false,
  }
  currentMessageList.value.push(newMessage)
  scrollToBottom()
  // try {
  //   const last = currentMessageList.value.at(-1)!
  //   const res = await fetch('http://localhost:3000/conversation', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       text: text
  //     }),
  //   })
  //   const reader = res.body!.getReader();
  //   while (1) {
  //     const {done, value} = await reader.read();
  //     if (done) {
  //       break;
  //     } 
  //     else {
  //       const text = new TextDecoder().decode(value);
  //       console.log(text.replace('\n\n', '').replace('data:', ''));
  //       if (text.includes('event: end')) {
  //         return
  //       }
  //       const filteredText = text.replace('\n\n', '').replace('data:', '')
  //       filteredText && (last.text += filteredText)
  //       scrollToBottom()
  //     }
  //   }
  // } catch (error) {
    
  // }

  const last = currentMessageList.value.at(-1)!
  fetchEventSource('http://localhost:3000/conversation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: text
    }),
    onmessage(event) {
      console.info(event.data, typeof event.data);
      const data = event.data
      if (data.includes('[DONE]')) {
        last.loading = false
      } else {
        last.text += event.data
        scrollToBottom()
      }
    },
    onerror() {
      console.log('err')
    }
  })
}

</script>

<style scoped>

</style>
