<template>
  <CInputGroup>
    <CFormInput :type="type" :value="value?.[0]" />
    <CFormInput :type="type" :value="value?.[1]" />
  </CInputGroup>
</template>

<script lang="ts" setup>
import { CInputGroup, CFormInput } from '@coreui/vue';

type TimeData = number | string | Date;

defineProps<{
  type: 'date' | 'datetime-local' | 'week' | 'month';
  value?: [TimeData?, TimeData?];
}>();
</script>
