import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Service from '@/plugins/axios';
import Storage from '@/plugins/Storage';
import './assets/main.scss';
import './firebase';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Service);
app.use(Storage);
app.mount('#app');
