import { Component, toNative, Vue } from 'vue-facing-decorator';
import { h, type VNode } from 'vue';
import { Reaction } from 'mobx';
import { Observer } from 'mobx-vue-lite';
import type { FunctionalComponent } from 'vue';

type Constructor<T = {}> = new (...args: any[]) => T;
type VueInstance = InstanceType<typeof Vue>;

/**
 * Decorator for class components that makes render reactive to MobX observable state changes.
 * Uses MobX Reaction to track observables accessed during render.
 *
 * Important: Use makeObservable() in the constructor with regular properties, not @observable accessor.
 * The accessor syntax creates private fields that don't work with the observer pattern in class components.
 *
 * @example
 * ```tsx
 * import { Vue, Component, toNative } from 'vue-facing-decorator';
 * import { makeObservable, observable } from 'mobx';
 * import { classObserver } from './observer';
 *
 * @Component
 * @classObserver
 * class MyMobX extends Vue {
 *   count = 0;
 *
 *   constructor() {
 *     super();
 *     makeObservable(this, {
 *       count: observable
 *     });
 *   }
 *
 *   render() {
 *     return <button onClick={() => this.count++}>Count: {this.count}</button>;
 *   }
 * }
 * export default toNative(MyMobX);
 * ```
 */
export function classObserver<T extends Constructor<VueInstance>>(
  ClassComponent: T
): T {
  const { render, mounted, unmounted } = ClassComponent.prototype;

  if (!render) return ClassComponent;

  // Store original lifecycle methods
  const originalMounted = mounted;
  const originalUnmounted = unmounted;

  // Add a property to store the reaction
  let reactionMap = new WeakMap<VueInstance, Reaction>();

  ClassComponent.prototype.mounted = function (this: VueInstance) {
    // Call original mounted if it exists
    if (originalMounted) originalMounted.call(this);

    // Create a reaction that tracks observables and triggers re-render
    const reaction = new Reaction(`${ClassComponent.name}.render()`, () => {
      // Force Vue to re-render by calling $forceUpdate
      this.$forceUpdate();
    });

    reactionMap.set(this, reaction);

    // Trigger initial render tracking
    this.$forceUpdate();
  };

  ClassComponent.prototype.unmounted = function (this: VueInstance) {
    // Dispose the reaction when component unmounts
    const reaction = reactionMap.get(this);
    if (reaction) {
      reaction.dispose();
      reactionMap.delete(this);
    }

    // Call original unmounted if it exists
    if (originalUnmounted) originalUnmounted.call(this);
  };

  // Wrap render to track with the reaction
  const originalRender = render;
  ClassComponent.prototype.render = function (this: VueInstance) {
    const reaction = reactionMap.get(this);
    let rendering!: VNode;

    if (reaction) {
      // Track observables accessed during render
      reaction.track(() => {
        rendering = originalRender.call(this);
      });
    } else {
      // Before mount, just render normally
      rendering = originalRender.call(this);
    }

    return rendering;
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
 * import { makeObservable, observable } from 'mobx';
 * import { observer } from './observer';
 *
 * @Component
 * @observer
 * class MyMobX extends Vue {
 *   count = 0;
 *
 *   constructor() {
 *     super();
 *     makeObservable(this, {
 *       count: observable
 *     });
 *   }
 *
 *   render() {
 *     return <button onClick={() => this.count++}>Count: {this.count}</button>;
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
  class FunctionComponent extends Vue {
    render() {
      // Pass empty props and context for function component
      return functionComponent({} as P, {} as any);
    }
  }

  // Apply observer after class is defined so render is on prototype
  return toNative(classObserver(FunctionComponent));
}
