import { Component, toNative, Vue, Prop, TSX } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';

import { Button } from './ui/button';

import * as styles from './HelloWorld.module.css';

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

        <Button asChild>
          <button type="button" onClick={() => this.count++}>
            count is: {this.count}
          </button>
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
