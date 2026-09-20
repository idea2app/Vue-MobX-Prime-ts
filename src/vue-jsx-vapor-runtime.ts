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
  withCtx,
  type ComponentInternalInstance,
  type Slot,
  type Slots,
  type VNode,
  type VNodeChild
} from 'vue';

const cacheMap = new WeakMap<ComponentInternalInstance, Record<string, VNode[]>>();

export function createVNodeCache(key: string): VNode[] {
  const instance = getCurrentInstance();

  if (!instance) return [];

  if (!cacheMap.has(instance)) cacheMap.set(instance, {});

  const caches = cacheMap.get(instance)!;

  return caches[key] || (caches[key] = []);
}

const cloneIfMounted = (child: VNode): VNode =>
  (child.el === null && child.patchFlag !== -1) ||
  ('memo' in child && (child as VNode & { memo?: unknown }).memo != null)
    ? child
    : cloneVNode(child);

export function normalizeVNode(value: unknown, flag = 1): VNode {
  let create: typeof createVNode | typeof createBlock = createVNode;
  let block = false;

  if (typeof value === 'function') {
    block = true;
    openBlock();
    create = createBlock;
    value = (value as () => unknown)();
  }

  if (isVNode(value)) return cloneIfMounted(value as VNode);
  if (Array.isArray(value))
    return block
      ? createElementBlock(
          Fragment,
          null,
          value.map((node: unknown) => normalizeVNode(() => node)),
          -2
        )
      : createElementVNode(Fragment, null, value.slice());
  if (value == null || typeof value === 'boolean') return create(Comment);

  return create(Text, null, String(value), flag);
}

const normalizeSlotValue = (value: unknown): VNode[] =>
  Array.isArray(value)
    ? value.map((node: unknown) => normalizeVNode(node))
    : [normalizeVNode(value)];

export const normalizeSlot = (rawSlot: unknown): Slot => {
  if (typeof rawSlot === 'function') {
    const slot = rawSlot as Slot & { _n?: boolean };

    if (slot._n) return slot;

    return withCtx((...args: unknown[]) => normalizeSlotValue(slot(...args))) as Slot;
  }

  return withCtx(() => normalizeSlotValue(rawSlot)) as Slot;
};

export const normalizeSlots = (slots: unknown): Slots => {
  if (typeof slots === 'function') return { default: normalizeSlot(slots) };

  if (Object.prototype.toString.call(slots) === '[object Object]' && !isVNode(slots))
    return slots as Slots;

  return { default: withCtx(() => [normalizeVNode(() => slots)]) as Slot };
};

export const normalizeClass = (value: unknown): string | null =>
  normalizeClassValue(value as string | Record<string, boolean> | Array<unknown>) || null;

export const For = defineComponent(
  (props: { in: unknown }, { slots }) => {
    return () => (
      openBlock(true),
      createElementBlock(
        Fragment,
        null,
        renderList(props.in, (item: unknown, key: unknown, index: number): VNodeChild => {
          const defaultSlot = slots.default;
          const result = defaultSlot?.(item, key, index);

          return Array.isArray(result)
            ? result.length === 1
              ? result[0]
              : normalizeVNode(result)
            : result;
        }),
        128
      )
    );
  },
  { props: ['in'] }
);

export { defineComponent };
