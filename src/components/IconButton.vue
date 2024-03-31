<template>
  <button class="appearance-none bg-transparent border-none cursor-pointer">
    <i :class="`pi pi-${icon}`" />
  </button>
</template>

<script setup lang="ts">
defineProps<{ icon: string }>();
</script>
