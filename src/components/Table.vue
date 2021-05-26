<template>
  <b-table-simple
    striped
    borderless
    responsive
    class="border rounded px-3 text-center small"
    style="max-height: 75vh"
  >
    <b-thead>
      <b-tr class="border-bottom text-nowrap text-primary">
        <b-th v-for="head in heads" :key="head">
          {{ head }}
        </b-th>
      </b-tr>
    </b-thead>
    <b-tbody class="text-secondary">
      <b-tr
        v-for="(row, index) in rows"
        :key="'tr' + index"
        @click="$emit('rowClick', index)"
      >
        <b-td
          class="text-nowrap"
          v-for="(cell, index) in row"
          :key="'td' + index"
        >
          {{ cell }}
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<style lang="less">
.table-striped tbody tr {
  &:nth-of-type(odd) {
    background: transparent;
  }
  &:nth-of-type(even) {
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

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: ['heads', 'rows']
});
</script>
