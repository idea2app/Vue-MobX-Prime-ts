import { onMounted } from 'vue';
import { observer } from 'mobx-vue-helper';
import { Observer } from 'mobx-vue-lite';
import Button from 'primevue/button';
import Card from 'primevue/card';

import project from '../models/Project';

export default observer(() => {
  onMounted(() =>
    project.getList(
      'vuejs/vue',
      'mobxjs/mobx',
      'primefaces/primevue',
      'idea2app/ECharts-JSX',
      'EasyWebApp/KoAJAX',
      'microsoft/TypeScript',
      'parcel-bundler/parcel'
    )
  );

  return (
    <>
      <h1>Core libraries of this Project scaffold</h1>

      <div class="grid">
        <Observer>
          <>
            {project.list.map(item => (
              <div class="col-12 sm:col-6 lg:col-3" key={item.id}>
                <Card>
                  {{
                    header: () => <img class="w-full" src={item.logo} />,
                    title: () => item.name,
                    content: () => <p class="m-0">{item.description}</p>,
                    footer: () => (
                      <div class="flex gap-3 mt-1">
                        <a
                          class="block w-full"
                          target="_blank"
                          href={item.homepage || ''}
                        >
                          <Button severity="primary" outlined>
                            Home page
                          </Button>
                        </a>
                        <a
                          class="block w-full"
                          target="_blank"
                          href={item.html_url}
                        >
                          <Button severity="success">Source code</Button>
                        </a>
                      </div>
                    )
                  }}
                </Card>
              </div>
            ))}
          </>
        </Observer>
      </div>
    </>
  );
});
