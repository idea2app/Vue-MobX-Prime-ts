<template>
  <b-card no-body class="p-0">
    <b-card-header header-tag="header" role="tab" class="p-0 border-0">
      <b-button
        block
        size="lg"
        :variant="background || `outline-${border}`"
        class="px-5 py-3 header"
        :class="{ open: visible || !closable }"
        :aria-controls="id"
        :aria-expanded="visible ? 'true' : 'false'"
        @click="visible = !visible"
      >
        <span>
          {{ title }}
        </span>
        <span v-if="closable">
          <b-icon :icon="`chevron-${visible ? 'up' : 'down'}`" />
        </span>
      </b-button>
    </b-card-header>
    <b-collapse :id="id" role="tabpanel" :visible="visible" v-if="closable">
      <b-card-body><slot /></b-card-body>
    </b-collapse>
    <b-card-body v-else><slot /></b-card-body>
  </b-card>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.25s;
  &[class*='btn-outline-'] {
    border-left-width: 3px;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
  }
  &.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { uniqueID } from 'web-utility/source/data';

export default Vue.extend({
  props: ['background', 'border', 'title', 'open'],
  data() {
    return {
      id: uniqueID(),
      visible: this['open'],
      closable: typeof this['open'] === 'boolean'
    };
  }
});
</script>
