<template>
  <b-overlay class="box" :show="loading">
    <input
      type="file"
      :name="name"
      :required="required"
      :disabled="disabled"
      :accept="accept || 'image/*'"
      @change="preview"
    />
  </b-overlay>
</template>

<style lang="less" scoped>
.box {
  height: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  &:not([style]) {
    border: 2px dashed var(--primary);
    &::before {
      content: '+';
      font-size: 5rem;
      color: var(--primary);
    }
  }
  position: relative;
  input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>

<script lang="ts">
import Vue from 'vue';

function renderImage(this: Vue, path: string) {
  (this.$el as HTMLElement).style.backgroundImage = `url(${path})`;
}

export default Vue.extend({
  props: ['name', 'required', 'disabled', 'accept', 'value', 'upload'],
  data: () => ({ URI: '', loading: false }),
  watch: {
    value: renderImage,
    URI: renderImage
  },
  methods: {
    async preview(event: Event) {
      const {
        name,
        files: [file]
      } = event.target as HTMLInputElement;

      const old = this['URI'];

      if (old) URL.revokeObjectURL(old);
      this['URI'] = URL.createObjectURL(file);

      if (this.upload instanceof Function) {
        this.loading = true;
        await this.upload(name, file);
        this.loading = false;
      }
    }
  }
});
</script>
