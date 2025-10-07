import { observer } from 'mobx-vue-helper';
import { Observer } from 'mobx-vue-lite';
import ProgressBar from 'primevue/progressbar';
import Card from 'primevue/card';

import IconButton from './IconButton';
import { downloader } from '../models/service';

export default observer(() => (
  <Observer>
    <ol class="list-none m-0 p-0 flex flex-col gap-3">
      {downloader.tasks.map(task => (
        <li key={task.id}>
          <Card>
            {{
              title: () => (
                <Observer>
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
                            <IconButton
                              icon="pause"
                              onClick={() => task.pause()}
                            />
                          ) : (
                            <IconButton
                              icon="play"
                              onClick={() => task.start()}
                            />
                          )}
                        </>
                      )}
                      {!task.executing && (
                        <IconButton
                          icon="times"
                          onClick={() => downloader.destroyTask(task.name)}
                        />
                      )}
                    </div>
                  </div>
                </Observer>
              ),
              content: () => (
                <Observer>
                  <ProgressBar
                    mode={
                      task.executing && !task.percent
                        ? 'indeterminate'
                        : 'determinate'
                    }
                    value={task.percent}
                  />
                </Observer>
              )
            }}
          </Card>
        </li>
      ))}
    </ol>
  </Observer>
));
