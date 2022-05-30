import { createApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
import router from './router/index'
import './assets/font/iconfont.css';
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)


app
.use(NutUI)
.use(router)
.use(pinia)
.mount('#app')
