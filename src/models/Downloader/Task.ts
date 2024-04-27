import { del, get, set } from 'idb-keyval';
import { type TransferProgress } from 'koajax';
import type { FileSystemHandle } from 'native-file-system-adapter';
import { reactive } from 'vue';

export abstract class Scalar {
  abstract units: { base: number; name: string }[];

  constructor(public value: number) {}

  valueOf() {
    return this.value;
  }

  toShortString(fractionDigits = 2) {
    const { units, value } = this;
    const { base, name } =
      units.findLast(({ base }) => Math.abs(value) >= base) || units[0];

    return `${(value / base).toFixed(fractionDigits)} ${name}`;
  }

  static distanceOf(a: Scalar, b: Scalar) {
    return Reflect.construct(this, [a.value - b.value]);
  }
}

export class FileSize extends Scalar {
  units = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'].map((name, i) => ({
    base: 1024 ** i,
    name: name + 'B'
  }));
}

export abstract class DownloadTask implements Partial<TransferProgress> {
  id = '';
  fsHandle?: FileSystemHandle;
  total = 0;
  loaded = 0;
  percent = 0;
  executing = false;
  pausing = Promise.withResolvers<void>();

  get totalSize() {
    return new FileSize(this.total);
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

  async saveMeta(data: Partial<Omit<TransferProgress, 'buffer'>> = {}) {
    const meta = Object.assign(this, data).toJSON();

    for (const key in meta) {
      const value = Reflect.get(meta, key);

      if (
        value &&
        typeof value === 'object' &&
        typeof Reflect.get(value, 'toJSON') === 'function'
      )
        Reflect.set(meta, key, JSON.parse(JSON.stringify(value)));
    }
    await set(this.id, meta);

    return this;
  }

  abstract start(...options: any[]): AsyncGenerator<this>;

  async pause() {
    this.executing = false;
    this.pausing = Promise.withResolvers();
  }

  async resume() {
    this.executing = true;
    this.pausing.resolve();
  }

  destroy() {
    this.pause();

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
