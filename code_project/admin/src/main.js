import './assets/main.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.'
import ElementPlus from 'element-plus'
import '@/util/axios.config'
import Particles from "@tsparticles/vue3";

import { loadSlim } from '@tsparticles/slim'




const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)

app.use(Particles, {
    init: async engine => {

        await loadSlim(engine);
    },
});
app.mount('#app')
