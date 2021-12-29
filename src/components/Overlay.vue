<template>
  <div class="box" :class="{ 'bg-light rounded-sm': show, show }">
    <slot></slot>

    <div class="spinner" v-if="show">
      <CSpinner :color="color" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.box {
  position: relative;
  &.show {
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      inset: 0;
      opacity: 0.85;
      backdrop-filter: blur(2px);
    }
    .spinner {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

<script lang="ts" setup>
import { CSpinner } from '@coreui/vue';

defineProps<{ color?: string; show?: boolean }>();
</script>
