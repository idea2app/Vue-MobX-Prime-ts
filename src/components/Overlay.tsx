import { FunctionalComponent } from 'vue';
import { observer } from 'mobx-vue-helper';
import ProgressSpinner from 'primevue/progressspinner';

import * as styles from './Overlay.module.less';

interface OverlayProps extends Record<string, unknown> {
  show?: boolean;
}

const Overlay: FunctionalComponent<OverlayProps> = (props, { slots }) => (
  <div
    class={[
      styles.box,
      { 'bg-light rounded-sm': props.show, show: props.show }
    ]}
  >
    {slots.default?.()}

    {props.show && (
      <div class={styles.spinner}>
        <ProgressSpinner />
      </div>
    )}
  </div>
);

export default observer(Overlay);
