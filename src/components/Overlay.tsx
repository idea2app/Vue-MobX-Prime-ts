import { FunctionalComponent } from 'vue';
import { observer } from 'mobx-vue-helper';
import ProgressSpinner from 'primevue/progressspinner';

import * as styles from './Overlay.module.less';

interface OverlayProps extends Record<string, unknown> {
  show?: boolean;
}

const Overlay: FunctionalComponent<OverlayProps> = ({ show }, { slots }) => (
  <div class={[styles.box, { 'bg-light rounded-sm': show, show }]}>
    {slots.default?.()}

    {show && (
      <div class={styles.spinner}>
        <ProgressSpinner />
      </div>
    )}
  </div>
);

export default observer(Overlay);
