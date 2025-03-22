<template>
  <div class="text-left">
    <h2>Stock Number</h2>
    <StockNumber :extent="0.3" :value="0.3">
      <span slot="after">%</span>
    </StockNumber>
    <StockNumber :extent="-0.5" :value="0.5">
      <span slot="after">%</span>
    </StockNumber>

    <h2 class="mt-4">Panel</h2>
    <Panel toggleable header="Panel">Content</Panel>

    <h2 class="mt-4">Stepper</h2>

    <Stepper orientation="vertical">
      <StepperPanel header="first"></StepperPanel>
      <StepperPanel header="second"></StepperPanel>
    </Stepper>

    <h2 class="mt-4">Table</h2>
    <DataTable
      class="table-center"
      stripedRows
      :value="[
        { A: 1, B: 2 },
        { A: 3, B: 4 },
        { A: 5, B: 6 }
      ]"
    >
      <Column field="A" header="A" />
      <Column field="B" header="B" />
    </DataTable>

    <h2 class="mt-4">Tree</h2>
    <Tree class="text-start" :value="tree" />

    <h2 class="mt-4">Date Range</h2>
    <DataPicker selectionMode="range" v-model="date" />

    <h2 class="mt-4">Image</h2>
    <Image src="https://github.com/idea2app.png" />

    <h2 class="mt-4">Image Uploader</h2>
    <ImageUploader class="mb-4" />

    <h2 class="mt-4">Downloader</h2>
    <Button @click="download">download</Button>
    <Downloader class="mt-4" />

    <h2 class="mt-4">Dialog</h2>
    <Button severity="primary" @click="openDialog = true">Open Dialog</Button>

    <Dialog modal header="form" :visible="openDialog">
      <form @submit.prevent="closeDialog" @reset="closeDialog">
        <FloatLabel class="my-3">
          <InputText id="example-input" name="test" required />
          <label for="example-input">input</label>
        </FloatLabel>
        <div class="flex justify-content-around">
          <Button type="submit">submit</Button>
          <Button type="reset" severity="danger">close</Button>
        </div>
      </form>
    </Dialog>

    <h2 class="mt-4">Confirm</h2>
    <Button severity="primary" @click="openConfirm()">Open Confirm</Button>
    <ConfirmDialog />
  </div>
</template>

<style lang="less">
.table-center {
  th .p-column-header-content {
    justify-content: center;
  }
  th,
  td {
    text-align: center;
  }
}
</style>

<script lang="ts" setup>
import { ref } from 'vue';

import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/steppanel';
import Tree from 'primevue/tree';
import DataPicker from 'primevue/datepicker';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';

import StockNumber from '../components/StockNumber.vue';
import Image from '../components/Image.vue';
import ImageUploader from '../components/ImageUploader.vue';
import Downloader from '../components/Downloader.vue';

import { downloader } from '../models/service';

const date = ref();

const tree = [
  {
    key: '0',
    label: 'node 0',
    children: [
      { key: '1.1', label: 'node 1.1' },
      {
        key: '1.2',
        label: 'node 1.2',
        children: [{ key: '2.1', label: 'node 2.1' }]
      }
    ]
  }
];

function download() {
  const task = downloader.createTask(
    'https://ows.blob.core.chinacloudapi.cn/$web/file/001%E6%B1%9F%E6%B3%A2.png',
    'test'
  );
  task.start({ chunkSize: 1024 ** 2 / 2 });
}

const openDialog = ref(false);

function closeDialog(data: any) {
  openDialog.value = false;

  console.log(data);
}

const confirm = useConfirm();

const openConfirm = () =>
  confirm.require({
    header: 'Confirm',
    message: 'Yes or No ?',
    accept: console.info,
    reject: console.error
  });
</script>
