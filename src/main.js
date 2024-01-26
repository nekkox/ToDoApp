//import './assets/main.css'

import { createApp } from "vue"
import router from "./router"
import App from "./App.vue"
import plugin from "./plugins/modals/index.js"
import "./assets/styles.css"
//import AppLink from '@/components/Sidebar/AppLink.vue'

const myApp = createApp(App)
//myApp.component('AppLink', AppLink)
myApp.use(router);
myApp.use(plugin); // Use your modal plugin

myApp.mount("#app");



