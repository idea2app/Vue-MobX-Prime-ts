<template>
  <h1>Core libraries of this Project scaffold</h1>

  <div class="grid">
    <div
      class="col-12 sm:col-6 lg:col-3"
      v-for="item in project.list"
      :key="item.id"
    >
      <Card>
        <template #header>
          <img class="w-full" :src="item.logo" />
        </template>
        <template #title>{{ item.name }}</template>
        <template #content>
          <p class="m-0">{{ item.description }}</p>
        </template>
        <template #footer>
          <div class="flex gap-3 mt-1">
            <a class="block w-full" target="_blank" :href="item.homepage || ''">
              <Button severity="primary" outlined>Home page</Button>
            </a>
            <a class="block w-full" target="_blank" :href="item.html_url">
              <Button severity="success">Source code</Button>
            </a>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';

import project from '../models/Project';

onMounted(() =>
  project.getList('vuejs/vue', 'primefaces/primevue', 'microsoft/TypeScript')
);
</script>
