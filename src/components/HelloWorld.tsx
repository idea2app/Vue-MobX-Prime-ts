import { Component, toNative, Vue, Prop, TSX } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';
import Button from 'primevue/button';

import * as styles from './HelloWorld.module.less';

@Component
@observer
class HelloWorld extends TSX<{ msg: string }>()(Vue) {
  @Prop({ type: String, required: true })
  readonly msg!: string;

  count = 0;

  render() {
    return (
      <div class={styles}>
        <h1>{this.msg}</h1>

        <p>
          See <code>README.md</code> for more information.
        </p>

        <p>
          <a href="https://parceljs.org/languages/vue/" target="_blank">
            Parcel docs
          </a>
          {' | '}
          <a href="https://v3.vuejs.org/" target="_blank">
            Vue 3 docs
          </a>
        </p>

        <Button type="button" severity="primary" onClick={() => this.count++}>
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
