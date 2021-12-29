<template>
  <Dialog
    :title="title"
    :open="open"
    @close="(data: any) => emitClose('close', !!data)"
  >
    <CRow class="align-items-center">
      <CCol sm="2" class="text-center text-danger">
        <CIcon size="xxl" :icon="icon || cilInfo" />
      </CCol>
      <CCol sm="10">
        <slot />
      </CCol>
    </CRow>

    <slot name="extra" />
  </Dialog>
</template>

<script lang="ts" setup>
import { CRow, CCol } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { cilInfo } from '@coreui/icons';

import Dialog from './Dialog.vue';

defineProps<{
  title: string;
  open?: boolean;
  icon?: any[];
}>();

const emitClose = defineEmits(['close']);
</script>
