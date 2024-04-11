<template>
  <ol class="list-none m-0 p-0">
    <li v-for="task in downloader.tasks" :key="task.id">
      <Card>
        <template #title>
          <div class="flex justify-content-between align-items-center">
            {{ task.name }}
            <div>
              <template v-if="task.percent < 100">
                <IconButton
                  v-if="task.executing"
                  icon="pause"
                  @click="() => task.pause()"
                />
                <IconButton v-else icon="play" @click="() => task.restart()" />
              </template>
              <IconButton
                v-if="!task.executing"
                icon="times"
                @click="() => downloader.destroyTask(task.name)"
              />
            </div>
          </div>
        </template>
        <template #content>
          <ProgressBar
            :mode="
              task.executing && !task.percent ? 'indeterminate' : 'determinate'
            "
            :value="task.percent"
          />
        </template>
      </Card>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ProgressBar from 'primevue/progressbar';
import Card from 'primevue/card';

import IconButton from './IconButton.vue';

import downloader from '../models/Downloader';

onMounted(() => downloader.restoreTasks());
</script>
