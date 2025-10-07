import { Component, toNative, Vue, Prop, TSX } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';
import PrimeImage from 'primevue/image';

import Overlay from './Overlay';

export interface ImageProps {
  src: string;
}

@Component
@observer
class Image extends TSX<ImageProps>()(Vue) {
  @Prop({ type: String, required: true })
  readonly src!: string;

  downloading = true;

  render() {
    const { src, downloading } = this;

    return (
      <Overlay class="text-center" show={downloading}>
        <PrimeImage
          preview
          src={src}
          {...{
            onLoad: () => (this.downloading = false),
            onError: () => (this.downloading = false)
          }}
        />
      </Overlay>
    );
  }
}
export default toNative(Image);
