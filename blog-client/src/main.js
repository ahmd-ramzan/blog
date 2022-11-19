import { createApp } from 'vue'
import './assets/app.css'
import router from './router'
import axios from 'axios'
import {createPinia} from "pinia"
const pinia = createPinia()

import App from './App.vue'

axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.withCredentials = true

createApp(App).use(router).use(pinia).mount('#app')
