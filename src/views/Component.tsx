import { Component, toNative, Vue } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';

import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Panel from 'primevue/panel';
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/steppanel';
import Tree from 'primevue/tree';
import DatePicker from 'primevue/datepicker';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import { useConfirm } from 'primevue/useconfirm';
import ConfirmDialog from 'primevue/confirmdialog';

import StockNumber from '../components/StockNumber';
import Image from '../components/Image';
import ImageUploader from '../components/ImageUploader';
import Downloader from '../components/Downloader';

import { downloader } from '../models/service';
import styles from './Component.module.less';

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

@Component
@observer
class ComponentPage extends Vue {
  date: any = undefined;
  openDialog = false;
  confirm = useConfirm();

  download() {
    const task = downloader.createTask(
      'https://ows.blob.core.chinacloudapi.cn/$web/file/001%E6%B1%9F%E6%B3%A2.png',
      'test'
    );
    task.start({ chunkSize: 1024 ** 2 / 2 });
  }

  closeDialog(data: any) {
    this.openDialog = false;
    console.log(data);
  }

  openConfirm() {
    this.confirm.require({
      header: 'Confirm',
      message: 'Yes or No ?',
      accept: console.info,
      reject: console.error
    });
  }

  render() {
    return (
      <div class="text-left">
        <h2>Stock Number</h2>
        <StockNumber extent={0.3} value={0.3}>
          {{
            after: () => <span>%</span>
          }}
        </StockNumber>
        <StockNumber extent={-0.5} value={0.5}>
          {{
            after: () => <span>%</span>
          }}
        </StockNumber>

        <h2 class="mt-4">Panel</h2>
        <Panel toggleable header="Panel">
          Content
        </Panel>

        <h2 class="mt-4">Stepper</h2>

        {/* @ts-expect-error - PrimeVue types issue */}
        <Stepper orientation="vertical">
          {/* @ts-expect-error - PrimeVue types issue */}
          <StepperPanel header="first"></StepperPanel>
          {/* @ts-expect-error - PrimeVue types issue */}
          <StepperPanel header="second"></StepperPanel>
        </Stepper>

        <h2 class="mt-4">Table</h2>
        <DataTable
          class={styles.tableCenter}
          stripedRows
          value={[
            { A: 1, B: 2 },
            { A: 3, B: 4 },
            { A: 5, B: 6 }
          ]}
        >
          <Column field="A" header="A" />
          <Column field="B" header="B" />
        </DataTable>

        <h2 class="mt-4">Tree</h2>
        <Tree class="text-start" value={tree} />

        <h2 class="mt-4">Date Range</h2>
        <DatePicker
          selectionMode="range"
          updateModelType="date"
          v-model={this.date}
        />

        <h2 class="mt-4">Image</h2>
        {/* @ts-expect-error - Component props typing */}
        <Image src="https://github.com/idea2app.png" />

        <h2 class="mt-4">Image Uploader</h2>
        {/* @ts-expect-error - Component props typing */}
        <ImageUploader class="mb-4" />

        <h2 class="mt-4">Downloader</h2>
        <Button onClick={this.download.bind(this)}>download</Button>
        {/* @ts-expect-error - Component props typing */}
        <Downloader class="mt-4" />

        <h2 class="mt-4">Dialog</h2>
        <Button severity="primary" onClick={() => (this.openDialog = true)}>
          Open Dialog
        </Button>

        <Dialog modal header="form" visible={this.openDialog}>
          <form
            onSubmit={(e: Event) => {
              e.preventDefault();
              this.closeDialog(e);
            }}
            onReset={this.closeDialog.bind(this)}
          >
            <FloatLabel class="my-3">
              <InputText id="example-input" name="test" required />
              <label for="example-input">input</label>
            </FloatLabel>
            <div class="flex justify-content-around">
              <Button type="submit">submit</Button>
              <Button type="reset" severity="danger">
                close
              </Button>
            </div>
          </form>
        </Dialog>

        <h2 class="mt-4">Confirm</h2>
        <Button severity="primary" onClick={this.openConfirm.bind(this)}>
          Open Confirm
        </Button>
        <ConfirmDialog />
      </div>
    );
  }
}

export default toNative(ComponentPage);
