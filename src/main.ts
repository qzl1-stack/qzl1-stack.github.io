import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import { router } from './router'
import { init_theme_mode } from './lib/theme'
import './style.css'

const app = createApp(App)
const head = createHead()

init_theme_mode()
app.use(router)
app.use(head)
app.mount('#app')
