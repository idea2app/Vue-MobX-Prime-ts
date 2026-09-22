import { Component, toNative, Vue } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';

import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/card';

import project, { Project } from '../models/Project';

@Component
@observer
class About extends Vue {
  mounted() {
    project.getList(
      'vuejs/vue',
      'mobxjs/mobx',
      'unovue/shadcn-vue',
      'idea2app/ECharts-JSX',
      'EasyWebApp/KoAJAX',
      'microsoft/TypeScript',
      'parcel-bundler/parcel'
    );
  }

  renderProjectCard = ({ id, logo, name, description, homepage, html_url }: Project) => (
    <div key={id + ''}>
      <Card>
        <CardHeader class="p-0">
          <img class="w-full rounded-t-lg" src={logo} />
          <CardTitle class="px-4 pt-4">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="m-0">{description}</p>
        </CardContent>
        <CardFooter class="flex gap-3">
          <a class="block w-full" target="_blank" href={homepage || ''}>
            <Button class="w-full" variant="outline">Home page</Button>
          </a>
          <a class="block w-full" target="_blank" href={html_url}>
            <Button class="w-full">Source code</Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );

  render() {
    return (
      <div class="mx-auto w-full text-center">
        <h1 class="mb-8 text-center text-3xl font-bold">Core libraries of this Project scaffold</h1>

        <div class="grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
          {project.list.map(this.renderProjectCard)}
        </div>
      </div>
    );
  }
}
export default toNative(About);
