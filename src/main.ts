import { createApp } from 'vue';
import '@coreui/coreui/dist/css/coreui.min.css';

import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
