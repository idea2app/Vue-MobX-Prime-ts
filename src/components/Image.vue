<template>
  <Overlay class="text-center" :show="loading">
    <Image
      preview
      :src="src"
      @load="loading = false"
      @error="loading = false"
    />
  </Overlay>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Image from 'primevue/image';

import Overlay from './Overlay.vue';

defineProps<{ src?: string }>();

const loading = ref(true);
</script>
