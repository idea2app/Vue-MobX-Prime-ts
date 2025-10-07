import { FunctionalComponent } from 'vue';
import { observer } from 'mobx-vue-helper';

interface StockNumberProps extends Record<string, unknown> {
  value?: number;
  extent: number;
}

const StockNumber: FunctionalComponent<StockNumberProps> = (
  { extent, value },
  { slots }
) => (
  <span
    class={{
      'text-red-500': extent > 0,
      'text-gray-500': extent === 0,
      'text-green-500': extent < 0
    }}
  >
    {slots.before?.()}
    {(+(value != null ? value : extent)).toFixed(2)}
    {slots.after?.()}
  </span>
);

export default observer(StockNumber);
