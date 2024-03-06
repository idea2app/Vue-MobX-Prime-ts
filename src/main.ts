import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';

import App from './App.vue';
import router from './router';

createApp(App).use(router).use(PrimeVue).use(ConfirmationService).mount('#app');
