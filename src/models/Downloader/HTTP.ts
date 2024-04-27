import { HTTPClient, type DownloadOptions } from 'koajax';
import {
  FileSystemFileHandle,
  showSaveFilePicker
} from 'native-file-system-adapter';

import { DownloadTask } from './Task';

export class HTTPDownloadTask extends DownloadTask {
  declare fsHandle?: FileSystemFileHandle;

  client = new HTTPClient({ responseType: 'arraybuffer' });

  constructor(
    public name: string,
    public path: string
  ) {
    super(name, path);

    this.id = `download-task-${name}`;
  }

  async *start(options: DownloadOptions = {}) {
    const { path } = this;
    const suggestedName = path.split('/').filter(Boolean).at(-1);

    try {
      this.fsHandle ||= await showSaveFilePicker({
        suggestedName
      });
    } catch {
      return;
    }
    const writer = await this.fsHandle.createWritable({
        keepExistingData: true
      }),
      stream = this.client.download(path, {
        range: [this.loaded],
        ...options
      });

    try {
      for await (const chunk of stream) {
        this.executing = true;

        await writer.write(chunk.buffer);

        yield this.saveMeta(chunk);

        await this.pausing.promise;
      }
    } finally {
      await writer.close();
      this.executing = false;
      await this.saveMeta();
    }
  }
}
