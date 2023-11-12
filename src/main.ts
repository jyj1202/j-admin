import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores'
import '@/styles/index.scss'
/* vite-plugin-svg-icons */
import 'virtual:svg-icons-register'
/* element */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
/* install avue */
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
/* install glob components */
import installGlobComponents from "@/components/install";

const app = createApp(App)

app.use(router)
  .use(pinia)
  .use(ElementPlus)
  .use(Avue)
  .use(installGlobComponents)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
