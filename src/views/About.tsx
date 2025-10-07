import { Component, toNative, Vue } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';
import Button from 'primevue/button';
import Card from 'primevue/card';

import project from '../models/Project';

@Component
@observer
class About extends Vue {
  mounted() {
    project.getList(
      'vuejs/vue',
      'mobxjs/mobx',
      'primefaces/primevue',
      'idea2app/ECharts-JSX',
      'EasyWebApp/KoAJAX',
      'microsoft/TypeScript',
      'parcel-bundler/parcel'
    );
  }

  renderProjectCard = (item: (typeof project.list)[0]) => (
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
              <a class="block w-full" target="_blank" href={item.html_url}>
                <Button severity="success">Source code</Button>
              </a>
            </div>
          )
        }}
      </Card>
    </div>
  );

  render() {
    return (
      <>
        <h1>Core libraries of this Project scaffold</h1>

        <div class="grid">{project.list.map(this.renderProjectCard)}</div>
      </>
    );
  }
}

export default toNative(About);
