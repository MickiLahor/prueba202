import { createApp } from 'vue'

import Swal from 'sweetalert2'
window.Swal = Swal

//import Multiselect from '@vueform/multiselect'
import Select2 from 'vue3-select2-component'
import './assets/select2/css/select2-bootstrap4.css'

/*import VueSelect from 'vue-next-select'
import 'vue-next-select/dist/index.min.css'*/

//import VeeValidate from "vee-validate";

import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

import './assets/icons/css/free.min.css'
import './assets/icons/css/brand.min.css'
import './assets/coreui/css/coreui.min.css'
import './assets/coreui/js/coreui.bundle.min.js'

const app = createApp(App)
app.component('Select2', Select2)
app.use(store)
app.use(router)
app.mount('#app')