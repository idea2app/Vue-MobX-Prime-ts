import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('ec-')
        }
      }
    }),
    legacy({
      targets: ['> 1%', 'last 2 versions', 'not dead'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ]
});
