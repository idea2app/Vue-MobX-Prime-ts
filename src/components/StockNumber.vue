<template>
  <span
    :class="{
      'text-danger': extent > 0,
      'text-secondary': extent === 0,
      'text-success': extent < 0
    }"
  >
    <slot name="before" />
    {{ (+(value != null ? value : extent)).toFixed(2) }}
    <slot name="after" />
  </span>
</template>

<script lang="ts" setup>
defineProps<{ value: number; extent: number }>();
</script>
