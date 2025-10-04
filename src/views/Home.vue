<template>
  <div class="home text-center">
    <img alt="Vue logo" :src="VueLogo" />

    <HelloWorld
      msg="Welcome to Your Vue.js + MobX + TypeScript + PrimeVue App"
    />
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '../components/HelloWorld.vue';

const VueLogo = new URL('../assets/logo.png', import.meta.url) + '';
</script>
