import { del, get, set } from 'idb-keyval';
import type { DownloadOptions, TransferProgress } from 'koajax';
import type { FileSystemHandle } from 'native-file-system-adapter';
import { isReactive, toRaw, watch } from 'vue';
import { ReadableStream } from 'web-streams-polyfill';
import { ByteSize } from 'web-utility';

export abstract class DownloadTask implements Partial<TransferProgress> {
  id = '';
  fsHandle?: FileSystemHandle;
  total = 0;
  loaded = 0;
  percent = 0;
  executing = false;
  options?: DownloadOptions;

  stream?: ReadableStream<Partial<TransferProgress>>;

  get totalSize() {
    return new ByteSize(this.total);
  }

  get loadedSize() {
    return new ByteSize(this.loaded);
  }

  constructor(
    public name: string,
    public path: string
  ) {}

  toJSON() {
    const { id, name, path, fsHandle, total, loaded, percent, options } = this;

    return {
      ...{ id, name, path, fsHandle, options },
      ...{ total, loaded, percent }
    };
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

  abstract loadStream(
    options?: DownloadOptions
  ): AsyncGenerator<Partial<TransferProgress>>;

  async pause() {
    this.executing = false;
  }

  async start(options = this.options) {
    this.options = options;

    const [innerStream, outerStream] = ReadableStream.from<
      Partial<TransferProgress>
    >(this.loadStream(options)).tee();

    (async () => {
      for await (const chunk of innerStream) console.table(chunk);
    })();

    return (this.stream = outerStream);
  }

  async destroy() {
    await this.pause();

    return del(this.id);
  }

  onFinished(callback: (task: DownloadTask) => any) {
    return watch(
      () => this.percent === 100,
      () => callback(this)
    );
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
