# Vue-MobX-Prime-ts

[Vue 3][1] project scaffold based on [TypeScript 5][2], [MobX][3] & [PrimeVue 3][4], which is inspired by [WebCell scaffold][5].

[![CI & CD](https://github.com/idea2app/Vue-MobX-Prime-ts/actions/workflows/main.yml/badge.svg)][6]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][7]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][8]

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs][9] to learn more.

## Knowledge

- Language: [TypeScript 5][2] + [ES Decorator][10] (stage-3)
- Component engine: [Vue 3][1]
- Component suite: [PrimeVue 4][4]
- Chart library: [ECharts-JSX 1][11]
- State management: [MobX 6][3]
- HTTP client: [KoAJAX 3][12]
- Asset bundler: [Parcel 2][13]

## Extra components

1. [`<StockNumber />`](src/components/StockNumber.tsx)
2. [`<Overlay />`](src/components/Overlay.tsx)
3. [`<Image />`](src/components/Image.tsx)
4. [`<ImageUploader />`](src/components/ImageUploader.tsx)
5. [`<Downloader />`](src/components/Downloader.tsx)

## MobX Observer decorator

This scaffold uses the [`mobx-vue-helper`][14] package, which provides an `@observer` decorator that makes Vue components reactive to MobX observable state changes, similar to `mobx-react`. It supports both class components and function components.

### Usage with Class components

```tsx
import { Vue, Component, toNative } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';

import counterStore from './models/Counter';

@Component
@observer
class MyMobX extends Vue {
  render() {
    return (
      <button onClick={() => counterStore.increment()}>
        Count: {counterStore.count}
      </button>
    );
  }
}
export default toNative(MyMobX);
```

### Usage with Function components

```tsx
import { observer } from 'mobx-vue-helper';

import counterStore from './models/Counter';

export const MyMobX = observer(() => (
  <button onClick={() => counterStore.increment()}>
    Count: {counterStore.count}
  </button>
));
```

## Best practice

1.  Install GitHub apps in your organization or account:
    1.  [Probot settings][15]: set up Issue labels & Pull Request rules
    2.  [PR badge][16]: set up Online [VS Code][17] editor entries in Pull Request description

2.  Click the **[Use this template][18] button** on the top of this GitHub repository's home page, then create your own repository in the app-installed namespace above

3.  Click the **[Open in GitHub codespaces][7] button** on the top of ReadMe file, then an **online VS Code development environment** will be started immediately

4.  Set [Vercel variables][19] as [Repository secrets][20], then every commit will get an independent **Preview URL**

5.  Recommend to add a [Notification step in GitHub actions][21] for your Team IM app

6.  Remind the PMs & users of your product to submit **Feature/Enhancement** requests or **Bug** reports with [Issue forms][22] instead of IM messages or Mobile Phone calls

7.  Collect all these issues into [Project kanbans][23], then create **Pull requests** & add `closes #issue_number` into its description for automation

## Usage

### Project setup

```Shell
npm i pnpm -g
pnpm i
```

### Compiles and hot-reloads for development

```Shell
npm start
```

### Compiles and minifies for production

```Shell
pnpm build
```

### Lints and fixes files

```Shell
npm test
```

## Recommended IDE Setup

- [VSCode][17] + [TypeScript][2] official extension + [Prettier][25] formatter extension

Ditch Volar and go back to the official TypeScript and Prettier extensions for a high-performance, high-quality development experience.

[1]: https://vuejs.org/
[2]: https://www.typescriptlang.org/
[3]: https://mobx.js.org/
[4]: https://primevue.org/
[5]: https://github.com/EasyWebApp/scaffold
[6]: https://github.com/idea2app/Vue-MobX-Prime-ts/actions/workflows/main.yml
[7]: https://codespaces.new/idea2app/Vue-MobX-Prime-ts
[8]: https://gitpod.io/?autostart=true#https://github.com/idea2app/Vue-MobX-Prime-ts
[9]: https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
[10]: https://github.com/tc39/proposal-decorators
[11]: https://github.com/idea2app/ECharts-JSX
[12]: https://github.com/EasyWebApp/KoAJAX
[13]: https://parceljs.org/
[14]: https://github.com/idea2app/MobX-Vue-helper
[15]: https://probot.github.io/apps/settings/
[16]: https://pullrequestbadge.com/
[17]: https://code.visualstudio.com/
[18]: https://github.com/new?template_name=Vue-MobX-Prime-ts&template_owner=idea2app
[19]: https://github.com/idea2app/Next-Bootstrap-ts/blob/80967ed49045af9dbcf4d3695a2c39d53a6f71f1/.github/workflows/pull-request.yml#L9-L11
[20]: https://github.com/idea2app/Vue-MobX-Prime-ts/settings/secrets/actions
[21]: https://github.com/kaiyuanshe/kaiyuanshe.github.io/blob/bb4675a56bf1d6b207231313da5ed0af7cf0ebd6/.github/workflows/pull-request.yml#L32-L56
[22]: https://github.com/idea2app/Vue-MobX-Prime-ts/issues/new/choose
[23]: https://github.com/idea2app/Vue-MobX-Prime-ts/projects
[24]: https://marketplace.visualstudio.com/items?itemName=vue.volar
[25]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
