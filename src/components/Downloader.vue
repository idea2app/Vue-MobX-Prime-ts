<template>
  <Observer>
    <ol class="list-none m-0 p-0 flex flex-col gap-3">
      <li v-for="task in downloader.tasks" :key="task.id">
        <Card>
          <template #title>
            <Observer>
              <div class="flex justify-between items-center">
                {{ task.name }}
                <div class="flex align-items-center">
                  <small class="font-normal text-sm">
                    <span>
                      {{ task.loadedSize.toShortString() }}
                    </span>
                    /
                    <span>
                      {{ task.totalSize.toShortString() }}
                    </span>
                  </small>
                  <template v-if="task.percent < 100">
                    <IconButton
                      v-if="task.executing"
                      icon="pause"
                      @click="() => task.pause()"
                    />
                    <IconButton
                      v-else
                      icon="play"
                      @click="() => task.start()"
                    />
                  </template>
                  <IconButton
                    v-if="!task.executing"
                    icon="times"
                    @click="() => downloader.destroyTask(task.name)"
                  />
                </div>
              </div>
            </Observer>
          </template>
          <template #content>
            <Observer>
              <ProgressBar
                :mode="
                  task.executing && !task.percent
                    ? 'indeterminate'
                    : 'determinate'
                "
                :value="task.percent"
              />
            </Observer>
          </template>
        </Card>
      </li>
    </ol>
  </Observer>
</template>

<script setup lang="ts">
import { Observer } from 'mobx-vue-lite';
import ProgressBar from 'primevue/progressbar';
import Card from 'primevue/card';

import IconButton from './IconButton.vue';
import { downloader } from '../models/service';
</script>
