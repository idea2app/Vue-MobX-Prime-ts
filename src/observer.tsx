import { Component, toNative, Vue } from 'vue-facing-decorator';
import { h } from 'vue';
import { Observer } from 'mobx-vue-lite';
import type { FunctionalComponent } from 'vue';

type Constructor<T = {}> = new (...args: any[]) => T;
type VueInstance = InstanceType<typeof Vue>;

function classObserver<T extends Constructor<VueInstance>>(
  ClassComponent: T
): T {
  const { render } = ClassComponent.prototype;

  if (render)
    ClassComponent.prototype.render = function (this: VueInstance) {
      return <Observer>{() => render.call(this)}</Observer>;
    };

  return ClassComponent;
}

/**
 * Observer decorator/wrapper for both class and function components.
 * Automatically tracks and reacts to MobX observable state changes.
 *
 * For function components:
 * @example
 * ```tsx
 * import { observer } from './observer';
 * import store from './store';
 *
 * export const MyMobX = observer(() => <div>{store.count}</div>);
 * ```
 *
 * For class components:
 * @example
 * ```tsx
 * import { Vue, Component, toNative } from 'vue-facing-decorator';
 * import { observer } from './observer';
 * import counterStore from './models/Counter';
 *
 * @Component
 * @observer
 * class MyMobX extends Vue {
 *   render() {
 *     return <button onClick={() => counterStore.increment()}>
 *       Count: {counterStore.count}
 *     </button>;
 *   }
 * }
 * export default toNative(MyMobX);
 * ```
 */
export function observer<T extends Constructor<VueInstance>>(
  ClassComponent: T
): T;
export function observer<P = {}>(
  functionComponent: FunctionalComponent<P>
): ReturnType<typeof toNative>;
export function observer<T extends Constructor<VueInstance>, P extends {} = {}>(
  component: T | FunctionalComponent<P>
): T | ReturnType<typeof toNative> {
  if (
    typeof component === 'function' &&
    (component.prototype instanceof Vue ||
      typeof component.prototype?.render === 'function')
  ) {
    return classObserver(component as T);
  }

  const functionComponent = component as FunctionalComponent<P>;

  @Component
  class FunctionComponent extends Vue {
    render() {
      return h(Observer, null, { default: functionComponent });
    }
  }

  return toNative(FunctionComponent);
}
