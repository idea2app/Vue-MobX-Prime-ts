import { FunctionalComponent } from 'vue';
import { observer } from 'mobx-vue-helper';

interface IconButtonProps extends Record<string, unknown> {
  icon: string;
}

const IconButton: FunctionalComponent<IconButtonProps> = props => (
  <button class="appearance-none bg-transparent border-none cursor-pointer">
    <i class={`pi pi-${props.icon}`} />
  </button>
);

export default observer(IconButton);
