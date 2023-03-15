import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import screenUI from '@ahsdata-ui/components';

import router from './router';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App).use(screenUI).use(ElementPlus).use(router).mount('#app');
