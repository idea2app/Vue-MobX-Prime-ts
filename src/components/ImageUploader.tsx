import { Component, toNative, Vue, Watch, Prop, TSX } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';

import { Overlay } from './Overlay';
import * as styles from './ImageUploader.module.css';

@Component
@observer
class ImageUploader extends TSX<{ class?: string }>()(Vue) {
  @Prop({ type: String })
  readonly name?: string;

  @Prop({ type: Boolean })
  readonly required?: boolean;

  @Prop({ type: Boolean })
  readonly disabled?: boolean;

  @Prop({ type: String })
  readonly accept?: string;

  @Prop({ type: String })
  readonly value?: string;

  @Prop({ type: Function })
  readonly upload?: (name: string, file: File) => Promise<void>;

  URI = '';
  angle = 0;
  loading = false;

  @Watch('value')
  onValueChange(path: string) {
    this.URI = path;
  }

  async preview(event: Event) {
    const { name, files } = event.target as HTMLInputElement;

    if (!files?.[0]) return;

    const old = this.URI;

    if (old) URL.revokeObjectURL(old);
    this.URI = URL.createObjectURL(files[0]);

    if (this.upload instanceof Function) {
      this.loading = true;
      await this.upload(name, files[0]);
      this.loading = false;
    }
  }

  rotate() {
    this.angle += 90;
  }

  render() {
    const { URI, angle, loading, name, required, disabled, accept } = this;

    return (
      <Overlay show={loading}>
        <div class={[styles.box, { [styles.show!]: URI }]}>
          {URI ? (
            <img
              class={['image max-w-full max-h-full', styles.image]}
              style={{ transform: `rotate(${angle}deg)` }}
              src={URI}
            />
          ) : (
            <div class={styles.cover}>+</div>
          )}
          <input
            class={styles.input}
            type="file"
            {...{ name, required, disabled }}
            accept={accept || 'image/*'}
            onChange={event => this.preview(event)}
          />
          {URI && <i class={['pi pi-refresh', styles.rotate]} onClick={() => this.rotate()} />}
        </div>
      </Overlay>
    );
  }
}
export default toNative(ImageUploader);
