import { FunctionalComponent } from 'vue';

export interface IconButtonProps {
  icon: string;
  onClick?: () => any;
}

export const IconButton: FunctionalComponent<IconButtonProps> = ({ icon, onClick }) => (
  <button class="appearance-none bg-transparent border-none cursor-pointer" onClick={onClick}>
    <i class={`pi pi-${icon}`} />
  </button>
);
