<template>
  <Observer>
    <CContainer class="about">
      <h1>Core libraries of this Project scaffold</h1>
      <CRow>
        <CCol
          class="mb-3"
          xs="12"
          sm="6"
          md="3"
          v-for="{ id, name, logo, homepage, html_url } in project.list"
          :key="id"
        >
          <CCard :title="name" img-top :img-src="logo">
            <CButton
              component="a"
              color="primary"
              size="sm"
              :href="homepage || ''"
              class="mr-3"
            >
              Home page
            </CButton>
            <CButton component="a" color="success" size="sm" :href="html_url">
              Source code
            </CButton>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </Observer>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Observer } from 'mobx-vue-lite';
import { CContainer, CRow, CCol, CCard, CButton } from '@coreui/vue';

import project from '../models/Project';

onMounted(() =>
  project.getList(
    'vuejs/vue',
    'microsoft/TypeScript',
    'mobxjs/mobx',
    'bootstrap-vue/bootstrap-vue'
  )
);
</script>
