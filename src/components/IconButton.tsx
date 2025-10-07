import { FunctionalComponent } from 'vue';
import { observer } from 'mobx-vue-helper';

export interface IconButtonProps extends Record<string, unknown> {
  icon: string;
  onClick?: () => any;
}

export const IconButton: FunctionalComponent<IconButtonProps> = observer(
  ({ icon, onClick }) => (
    <button
      class="appearance-none bg-transparent border-none cursor-pointer"
      onClick={onClick}
    >
      <i class={`pi pi-${icon}`} />
    </button>
  )
);
