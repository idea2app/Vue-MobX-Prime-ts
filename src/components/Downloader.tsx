import { FunctionalComponent } from 'vue';
import { observer } from 'mobx-vue-helper';
import { DownloadTask } from 'mobx-downloader';
import { Pause, Play, X } from '@lucide/vue';

import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { IconButton } from './IconButton';
import { downloader } from '../models/service';

const DownloadTaskTitle: FunctionalComponent<{ task: DownloadTask }> = observer(({ task }) => (
  <div class="flex justify-between items-center">
    {task.name}
    <div class="flex items-center">
      <small class="font-normal text-sm">
        <span>{task.loadedSize.toShortString()}</span>
        {' / '}
        <span>{task.totalSize.toShortString()}</span>
      </small>
      {task.percent < 100 && (
        <>
          {task.executing ? (
            <IconButton icon={Pause} label="Pause" onClick={() => task.pause()} />
          ) : (
            <IconButton icon={Play} label="Play" onClick={() => task.start()} />
          )}
        </>
      )}
      {!task.executing && (
        <IconButton icon={X} label="Remove" onClick={() => downloader.destroyTask(task.name)} />
      )}
    </div>
  </div>
));

const DownloadTaskContent: FunctionalComponent<{ task: DownloadTask }> = observer(({ task }) => (
  <Progress modelValue={task.percent} />
));

export default observer(() => (
  <ol class="list-none m-0 p-0 flex flex-col gap-3">
    {downloader.tasks.map(task => (
      <li key={task.id}>
        <Card>
          <CardContent class="p-4">
            <DownloadTaskTitle task={task} />
            <DownloadTaskContent task={task} />
          </CardContent>
        </Card>
      </li>
    ))}
  </ol>
));
