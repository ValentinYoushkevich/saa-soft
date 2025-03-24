import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import "@mdi/font/css/materialdesignicons.css"
import { createVuetify } from "vuetify"
import "vuetify/styles"

const app = createApp(App)
const vuetify = createVuetify();

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
