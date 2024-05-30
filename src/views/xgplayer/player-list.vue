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
import { PlaylistButton, PlaylistDrawer } from './plugin'
import "./plugin.css";

const playerContainerRef = ref<HTMLDivElement>()

const fullscreenPlayer = () => {
  playerContainerRef.value?.requestFullscreen()
}
let player = null
onMounted(() => {
  initPlayer(playerContainerRef.value!)
})

const urlList = videoListData.filter(i => i.src).map(i => i.src)

function initPlayer(playerContainer: HTMLDivElement) {
  player = new XgPlayer({
    el: playerContainer,
    url: videoListData[1].src,
    playsinline: true,
    // fitVideoSize: 'fixWidth',
    fluid: true, // 流式布局
    // width: '100%',
    cssFullscreen: true,
    fullscreen: {
      useCssFullscreen: true // 全屏按钮将会调用页面内全屏
    },
    // rotate: true,
    ignores: ['volume'],
    playNext: {
        urlList: urlList,
    },
    lastPlayTime: 5, //视频起播时间（单位：秒）
    lastPlayTimeHideDelay: 5, //提示文字展示时长（单位：秒）
    // controls: false,
    // rotateFullscreen: true
    // width: '100%',
    // height: '100%',
    // controls: true,
    // controlPlugins: [volume, playbackRate],
    // playbackRate: [0.5, 0.75, 1, 1.5, 2],
    // plugins: [PlaylistButton, PlaylistDrawer],  // 配置参数注册插件
  })
  player.registerPlugin(PlaylistButton, {
    index: 1
  })
  player.registerPlugin(PlaylistDrawer, {
    playlist: videoListData
  })

  
}

</script>

<style scoped>

</style>
