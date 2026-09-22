import { observer } from 'mobx-vue-helper';

import HelloWorld from '../components/HelloWorld';

const VueLogo = new URL('../assets/logo.png', import.meta.url) + '';

export default observer(() => (
  <div class="home text-center">
    <img class="mx-auto block" alt="Vue logo" src={VueLogo} />

    <HelloWorld msg="Welcome to Your Vue.js + MobX + TypeScript + ShadcnVue App" />
  </div>
));
