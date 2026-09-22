import { h, type Component, FunctionalComponent } from 'vue';

import { Button } from './ui/button';

export interface IconButtonProps {
  icon: Component;
  label: string;
  onClick?: () => any;
}

export const IconButton: FunctionalComponent<IconButtonProps> = ({ icon, label, onClick }) => (
  <Button asChild size="icon" variant="ghost">
    <button aria-label={label} onClick={onClick}>
      {h(icon)}
    </button>
  </Button>
);
