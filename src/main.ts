import { auto } from 'browser-unhandled-rejection';
import { serviceWorkerUpdate } from 'web-utility';
import { createApp } from 'vue';
import { configure } from 'mobx';
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import ConfirmationService from 'primevue/confirmationservice';

import App from './App.vue';
import router from './router';

auto();
configure({ enforceActions: 'never' });

self.addEventListener('unhandledrejection', ({ reason }) => {
  const { message } = reason as Error;

  if (message) self.alert(message);
});

const { serviceWorker } = window.navigator,
  NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV !== 'development')
  serviceWorker
    ?.register('sw.js')
    .then(serviceWorkerUpdate)
    .then(worker => {
      if (window.confirm('New version of this Web App detected, update now?'))
        worker.postMessage({ type: 'SKIP_WAITING' });
    });

serviceWorker?.addEventListener('controllerchange', () =>
  window.location.reload()
);

createApp(App)
  .use(router)
  .use(PrimeVue, { theme: { preset: Lara } })
  .use(ConfirmationService)
  .mount('#app');
