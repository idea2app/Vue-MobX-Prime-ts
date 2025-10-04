import { Component, toNative, Vue } from 'vue-facing-decorator';
import { Second } from 'web-utility';

import { observer } from '../observer';
import counterStore from '../models/Counter';

/**
 * Forked from Hello World example of WebCell v3: {@link https://github.com/EasyWebApp/WebCell-scaffold/blob/b0709951eba0550e38e803b4d93e968c9f7215b6/src/page/Clock.tsx}
 */
@Component
@observer
class ClassDecoratorExample extends Vue {
  time = new Date();

  private timer?: number;

  mounted() {
    this.timer = window.setInterval(() => (this.time = new Date()), Second);
  }

  unmounted() {
    if (this.timer) clearInterval(this.timer);
  }

  render() {
    return (
      <>
        <h1>Hello World from Decorator Component!</h1>

        <h2>
          MobX <code>@observer</code> example
        </h2>
        <div>
          <p>Count: {counterStore.count}</p>
          <button onClick={() => counterStore.increment()}>Increment</button>
        </div>

        <h2>Timer example</h2>
        <time datetime={this.time.toJSON()}>{this.time.toLocaleString()}</time>

        <h2>References</h2>
        <ol>
          <li>
            <a
              target="_blank"
              href="https://vuejs.org/guide/extras/render-function#jsx-tsx"
            >
              JSX/TSX in Vue 3
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://facing-dev.github.io/vue-facing-decorator/"
            >
              Vue facing decorator
            </a>
          </li>
        </ol>
      </>
    );
  }
}
export default toNative(ClassDecoratorExample);
