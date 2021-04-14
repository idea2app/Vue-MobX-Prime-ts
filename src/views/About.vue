<template>
  <div class="about">
    <h1>Core libraries of this Project scaffold</h1>
    <b-row>
      <b-col
        class="mb-3"
        cols="12"
        sm="6"
        md="3"
        v-for="{ id, name, full_name, homepage, html_url } in project.list"
        :key="id"
      >
        <b-card
          :title="name"
          img-top
          :img-src="`https://github.com/${full_name.split('/')[0]}.png`"
        >
          <b-button variant="primary" :href="homepage" class="mr-3">
            Home page
          </b-button>
          <b-button variant="success" :href="html_url">Source code</b-button>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { observer } from 'mobx-vue';

import project from '../models/Project';

export default observer({
  data: () => ({ project }),
  mounted: () =>
    project.getList(
      'vuejs/vue',
      'microsoft/TypeScript',
      'mobxjs/mobx',
      'bootstrap-vue/bootstrap-vue'
    )
});
</script>
