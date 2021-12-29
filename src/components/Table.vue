<template>
  <CTable
    striped
    borderless
    responsive
    class="border rounded px-3 text-center small"
    style="max-height: 75vh"
  >
    <CTableHead>
      <CTableRow class="border-bottom text-nowrap text-primary">
        <CTableHeaderCell v-for="head in heads" :key="head">
          {{ head }}
        </CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody class="text-secondary">
      <CTableRow
        v-for="(row, index) in rows"
        :key="'tr' + index"
        @click="$emit('rowClick', index)"
      >
        <CTableDataCell
          class="text-nowrap"
          v-for="(cell, index) in row"
          :key="'td' + index"
        >
          {{ cell }}
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<style lang="less">
.table-striped tbody tr {
  &:nth-of-type(even) {
    background: transparent;
  }
  &:nth-of-type(odd) {
    background: rgba(52, 105, 242, 0.1);
    td {
      &:first-child {
        border-top-left-radius: 10rem !important;
        border-bottom-left-radius: 10rem !important;
      }
      &:last-child {
        border-top-right-radius: 10rem !important;
        border-bottom-right-radius: 10rem !important;
      }
    }
  }
}
</style>

<script lang="ts" setup>
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from '@coreui/vue';

defineProps<{ heads: string[]; rows: any[][] }>();
</script>
