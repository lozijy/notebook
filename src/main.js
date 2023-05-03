import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import credentials from "../credentials";

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.provide('credentials',credentials)
app.mount('#app')
