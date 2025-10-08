import { FunctionalComponent } from 'vue';
import { observer } from 'mobx-vue-helper';
import ProgressSpinner from 'primevue/progressspinner';

import * as styles from './Overlay.module.css';

export interface OverlayProps extends Record<string, unknown> {
  show?: boolean;
}

export const Overlay: FunctionalComponent<OverlayProps> = observer(({ show }, { slots }) => (
  <div class={[styles.box, { 'bg-light rounded-sm': show, show }]}>
    {slots.default?.()}

    {show && (
      <div class={styles.spinner}>
        <ProgressSpinner />
      </div>
    )}
  </div>
));
