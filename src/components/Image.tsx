import { Component, toNative, Vue, Prop, TSX } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';

import { Overlay } from './Overlay';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

export interface ImageProps {
  src: string;
}

@Component
@observer
class Image extends TSX<ImageProps>()(Vue) {
  @Prop({ type: String, required: true })
  readonly src!: string;

  downloading = true;

  previewShown = false;

  render() {
    const { src, downloading } = this;

    return (
      <>
        <Overlay class="text-center" show={downloading}>
          <img
            class="max-w-full cursor-zoom-in"
            src={src}
            {...{
              onLoad: () => (this.downloading = false),
              onError: () => (this.downloading = false)
            }}
            onClick={() => (this.previewShown = true)}
          />
        </Overlay>
        <Dialog
          open={this.previewShown}
          onUpdate:open={(shown: boolean) => (this.previewShown = shown)}
        >
          <DialogContent
            class="flex max-w-[90vw] items-center justify-center rounded-xl border border-[#d9e2e7] bg-white p-4 shadow-2xl [&>button]:bg-[#172033] [&>button]:text-white [&>button]:opacity-100"
          >
            <DialogTitle class="sr-only">Image preview</DialogTitle>
            <DialogDescription class="sr-only">Full-size image preview</DialogDescription>
            <img
              class="block max-h-[85vh] w-auto max-w-full rounded-md bg-[#f1f5f9] object-contain"
              src={src}
              alt="Preview"
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
export default toNative(Image);
