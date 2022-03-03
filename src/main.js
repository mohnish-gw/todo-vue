import { createApp } from 'vue'
 
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import ToggleButton from 'vue-js-toggle-button'





const app = createApp(App)

app.use(router)
app.use(ToggleButton)
//Vue.use(VueApollo)
// new Vue({
//     apolloProvider
// })
// app.use(apolloProvider)

app.mount('#app')
