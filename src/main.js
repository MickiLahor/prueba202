import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import './assets/icons/css/free.min.css'
import './assets/icons/css/brand.min.css'
import './assets/coreui/css/coreui.min.css'
import './assets/coreui/js/coreui.bundle.min.js'

createApp(App).use(store).use(router).mount('#app')
