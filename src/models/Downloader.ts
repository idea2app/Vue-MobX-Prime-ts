import { del, get, getMany, set } from 'idb-keyval';
import {
  HTTPClient,
  type DownloadOptions,
  type TransferProgress
} from 'koajax';
import {
  FileSystemFileHandle,
  showSaveFilePicker
} from 'native-file-system-adapter';
import { reactive } from 'vue';

export class DownloadTask implements Partial<TransferProgress> {
  id: string;
  fileHandle?: FileSystemFileHandle;
  loaded = 0;
  percent = 0;
  executing = false;
  pausing = Promise.withResolvers<void>();

  client = new HTTPClient({ responseType: 'arraybuffer' });

  protected constructor(
    public name: string,
    public path: string
  ) {
    this.id = `download-task-${name}`;
    this.pausing.resolve();

    return reactive(this);
  }

  async saveMeta(data: TransferProgress) {
    const { name, path, fileHandle, total, loaded, percent } = Object.assign(
      this,
      data
    );
    await set(this.id, { name, path, fileHandle, total, loaded, percent });

    return this;
  }

  async *start(options: DownloadOptions = {}) {
    const { path } = this;
    const suggestedName = path.split('/').filter(Boolean).at(-1);

    this.fileHandle ||= await showSaveFilePicker({ suggestedName });

    const writer = await this.fileHandle.createWritable({
        keepExistingData: true
      }),
      stream = this.client.download(path, {
        range: [this.loaded],
        ...options
      });

    this.executing = true;

    try {
      for await (const chunk of stream) {
        await writer.write(chunk.buffer);

        yield this.saveMeta(chunk);

        await this.pausing.promise;
      }
    } finally {
      writer.close();
      this.executing = false;
    }
  }

  pause() {
    this.executing = false;
    this.pausing = Promise.withResolvers();
  }

  restart() {
    this.executing = true;
    this.pausing.resolve();
  }

  destroy() {
    this.pause();

    return del(this.id);
  }

  static async create(name: string, path: string) {
    const task = new DownloadTask(name, path);

    return Object.assign(task, await get(task.id), { path }) as DownloadTask;
  }
}

export class Downloader {
  constructor() {
    this.restoreTasks();

    return reactive(this);
  }

  tasks: DownloadTask[] = [];

  saveTasks() {
    return set(
      'downloader-tasks',
      this.tasks.map(({ id }) => id)
    );
  }

  async restoreTasks() {
    const list = await get<string[]>('downloader-tasks');

    if (!list) return;

    const dataList = (await getMany<DownloadTask>(list)).filter(Boolean);

    this.tasks = await Promise.all(
      dataList.map(({ name, path }) => DownloadTask.create(name, path))
    );
    return this.tasks;
  }

  async createTask(name: string, path: string) {
    const task = await DownloadTask.create(name, path);

    this.tasks.push(task);

    await this.saveTasks();

    return task;
  }

  async destroyTask(name: string) {
    const index = this.tasks.findIndex(({ name: N }) => N === name);

    if (index < 0) throw new ReferenceError(`${name} isn't found`);

    const [task] = this.tasks.splice(index, 1);

    await task.destroy();

    await this.saveTasks();
  }
}

export default new Downloader();
