import { del, get, set } from 'idb-keyval';
import { type TransferProgress } from 'koajax';
import type { FileSystemHandle } from 'native-file-system-adapter';
import { isReactive, reactive, toRaw } from 'vue';
import { ByteSize } from 'web-utility';

export abstract class DownloadTask implements Partial<TransferProgress> {
  id = '';
  fsHandle?: FileSystemHandle;
  total = 0;
  loaded = 0;
  percent = 0;
  executing = false;
  pausing = Promise.withResolvers<void>();

  get totalSize() {
    return new ByteSize(this.total);
  }

  constructor(
    public name: string,
    public path: string
  ) {
    this.pausing.resolve();

    return reactive(this);
  }

  toJSON() {
    const { id, name, path, fsHandle, total, loaded, percent, executing } =
      this;

    return { id, name, path, fsHandle, total, loaded, percent, executing };
  }

  async saveMeta(data: Partial<TransferProgress> = {}) {
    const { buffer, ...progress } = data;
    const meta = Object.assign(this, progress).toJSON();

    for (const key in meta) {
      const value = Reflect.get(meta, key);

      if (value && typeof value === 'object')
        Reflect.set(
          meta,
          key,
          typeof Reflect.get(value, 'toJSON') === 'function'
            ? JSON.parse(JSON.stringify(value))
            : isReactive(value)
              ? toRaw(value)
              : value
        );
    }
    await set(this.id, meta);

    return data;
  }

  abstract start(...options: any[]): AsyncGenerator<Partial<TransferProgress>>;

  async pause() {
    this.executing = false;
    this.pausing = Promise.withResolvers();
  }

  async resume() {
    this.executing = true;
    this.pausing.resolve();
  }

  async destroy() {
    await this.pause();

    return del(this.id);
  }

  static async create(name: string, path: string) {
    const task = Reflect.construct(this, [name, path]) as DownloadTask,
      cache = await get<DownloadTask>(task.id);

    return Object.assign(task, cache, { path }) as DownloadTask;
  }
}

export interface DownloadTaskClass {
  new (name: string, path: string): DownloadTask;
  create(name: string, path: string): Promise<DownloadTask>;
}
