<template>
  <div ref="scrollRef">
    <div v-for="(log, index) in logList" :key="index">
      <div>{{ log.type }}--{{ log.msg }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick } from "vue";
import { useLock } from "@/utils/index";



let requestCount = 0
function mockApiRequest(param: any) {
  const count = ++requestCount
  return new Promise<string>((resolve, reject) => {
    const random = Math.random()
    const time = 5000
    setTimeout(() => {
      random > 0.5 ? resolve(`success, res:${param}第${count}次请求，耗时${random * time}毫秒`)
        : reject(`error，第${count}次请求，耗时${random * time}毫秒`);
    }, random * time);
  });
}

const logList = ref<any[]>([])
const scrollRef = ref<HTMLElement>()
const handler = useLock<any[], void>(async (param: any) => {
  try {
    const msg = await mockApiRequest(param)
    logList.value.push({
      msg,
      type: 'success'
    })
    nextTick(()=> {
      scrollRef.value && scrollRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' })
    })
  } catch (msg) {
    logList.value.push({
      msg,
      type: 'failed'
    }) 
  }
})
const polling = setInterval((param: any)=>handler(param), 1000, 'param')

onBeforeUnmount(() => {
  polling && clearInterval(polling)
})

</script>

<style scoped>

</style>
