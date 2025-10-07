import { Component, toNative, Vue, Prop } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';
import PrimeImage from 'primevue/image';

import Overlay from './Overlay';

@Component
@observer
class Image extends Vue {
  @Prop({ type: String }) readonly src?: string;

  loading = true;

  render() {
    return (
      <Overlay class="text-center" show={this.loading}>
        <PrimeImage
          preview
          src={this.src}
          {...{
            onLoad: () => (this.loading = false),
            onError: () => (this.loading = false)
          }}
        />
      </Overlay>
    );
  }
}

export default toNative(Image);
