<template>
  <b-overlay :class="{ box: true, show: URI }" :show="loading">
    <b-img
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
    <b-icon v-if="URI" class="rotate" icon="arrow-repeat" @click="rotate" />
  </b-overlay>
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

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['name', 'required', 'disabled', 'accept', 'value', 'upload'],
  data: () => ({
    URI: '',
    angle: 0,
    loading: false
  }),
  watch: {
    value(this: Vue, path: string) {
      this['URI'] = path;
    }
  },
  methods: {
    async preview(event: Event) {
      const {
        name,
        files: [file]
      } = event.target as HTMLInputElement;

      if (!file) return;

      const old = this['URI'];

      if (old) URL.revokeObjectURL(old);
      this['URI'] = URL.createObjectURL(file);

      if (this.upload instanceof Function) {
        this.loading = true;
        await this.upload(name, file);
        this.loading = false;
      }
    },
    rotate(this: Vue) {
      this['angle'] += 90;
    }
  }
});
</script>
