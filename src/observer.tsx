import { Component, toNative, Vue } from 'vue-facing-decorator';
import { Observer } from 'mobx-vue-lite';
import type { FunctionalComponent } from 'vue';

type Constructor<T = {}> = new (...args: any[]) => T;
type VueInstance = InstanceType<typeof Vue>;

/**
 * Decorator for class components that wraps the render method with MobX Observer
 * to automatically track and react to observable state changes.
 *
 * @example
 * ```tsx
 * import { Vue, Component, toNative } from 'vue-facing-decorator';
 * import { observable } from 'mobx';
 * import { classObserver } from './observer';
 *
 * @Component
 * @classObserver
 * class MyMobX extends Vue {
 *   @observable
 *   accessor count = 0;
 *
 *   render() {
 *     return <div>{this.count}</div>;
 *   }
 * }
 * export default toNative(MyMobX);
 * ```
 */
export function classObserver<T extends Constructor<VueInstance>>(
  ClassComponent: T
): T {
  const { render } = ClassComponent.prototype;

  if (render) {
    ClassComponent.prototype.render = function (this: VueInstance) {
      return <Observer>{() => render.call(this)}</Observer>;
    };
  }

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
 * import { observable } from 'mobx';
 * import { observer } from './observer';
 *
 * @Component
 * @observer
 * class MyMobX extends Vue {
 *   @observable
 *   accessor count = 0;
 *
 *   render() {
 *     return <div>{this.count}</div>;
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
export function observer<T extends Constructor<VueInstance>, P = {}>(
  component: T | FunctionalComponent<P>
): T | ReturnType<typeof toNative> {
  // Check if it's a class component (has prototype with render method or extends Vue)
  if (
    typeof component === 'function' &&
    (component.prototype instanceof Vue ||
      component.prototype?.render !== undefined)
  ) {
    return classObserver(component as T);
  }

  // Handle function component
  const functionComponent = component as FunctionalComponent<P>;

  @Component
  @classObserver
  class FunctionComponent extends Vue {
    render = functionComponent;
  }

  return toNative(FunctionComponent);
}
