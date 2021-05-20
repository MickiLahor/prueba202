import { createApp } from 'vue'

import Swal from 'sweetalert2'
window.Swal = Swal

import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

//import Multiselect from '@vueform/multiselect'
import Select2 from 'vue3-select2-component'
import './assets/select2/css/select2-bootstrap4.css'

//import VueSelect from 'vue-next-select'
//import 'vue-next-select/dist/index.min.css'

//import VeeValidate from "vee-validate";

//import docx4js from "docx4js";
//import mammoth from "mammoth";

import './assets/icons/css/free.min.css'
import './assets/icons/css/brand.min.css'
import './assets/coreui/css/coreui.min.css'
import './assets/coreui/js/coreui.bundle.min.js'

//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjIsImNpIjoiNzU2NDQyMCIsImlhdCI6MTYyMTQzMjgyMCwiZXhwIjoxNjUyOTkwNDIwfQ.2wwRXD2HdNIOXaoluHu58MK0ucR3C00EaQasAfGsVJc'
const token = store.getters.token
if (token) {
	axios.defaults.headers.common['Authorization'] = token
}

const app = createApp(App)
app.mixin({
	methods: {
		dateFormatES: function (dateString) {
			return dateString.split("-").reverse().join("-");
		}
	},
})
app.component('Select2', Select2)
//app.component('vue-select', VueSelect)
app.use(store)
app.use(router)
app.mount('#app')