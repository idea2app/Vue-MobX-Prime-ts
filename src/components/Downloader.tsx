import { FunctionalComponent } from 'vue';
import { observer } from 'mobx-vue-helper';
import { DownloadTask } from 'mobx-downloader';
import ProgressBar from 'primevue/progressbar';
import Card from 'primevue/card';

import { IconButton } from './IconButton';
import { downloader } from '../models/service';

const DownloadTaskTitle: FunctionalComponent<{ task: DownloadTask }> = observer(({ task }) => (
  <div class="flex justify-between items-center">
    {task.name}
    <div class="flex align-items-center">
      <small class="font-normal text-sm">
        <span>{task.loadedSize.toShortString()}</span>
        {' / '}
        <span>{task.totalSize.toShortString()}</span>
      </small>
      {task.percent < 100 && (
        <>
          {task.executing ? (
            <IconButton icon="pause" onClick={() => task.pause()} />
          ) : (
            <IconButton icon="play" onClick={() => task.start()} />
          )}
        </>
      )}
      {!task.executing && (
        <IconButton icon="times" onClick={() => downloader.destroyTask(task.name)} />
      )}
    </div>
  </div>
));

const DownloadTaskContent: FunctionalComponent<{ task: DownloadTask }> = observer(({ task }) => (
  <ProgressBar
    mode={task.executing && !task.percent ? 'indeterminate' : 'determinate'}
    value={task.percent}
  />
));

export default observer(() => (
  <ol class="list-none m-0 p-0 flex flex-col gap-3">
    {downloader.tasks.map(task => (
      <li key={task.id}>
        <Card>
          {{
            title: () => <DownloadTaskTitle task={task} />,
            content: () => <DownloadTaskContent task={task} />
          }}
        </Card>
      </li>
    ))}
  </ol>
));
