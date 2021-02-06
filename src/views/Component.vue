<template>
  <b-container class="text-left">
    <h2>Panel</h2>
    <Panel :open="true" title="Panel">Content</Panel>

    <h2 class="mt-4">Stepper</h2>
    <Stepper :steps="[{ title: 'first' }, { title: 'second' }]" :step="0" />

    <h2 class="mt-4">Image Uploader</h2>
    <ImageUploader class="mb-4" />
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

import Panel from '@/components/Panel.vue';
import Stepper from '@/components/Stepper.vue';
import ImageUploader from '@/components/ImageUploader.vue';

export default Vue.extend({
  components: { Panel, Stepper, ImageUploader }
});
</script>
