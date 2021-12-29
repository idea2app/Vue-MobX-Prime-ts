<template>
  <Overlay :class="{ box: true, show: URI }" color="primary" :show="loading">
    <CImage
      v-if="URI"
      class="image mw-100 mh-100"
      :style="{ transform: `rotate(${angle}deg)` }"
      :src="URI"
    />
    <input
      type="file"
      :name="name"
      :required="required"
      :disabled="disabled"
      :accept="accept || 'image/*'"
      @change="preview"
    />
    <CIcon v-if="URI" class="rotate" :icon="cilReload" @click="rotate" />
  </Overlay>
</template>

<style lang="less" scoped>
.box {
  height: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  border: 2px dashed var(--primary);
  position: relative;
  overflow: hidden;
  &::before {
    content: '+';
    font-size: 5rem;
    color: var(--primary);

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .image {
    transition: 0.25s;
  }
  .rotate {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  &.show {
    border: none;
    &::before {
      content: none;
    }
  }
}
</style>

<script lang="ts" setup>
import { CImage } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { cilReload } from '@coreui/icons';

import Overlay from './Overlay.vue';
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['name', 'required', 'disabled', 'accept', 'value', 'upload'],
  data: () => ({
    URI: '',
    angle: 0,
    loading: false
  }),
  watch: {
    value(this: any, path: string) {
      this['URI'] = path;
    }
  },
  methods: {
    async preview(this: any, event: Event) {
      const { name, files } = event.target as HTMLInputElement;

      if (!files?.[0]) return;

      const old = this['URI'];

      if (old) URL.revokeObjectURL(old);
      this['URI'] = URL.createObjectURL(files[0]);

      if (this.upload instanceof Function) {
        this.loading = true;
        await this.upload(name, files[0]);
        this.loading = false;
      }
    },
    rotate(this: any) {
      this['angle'] += 90;
    }
  }
});
</script>
