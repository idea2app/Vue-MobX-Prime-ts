import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue(),
    legacy({
      targets: ['> 1%', 'last 2 versions', 'not dead'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    }),
    Components({ resolvers: [PrimeVueResolver()] })
  ]
});
