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
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
/* install glob components */
import installGlobComponents from "@/components/install";

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(installGlobComponents)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
