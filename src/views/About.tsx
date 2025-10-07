import { Component, toNative, Vue } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';
import Button from 'primevue/button';
import Card from 'primevue/card';

import project, { Project } from '../models/Project';

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

  renderProjectCard = ({ id, logo, name, description, homepage, html_url }: Project) => (
    <div class="col-12 sm:col-6 lg:col-3" key={id}>
      <Card>
        {{
          header: () => <img class="w-full" src={logo} />,
          title: () => name,
          content: () => <p class="m-0">{description}</p>,
          footer: () => (
            <div class="flex gap-3 mt-1">
              <a class="block w-full" target="_blank" href={homepage || ''}>
                <Button severity="primary" outlined>
                  Home page
                </Button>
              </a>
              <a class="block w-full" target="_blank" href={html_url}>
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
