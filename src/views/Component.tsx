import { Component, toNative, Vue } from 'vue-facing-decorator';
import { observable } from 'mobx';
import { observer } from 'mobx-vue-helper';
import { formToJSON } from 'web-utility';
import type { DateRange } from 'reka-ui';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '../components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../components/ui/alert-dialog';
import { Button } from '../components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { RangeCalendar } from '../components/ui/range-calendar';
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from '../components/ui/stepper';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../components/ui/table';

import { StockNumber } from '../components/StockNumber';
import Image from '../components/Image';
import ImageUploader from '../components/ImageUploader';
import Downloader from '../components/Downloader';

import { downloader } from '../models/service';
import * as styles from './Component.module.css';

interface TreeNode {
  key: string;
  label: string;
  children?: TreeNode[];
}

const tree: TreeNode[] = [
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

const renderTree = (nodes: TreeNode[]) => (
  <ul class="list-disc pl-6">
    {nodes.map(node => (
      <li key={node.key}>
        {node.children ? (
          <Collapsible defaultOpen={node.key === '0'}>
            <CollapsibleTrigger asChild>
              <button class="cursor-pointer select-none font-medium" type="button">
                {node.label}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>{renderTree(node.children)}</CollapsibleContent>
          </Collapsible>
        ) : (
          node.label
        )}
      </li>
    ))}
  </ul>
);

class DialogModel {
  @observable
  accessor shown = false;

  open = () => (this.shown = true);

  close = (event: Event) => {
    event.preventDefault();
    this.shown = false;
    console.log(formToJSON(event.target as HTMLFormElement));
  };
}

class ConfirmModel {
  @observable
  accessor shown = false;

  open = () => (this.shown = true);
  close = () => (this.shown = false);
}

const dialogState = new DialogModel();
const confirmState = new ConfirmModel();

@Component
@observer
class ComponentPage extends Vue {
  dateRange: DateRange = { start: undefined, end: undefined };

  download() {
    const task = downloader.createTask(
      'https://ows.blob.core.chinacloudapi.cn/$web/file/001%E6%B1%9F%E6%B3%A2.png',
      'test'
    );
    task.start({ chunkSize: 1024 ** 2 / 2 });
  }

  render() {
    return (
      <div class="component-demo mx-auto max-w-md text-left">
        <h2>Stock Number</h2>
        <div class="flex gap-2">
          <StockNumber extent={0.3} value={0.3}>
            {{ after: () => <span>%</span> }}
          </StockNumber>
          <StockNumber extent={-0.5} value={0.5}>
            {{ after: () => <span>%</span> }}
          </StockNumber>
        </div>

        <h2 class="mt-4">Panel</h2>
        <Accordion
          class="overflow-hidden rounded-lg border bg-card"
          type="single"
          collapsible
          defaultValue="panel"
        >
          <AccordionItem value="panel" class="border-b-0">
            <AccordionTrigger class="bg-muted px-4 py-3 text-lg">Panel</AccordionTrigger>
            <AccordionContent class="border-t bg-background px-4 py-4">Content</AccordionContent>
          </AccordionItem>
        </Accordion>

        <h2 class="mt-4">Stepper</h2>
        <Stepper modelValue={1} orientation="vertical" class="flex-col gap-0">
          <StepperItem step={1} class="relative flex-col items-start gap-0 pl-0">
            <StepperTrigger class="flex-row gap-3 p-2 text-left">
              <StepperIndicator class="stepper-indicator size-10 shrink-0">1</StepperIndicator>
              <StepperTitle>Header I</StepperTitle>
            </StepperTrigger>
            <div class="ml-6 border-l-2 border-primary px-6 pb-5 pt-1 text-sm">Content I</div>
            <StepperSeparator class="absolute left-7 top-12 h-8 w-0.5" />
          </StepperItem>
          <StepperItem step={2} class="relative flex-col items-start gap-0 pl-0">
            <StepperTrigger class="flex-row gap-3 p-2 text-left">
              <StepperIndicator class="stepper-indicator size-10 shrink-0">2</StepperIndicator>
              <StepperTitle>Header II</StepperTitle>
            </StepperTrigger>
          </StepperItem>
        </Stepper>

        <h2 class="mt-4">Table</h2>
        <Table class={styles.tableCenter}>
          <TableHeader>
            <TableRow>
              <TableHead>A</TableHead>
              <TableHead>B</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { A: 1, B: 2 },
              { A: 3, B: 4 },
              { A: 5, B: 6 }
            ].map(row => (
              <TableRow key={row.A}>
                <TableCell>{row.A}</TableCell>
                <TableCell>{row.B}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h2 class="mt-4">Tree</h2>
        {renderTree(tree)}

        <h2 class="mt-4">Date Range</h2>
        <div class="flex flex-wrap gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <button
                class="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm"
                type="button"
              >
                {this.dateRange.start?.toString() || 'Start date'}
                <span class="px-2 text-muted-foreground">to</span>
                {this.dateRange.end?.toString() || 'End date'}
              </button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
              <RangeCalendar
                modelValue={this.dateRange}
                onUpdate:modelValue={(value: DateRange | undefined) => {
                  if (!value) return;
                  this.dateRange = value;
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <h2 class="mt-4">Image</h2>
        <Image src="https://github.com/idea2app.png" />

        <h2 class="mt-4">Image Uploader</h2>
        <ImageUploader class="mb-4" />

        <h2 class="mt-4">Downloader</h2>
        <div class="flex flex-col gap-4">
          <Button asChild>
            <button onClick={() => this.download()}>download</button>
          </Button>
          <Downloader />
        </div>

        <h2 class="mt-4">Dialog</h2>
        <Button asChild>
          <button onClick={dialogState.open}>Open Dialog</button>
        </Button>
        <Dialog
          open={dialogState.shown}
          onUpdate:open={(shown: boolean) => (dialogState.shown = shown)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>form</DialogTitle>
            </DialogHeader>
            <form onSubmit={dialogState.close} onReset={dialogState.close} class="space-y-4">
              <div class="space-y-2">
                <Label for="example-input">input</Label>
                <input
                  class="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  id="example-input"
                  name="test"
                  required
                />
              </div>
              <div class="flex justify-end gap-3">
                <Button asChild>
                  <button type="submit">submit</button>
                </Button>
                <Button asChild variant="destructive">
                  <button type="reset">close</button>
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <h2 class="mt-4">Confirm</h2>
        <Button asChild>
          <button onClick={confirmState.open}>Open Confirm</button>
        </Button>
        <AlertDialog
          open={confirmState.shown}
          onUpdate:open={(shown: boolean) => (confirmState.shown = shown)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm</AlertDialogTitle>
              <AlertDialogDescription>Yes or No?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <button onClick={confirmState.close}>No</button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <button onClick={confirmState.close}>Yes</button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }
}
export default toNative(ComponentPage);
