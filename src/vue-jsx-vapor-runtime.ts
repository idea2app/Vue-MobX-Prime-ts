import {
  Comment,
  Fragment,
  Text,
  cloneVNode,
  createBlock,
  createElementBlock,
  createElementVNode,
  createVNode,
  defineComponent,
  getCurrentInstance,
  isVNode,
  normalizeClass as normalizeClassValue,
  openBlock,
  renderList,
  withCtx
} from 'vue';

const cacheMap = new WeakMap<object, Record<string, any[]>>();

export function createVNodeCache(key: string) {
  const instance = getCurrentInstance();

  if (!instance) return [];

  if (!cacheMap.has(instance)) cacheMap.set(instance, {});

  const caches = cacheMap.get(instance)!;

  return caches[key] || (caches[key] = []);
}

const cloneIfMounted = (child: any) =>
  (child.el === null && child.patchFlag !== -1) || child.memo ? child : cloneVNode(child);

export function normalizeVNode(value: any, flag = 1): any {
  let create: any = createVNode;
  let block = false;

  if (typeof value === 'function') {
    block = true;
    openBlock();
    create = createBlock;
    value = value();
  }

  if (isVNode(value)) return cloneIfMounted(value);
  if (Array.isArray(value))
    return block
      ? createElementBlock(
          Fragment,
          null,
          value.map(node => normalizeVNode(() => node)),
          -2
        )
      : createElementVNode(Fragment, null, value.slice());
  if (value == null || typeof value === 'boolean') return create(Comment);

  return create(Text, null, String(value), flag);
}

const normalizeSlotValue = (value: any) =>
  Array.isArray(value) ? value.map(node => normalizeVNode(node)) : [normalizeVNode(value)];

export const normalizeSlot = (rawSlot: any) => {
  if (rawSlot._n) return rawSlot;
  if (typeof rawSlot !== 'function') return withCtx(() => normalizeSlotValue(rawSlot));

  return withCtx((...args: any[]) => normalizeSlotValue(rawSlot(...args)));
};

export const normalizeSlots = (slots: any) =>
  typeof slots === 'function' ||
  (Object.prototype.toString.call(slots) === '[object Object]' && !isVNode(slots))
    ? slots
    : { default: withCtx(() => [normalizeVNode(() => slots)]) };

export const normalizeClass = (value: any) => normalizeClassValue(value) || null;

export const For = defineComponent(
  (props: { in: any }, { slots }) => {
    return () =>
      (openBlock(true),
      createElementBlock(
        Fragment,
        null,
        renderList(props.in, (item: any, key: any, index: any) => {
          const defaultSlot = slots.default;
          const result = defaultSlot?.(item, key, index);

          return Array.isArray(result)
            ? result.length === 1
              ? result[0]
              : normalizeVNode(result)
            : result;
        }),
        128
      ));
  },
  { props: ['in'] }
);

export { defineComponent };
