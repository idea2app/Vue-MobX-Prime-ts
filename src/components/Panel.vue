<template>
  <CCard class="p-0">
    <CCardHeader component="header" role="tab" class="p-0 border-0">
      <CButton
        size="lg"
        :color="background || `outline-${border}`"
        class="w-100 px-5 py-3 header"
        :class="{ open: visible || !closable }"
        :aria-controls="id"
        :aria-expanded="visible ? 'true' : 'false'"
        @click="visible = !visible"
      >
        <span>
          {{ title }}
        </span>
        <span v-if="closable">
          <CIcon :icon="cilChevronTop" v-if="visible" />
          <CIcon :icon="cilChevronBottom" v-else />
        </span>
      </CButton>
    </CCardHeader>
    <CCollapse :id="id" role="tabpanel" :visible="visible" v-if="closable">
      <CCardBody><slot /></CCardBody>
    </CCollapse>
    <CCardBody v-else><slot /></CCardBody>
  </CCard>
</template>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.25s;
  &[class*='btn-outline-'] {
    border-left-width: 3px;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-right-color: transparent;
  }
  &.open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';
import { uniqueID } from 'web-utility';

import { CCard, CCardHeader, CCardBody, CButton, CCollapse } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { cilChevronTop, cilChevronBottom } from '@coreui/icons';

const { open } = defineProps<{
  background?: string;
  border?: string;
  title: string;
  open?: boolean;
}>();

const id = uniqueID(),
  visible = ref(open),
  closable = typeof open === 'boolean';
</script>
