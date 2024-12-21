import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores'
import '@/styles/index.scss'
import 'animate.css';
/* vite-plugin-svg-icons */
import 'virtual:svg-icons-register'
/* element */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
/* install glob components */
import installGlobComponents from "@/components/install";
import { vLazyImg } from "@/directives/lazyImg";
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

// import VConsole from 'vconsole';

// const vConsole = new VConsole();

const app = createApp(App)

app.use(router)
  .use(pinia)
  .use(ElementPlus)
  .use(installGlobComponents)
  .use(vLazyImg)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')

new APlayer({
  container: document.getElementById('aplayer'),
  fixed: true,
  order: 'random',
  loop: 'all',
  autoplay: true,
  audio: [
      {
          name: 'Merry Christmas Mr.Lawrence',
          url: new URL('/MerryChristmasMr_Lawrence.ogg', import.meta.url).href,
          cover: 'https://p2.music.126.net/PywoXPKK3AjseU0Wx9wdXw==/109951167267731534.jpg?param=130y130',
          theme: '#ebd0c2',
          artist: '坂本 龍一',
      },
      {
          name: 'ありがとう',
          url: new URL('/kokia.mp3', import.meta.url).href,
          cover: '/kokia.jpg',
          theme: '#46718b',
          artist: 'kokia',
      }
  ]
});
