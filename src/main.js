//import './assets/main.css'

import { createApp } from "vue"
import App from "./App.vue"
import plugin from "./plugins/modals/index.js"
import "./assets/styles.css"
const myApp = createApp(App)

myApp.use(plugin); // Use your modal plugin

myApp.mount("#app");



