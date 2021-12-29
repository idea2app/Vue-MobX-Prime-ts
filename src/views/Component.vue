<template>
  <CContainer class="text-left">
    <h2>Stock Number</h2>
    <StockNumber :extent="0.3" :value="0.3">
      <span slot="after">%</span>
    </StockNumber>
    <StockNumber :extent="-0.5" :value="0.5">
      <span slot="after">%</span>
    </StockNumber>

    <h2 class="mt-4">Panel</h2>
    <Panel :open="true" title="Panel">Content</Panel>

    <h2 class="mt-4">Stepper</h2>
    <Stepper :steps="[{ title: 'first' }, { title: 'second' }]" :step="0" />

    <h2 class="mt-4">Table</h2>
    <Table
      :heads="['A', 'B']"
      :rows="[
        [1, 2],
        [3, 4],
        [5, 6]
      ]"
    />
    <h2 class="mt-4">Tree</h2>
    <Tree class="text-start" v-bind="tree" />

    <h2 class="mt-4">Date Range</h2>
    <DateRange type="date" />

    <h2 class="mt-4">Image</h2>
    <Image src="https://github.com/idea2app.png" />

    <h2 class="mt-4">Image Uploader</h2>
    <ImageUploader class="mb-4" />

    <h2 class="mt-4">Dialog</h2>
    <CButton color="primary" @click="openDialog = true">Open Dialog</CButton>

    <Dialog title="form" :open="openDialog" @close="closeDialog">
      <CRow>
        <CFormLabel for="example-input" class="col-sm-2 col-form-label">
          input
        </CFormLabel>
        <div class="col-sm-10">
          <CFormInput id="example-input" name="test" required />
        </div>
      </CRow>
    </Dialog>

    <h2 class="mt-4">Confirm</h2>
    <CButton color="primary" @click="openConfirm = true">Open Confirm</CButton>

    <Confirm title="Confirm" :open="openConfirm" @close="closeConfirm">
      Yes or No ?
    </Confirm>
  </CContainer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CContainer, CRow, CButton, CFormLabel, CFormInput } from '@coreui/vue';

import StockNumber from '../components/StockNumber.vue';
import Panel from '../components/Panel.vue';
import Stepper from '../components/Stepper.vue';
import Table from '../components/Table.vue';
import Tree from '../components/Tree.vue';
import DateRange from '../components/DateRange.vue';
import Image from '../components/Image.vue';
import ImageUploader from '../components/ImageUploader.vue';
import Dialog from '../components/Dialog.vue';
import Confirm from '../components/Confirm.vue';

const tree = {
  title: 'node 0',
  children: [
    { title: 'node 1.1' },
    { title: 'node 1.2', children: [{ title: 'node 2.1' }] }
  ]
};
const openDialog = ref(false);

function closeDialog(data: any) {
  openDialog.value = false;

  console.log(data);
}

const openConfirm = ref(false);

function closeConfirm(data: any) {
  openConfirm.value = false;

  console.log(data);
}
</script>
