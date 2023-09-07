import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementIcons from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

import '@/styles/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

Object.keys(ElementIcons).forEach((key) => {
  app.component(key, ElementIcons[key as keyof typeof ElementIcons])
})

app.mount('#app')
