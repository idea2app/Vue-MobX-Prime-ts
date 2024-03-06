import { createApp } from 'vue';
import '@coreui/coreui/dist/css/coreui.min.css';
import PrimeVue from 'primevue/config';

import App from './App.vue';
import router from './router';

createApp(App).use(router).use(PrimeVue).mount('#app');
