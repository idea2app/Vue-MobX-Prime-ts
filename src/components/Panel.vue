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
          <CIcon :icon="visible ? cilChevronTop : cilChevronBottom" />
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
import { CCard, CCardHeader, CCardBody, CButton, CCollapse } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import { cilChevronTop, cilChevronBottom } from '@coreui/icons';
</script>

<script lang="ts">
import { uniqueID } from 'web-utility';

export default {
  props: ['background', 'border', 'title', 'open'],
  data(this: any) {
    return {
      id: uniqueID(),
      visible: this['open'],
      closable: typeof this['open'] === 'boolean'
    };
  }
};
</script>
