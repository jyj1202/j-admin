<template>
  <div>
    <span @click="click">fafa</span>
    <video class="video-js w-full" ref="videoPlayer" playsinline controlslist="nodownload noremoteplayback nofullscreen">
      <source :src="video1.src" />
    </video>
  </div>
</template>

<script setup lang="ts">
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./videojs-playlist.css"
import { onMounted, ref, onBeforeUnmount } from "vue";
import { video1, videoListData } from "./videoSrc";
import { PlayListPlugin } from "./videojs-playlist";



videojs.registerPlugin('playListPlugin', PlayListPlugin)


const videoPlayer = ref<HTMLVideoElement>()
let vPlayer: any = null

interface ListItem {label: string; src: string; poster: string; chapter?: boolean;}

const click = () => { console.log('click span') }

onMounted(() => {
  vPlayer = videojs(
    videoPlayer.value!,
    {
      autoplay: false,
      preferFullWindow: true,
      height: 500,
      controls: true,
      controlBar: {
        children: [
          'playToggle', // 播放/暂停按钮
          'currentTimeDisplay', // 当前时间
          'timeDivider', // 时间分隔符
          'durationDisplay', // 总时长
          'progressControl', // 进度条
          'playbackRateMenuButton',
          'showPlaylistButton', // 自定义按钮
          'pageFullscreenToggle',
          // 'fullscreenToggle',
        ]
      },
      plugins: {
        playListPlugin: {
          playlist: videoListData,
          currentIndex: 1,
          // generateListHtml(playlist: ListItem[], triggerToggle: (arg: object) => void) {
          //   const fragment = document.createDocumentFragment()
          //   playlist.forEach(item => {
          //     const listItem = createPlayListItem(item, triggerToggle)
          //     fragment.appendChild(listItem)
          //   });
          //   return fragment
          // }
        }
      }
    },
    () => {
      
    }
  );
});

function createPlayListItem(item: ListItem, triggerToggle: (arg: object) => void) {
  const li = document.createElement('li')
  li.innerText = item.label
  if (item.chapter) {
    li.classList.add('vjs-playlist-chapter')
  } else {
    li.classList.add('vjs-playlist-item')
    li.addEventListener('click', (e) => {
      console.log('li click');
      
      e.stopPropagation()
      triggerToggle(item)
    }, true)
  }
  return li
}


onBeforeUnmount(() => {
  vPlayer?.dispose();
})



</script>

<style>
video::-webkit-media-controls {
  display: none !important;
}
video::-webkit-media-controls-enclosure {
  display: none !important;
}
video::-webkit-media-controls-panel {
  display: none !important;
}
</style>
