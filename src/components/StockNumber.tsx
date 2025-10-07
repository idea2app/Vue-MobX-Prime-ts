import { FunctionalComponent } from 'vue';

export interface StockNumberProps {
  value?: number;
  extent: number;
}

export const StockNumber: FunctionalComponent<StockNumberProps> = (
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
