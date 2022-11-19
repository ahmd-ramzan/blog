import { createApp } from 'vue'
import './assets/app.css'
import router from './router'
import axios from 'axios'

import App from './App.vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000'

createApp(App).use(router).mount('#app')
