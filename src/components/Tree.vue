<template>
  <details open>
    <summary :class="{ leaf: !children }">{{ title }}</summary>
    <Tree
      class="mt-3 ms-3"
      v-if="children"
      v-for="child in children"
      v-bind="child"
    />
  </details>
</template>

<style scoped>
.leaf {
  list-style: disc;
  margin-left: 1rem;
  cursor: default;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'Tree' });
</script>

<script lang="ts" setup>
interface TreeNode {
  title: string;
  children?: TreeNode[];
}
defineProps<TreeNode>();
</script>
