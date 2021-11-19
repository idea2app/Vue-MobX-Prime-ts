import { configure } from 'mobx';
import { createApp } from 'vue';
import '@coreui/coreui/dist/css/coreui.min.css';

import App from './App.vue';
import router from './router';

configure({ enforceActions: 'never' });

createApp(App).use(router).mount('#app');
