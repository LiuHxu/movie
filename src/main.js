import './assets/main.css'
import axios from "axios"
import store from './store'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
createApp(App).use(router).use(ElementPlus).use(store).mount('#app')
// axios.defaults.baseURL = 'http://10.18.18.90:8080'; // 替换为后端项目的URL


// axios.defaults.baseURL = 'http://10.24.5.179:8080'; // 替换为后端项目的URL
axios.defaults.baseURL = 'http://localhost:8080'; // 替换为后端项目的URL
axios.defaults.headers.common['Authorization'] = 'Bearer token'; // 设置通用的请求头