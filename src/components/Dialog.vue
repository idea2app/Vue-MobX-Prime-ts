<template>
  <form class="text-dark" @submit.prevent.stop="onClose" @reset.stop="onClose">
    <CModal alignment="center" :visible="open" @close="onClose">
      <CModalHeader v-if="title">
        <CModalTitle>{{ title }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <slot />
      </CModalBody>
      <CModalFooter v-if="title" class="justify-content-center">
        <CButton type="submit" color="primary" class="rounded-pill px-4 me-4">
          确认
        </CButton>
        <CButton type="reset" color="outline-primary" class="rounded-pill px-4">
          取消
        </CButton>
      </CModalFooter>
    </CModal>
  </form>
</template>

<script lang="ts" setup>
import { formToJSON } from 'web-utility';
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/vue';

defineProps<{ title?: string; open?: boolean }>();

const emitClose = defineEmits(['close']);

function onClose(event?: Event) {
  emitClose(
    'close',
    event?.type !== 'submit'
      ? undefined
      : formToJSON(event.target as HTMLFormElement)
  );
}
</script>
