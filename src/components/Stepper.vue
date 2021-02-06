<template>
  <div class="bs-stepper vertical linear">
    <div class="bs-stepper-header" role="tablist">
      <template v-for="({ title, icon, disabled }, index) in steps">
        <div
          :class="{ step: true, active: step >= index }"
          :key="'step-button-' + index"
        >
          <button
            type="button"
            class="step-trigger"
            role="tab"
            :id="'step-button-' + index"
            :aria-selected="step === index"
            :disabled="disabled"
          >
            <span class="bs-stepper-circle bg-primary">
              <b-icon :icon="icon" v-if="icon" />
              <template v-else>{{ index + 1 }}</template>
            </span>
            <span class="bs-stepper-label text-dark">{{ title }}</span>
          </button>
        </div>
        <div
          class="bs-stepper-line"
          :key="'step-line-' + index"
          v-if="index + 1 < steps.length"
        />
      </template>
    </div>
  </div>
</template>

<style lang="less">
@import 'https://cdn.jsdelivr.net/npm/bs-stepper@1.7.0/dist/css/bs-stepper.min.css';

.step {
  opacity: 0.5;
  &.active {
    opacity: 1;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['steps', 'step']
});
</script>
