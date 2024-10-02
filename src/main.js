import './main.css'
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App);

app.use(router);
app.use(MotionPlugin); 
app.use(store);

app.mount('#app');