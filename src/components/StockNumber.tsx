import { FunctionalComponent } from 'vue';
import { observer } from 'mobx-vue-helper';

interface StockNumberProps extends Record<string, unknown> {
  value?: number;
  extent: number;
}

const StockNumber: FunctionalComponent<StockNumberProps> = (props, { slots }) => (
  <span
    class={{
      'text-red-500': props.extent > 0,
      'text-gray-500': props.extent === 0,
      'text-green-500': props.extent < 0
    }}
  >
    {slots.before?.()}
    {(+(props.value != null ? props.value : props.extent)).toFixed(2)}
    {slots.after?.()}
  </span>
);

export default observer(StockNumber);
