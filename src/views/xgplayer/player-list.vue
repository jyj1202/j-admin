<template>
  <div>
    <div class="xgplayer-container" ref="playerContainerRef"></div>

    <!-- <el-button type="primary" @click="fullscreenPlayer">fullscreen</el-button> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import XgPlayer from 'xgplayer';
import "xgplayer/dist/index.min.css";
// import volume from 'xgplayer/dist/controls/volume';
// import playbackRate from 'xgplayer/dist/controls/playbackRate';
import { videoListData } from "./videoSrc";
import { PlayListButton, PlayListDrawer } from './plugin'
import "./plugin.css";

const playerContainerRef = ref<HTMLDivElement>()

const fullscreenPlayer = () => {
  playerContainerRef.value?.requestFullscreen()
}
let player = null
onMounted(() => {
  initPlayer(playerContainerRef.value!)
})
function initPlayer(playerContainer: HTMLDivElement) {
  player = new XgPlayer({
    el: playerContainer,
    url: videoListData[0]?.children[0].src,
    playsinline: true,
    // fitVideoSize: 'fixWidth',
    fluid: true, // 流式布局
    // width: '100%',
    cssFullscreen: true,
    fullscreen: {
      useCssFullscreen: true // 全屏按钮将会调用页面内全屏
    },
    // rotate: true,
    // ignores: ['fullscreen', 'volume'],
    // playNext: {
    //     urlList: [
    //       '/video2.mp4',
    //       '/video3.mp4',
    //     ],
    // },
    lastPlayTime: 5, //视频起播时间（单位：秒）
    lastPlayTimeHideDelay: 5, //提示文字展示时长（单位：秒）
    // controls: false,
    // rotateFullscreen: true
    // width: '100%',
    // height: '100%',
    // controls: true,
    // controlPlugins: [volume, playbackRate],
    // playbackRate: [0.5, 0.75, 1, 1.5, 2],
    plugins: [PlayListButton, PlayListDrawer],  // 配置参数注册插件
  })
  player.registerPlugin(PlayListButton, {
    index: 1
  })
  player.registerPlugin(PlayListDrawer, {
    playlist: videoListData
  })

  
}

</script>

<style scoped>

</style>
