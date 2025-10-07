import { Component, toNative, Vue, Prop } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';
import Button from 'primevue/button';

import * as styles from './HelloWorld.module.less';

@Component
@observer
class HelloWorld extends Vue {
  @Prop({ type: String, required: true }) readonly msg!: string;

  count = 0;

  render() {
    return (
      <div class={styles}>
        <h1>{this.msg}</h1>

        <p>
          Recommended IDE setup:
          <a href="https://code.visualstudio.com/" target="_blank">
            VSCode
          </a>
          {' + '}
          <a href="https://github.com/johnsoncodehk/volar" target="_blank">
            {' '}
            Volar{' '}
          </a>
        </p>

        <p>
          See <code>README.md</code> for more information.
        </p>

        <p>
          <a href="https://vitejs.dev/guide/features.html" target="_blank">
            Vite Docs
          </a>
          {' | '}
          <a href="https://v3.vuejs.org/" target="_blank">
            Vue 3 Docs
          </a>
        </p>

        <Button
          type="button"
          severity="primary"
          onClick={() => this.count++}
        >
          count is: {this.count}
        </Button>
        <p>
          Edit <code>components/HelloWorld.vue</code> to test hot module
          replacement.
        </p>
      </div>
    );
  }
}

export default toNative(HelloWorld);
