import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.'
import ElementPlus from 'element-plus'
import axios from 'axios'

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)

app.mount('#app')
