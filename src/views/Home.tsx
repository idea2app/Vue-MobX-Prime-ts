import { observer } from 'mobx-vue-helper';

import HelloWorld from '../components/HelloWorld';

const VueLogo = new URL('../assets/logo.png', import.meta.url) + '';

export default observer(() => (
  <div class="home text-center">
    <img alt="Vue logo" src={VueLogo} />

    {/* @ts-expect-error - Component props typing */}
    <HelloWorld msg="Welcome to Your Vue.js + MobX + TypeScript + PrimeVue App" />
  </div>
));
