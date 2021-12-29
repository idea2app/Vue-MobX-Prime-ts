<template>
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
        <CCard>
          <CCardImage orientation="top" :src="logo" />
          <CCardBody>
            <CCardTitle>{{ name }}</CCardTitle>
          </CCardBody>
          <CCardFooter class="d-flex justify-content-around">
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
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardFooter,
  CButton
} from '@coreui/vue';

import project from '../models/Project';

onMounted(() =>
  project.getList(
    'vuejs/vue',
    'bootstrap-vue/bootstrap-vue',
    'microsoft/TypeScript'
  )
);
</script>
