import { createApp } from 'vue'
import './assets/app.css'
import router from './router'
import axios from 'axios'
import {createPinia} from "pinia"
const pinia = createPinia()

import App from './App.vue'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.common['Accept'] = 'application/json';

createApp(App).use(router).use(pinia).mount('#app')
