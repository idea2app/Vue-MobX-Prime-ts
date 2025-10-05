import { FunctionalComponent, defineComponent, SetupContext } from 'vue';
import { Vue } from 'vue-facing-decorator';
import { Observer } from 'mobx-vue-lite';
import { Constructor } from 'web-utility';

type VueInstance = InstanceType<typeof Vue>;

/**
 * Observer decorator/wrapper for both class and function components.
 * Automatically tracks and reacts to MobX observable state changes.
 *
 * For function components:
 * @example
 * ```tsx
 * import { observer } from './observer';
 * import counterStore from './models/Counter';
 *
 * export const MyMobX = observer(() => (
 *   <button onClick={() => counterStore.increment()}>
 *     Count: {counterStore.count}
 *   </button>
 * ));
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
  ClassComponent: T,
  {}: ClassDecoratorContext<T>
): void | T;
export function observer<P extends Record<string, unknown> = {}>(
  functionComponent: FunctionalComponent<P>
): FunctionalComponent<P>;
export function observer(component: unknown): unknown {
  if (typeof component === 'function') {
    const { prototype } = component as { prototype?: Record<string, unknown> };

    if (prototype instanceof Vue || typeof prototype?.render === 'function') {
      const render = prototype?.render as
        | ((this: VueInstance) => unknown)
        | undefined;

      if (typeof render === 'function')
        Object.defineProperty(prototype, 'render', {
          writable: true,
          configurable: true,
          value: function (this: VueInstance) {
            return <Observer>{() => render.call(this)}</Observer>;
          }
        });
      return component;
    }
  }
  const FunctionComponent = component as FunctionalComponent<
    Record<string, unknown>
  >;
  return defineComponent({
    setup: (props: Record<string, unknown>, context: SetupContext) => () => (
      <Observer>{() => FunctionComponent(props, context)}</Observer>
    )
  });
}
