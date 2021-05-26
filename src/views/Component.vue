<template>
  <b-container class="text-left">
    <h2>Stock Number</h2>
    <StockNumber :extent="0.3" :value="0.3">
      <span slot="after">%</span>
    </StockNumber>
    <StockNumber :extent="-0.5" :value="0.5">
      <span slot="after">%</span>
    </StockNumber>

    <h2 class="mt-4">Panel</h2>
    <Panel :open="true" title="Panel">Content</Panel>

    <h2 class="mt-4">Stepper</h2>
    <Stepper :steps="[{ title: 'first' }, { title: 'second' }]" :step="0" />

    <h2 class="mt-4">Table</h2>
    <Table
      :heads="['A', 'B']"
      :rows="[
        [1, 2],
        [3, 4],
        [5, 6]
      ]"
    />
    <h2 class="mt-4">Image Uploader</h2>
    <ImageUploader class="mb-4" />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

import StockNumber from '@/components/StockNumber.vue';
import Panel from '@/components/Panel.vue';
import Stepper from '@/components/Stepper.vue';
import Table from '@/components/Table.vue';
import ImageUploader from '@/components/ImageUploader.vue';

export default Vue.extend({
  components: { StockNumber, Panel, Stepper, Table, ImageUploader }
});
</script>
