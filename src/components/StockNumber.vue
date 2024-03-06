<template>
  <span
    :class="{
      'text-red-500': extent > 0,
      'text-gray-500': extent === 0,
      'text-green-500': extent < 0
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
