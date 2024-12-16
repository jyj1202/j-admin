<template>
  <div>
    <div class="xgplayer-container" ref="playerContainerRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import XgPlayer from 'xgplayer';
import "xgplayer/dist/index.min.css";


const playerContainerRef = ref<HTMLDivElement>()

let player = null
onMounted(() => {
  initPlayer(playerContainerRef.value!)
})

function initPlayer(playerContainer: HTMLDivElement) {
  player = new XgPlayer({
    el: playerContainer,
    url: '/video1.mp4',
    playsinline: true,
    fluid: true, // 流式布局
    cssFullscreen: false,
    fullscreen: {
      disable: true
    },
    ignores: ['volume'],
    lastPlayTime: 5, //视频起播时间（单位：秒）
    lastPlayTimeHideDelay: 5, //提示文字展示时长（单位：秒）
    progressDot: [
      {
        id: 0,         // 唯一标识，用于删除的时候索引
        time: 1,      // 展示的时间点，例子为在播放到10s钟的时候展示
        text: 'Demo1',  // hover的时候展示文案，可以为空
        duration: 0.1,   // 展示时间跨度，单位为s
        style: {       // 指定样式
            // backgroundColor: 'red'
        }
      },
      {
        id: 0,         // 唯一标识，用于删除的时候索引
        time: 2,      // 展示的时间点，例子为在播放到10s钟的时候展示
        text: 'Demo2\r\ngaghaghakhgkjas\ngagah',  // hover的时候展示文案，可以为空
        // duration: 5,   // 展示时间跨度，单位为s
        style: {       // 指定样式
            // backgroundColor: 'red'
        }
      },
    ],
  })
  
}

</script>

<style scoped>

</style>
