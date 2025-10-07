import { Component, toNative, Vue, Watch, Prop } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';

import Overlay from './Overlay';
import * as styles from './ImageUploader.module.less';

@Component
@observer
class ImageUploader extends Vue {
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

  preview = async (event: Event) => {
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
  };

  rotate = () => (this.angle += 90);

  render() {
    const { URI, angle, loading, name, required, disabled, accept } = this;
    const showClass = URI ? styles.show : '';

    return (
      <Overlay class={[styles.box, showClass, { show: URI }]} show={loading}>
        {URI && (
          <img
            class={['image max-w-full max-h-full', styles.image]}
            style={{ transform: `rotate(${angle}deg)` }}
            src={URI}
          />
        )}
        <input
          type="file"
          name={name}
          required={required}
          disabled={disabled}
          accept={accept || 'image/*'}
          onChange={this.preview}
        />
        {URI && (
          <i class={['pi pi-refresh', styles.rotate]} onClick={this.rotate} />
        )}
      </Overlay>
    );
  }
}

export default toNative(ImageUploader);
