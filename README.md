# Vue-Prime.ts

[Vue 3][1] project scaffold based on [TypeScript 5][2] & [PrimeVue 3][3],
which is inspired by [WebCell scaffold][4].

[![CI & CD](https://github.com/idea2app/Vue-Prime-ts/actions/workflows/main.yml/badge.svg)][5]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][6]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][7]

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs][8] to learn more.

## Knowledge

- [TypeScript 5][2]
- [PrimeVue 3][3]
- [ECharts-JSX 1][9]
- [KoAJAX 1][10]
- [Parcel 2][11]

## Extra components

- [`<StockNumber />`](src/components/StockNumber.vue)
- [`<Overlay />`](src/components/Overlay.vue)
- [`<Image />`](src/components/Image.vue)
- [`<ImageUploader />`](src/components/ImageUploader.vue)
- [`<Downloader />`](src/components/Downloader.vue)

## Best practice

1. Install GitHub apps in your organization or account:

   1. [Probot settings][12]: set up Issue labels & Pull Request rules
   2. [PR badge][13]: set up Online [VS Code][14] editor entries in Pull Request description

2. Click the **[Use this template][15] button** on the top of this GitHub repository's home page, then create your own repository in the app-installed namespace above

3. Click the **[Open in GitHub codespaces][6] button** on the top of ReadMe file, then an **online VS Code development environment** will be started immediately

4. Set [Vercel variables][16] as [Repository secrets][17], then every commit will get an independent **Preview URL**

5. Recommend to add a [Notification step in GitHub actions][18] for your Team IM app

6. Remind the PMs & users of your product to submit **Feature/Enhancement** requests or **Bug** reports with [Issue forms][19] instead of IM messages or Mobile Phone calls

7. Collect all these issues into [Project kanbans][20], then create **Pull requests** & add `closes #issue_number` into its description for automation

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

- [VSCode][14] + [Volar][21]

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

[1]: https://vuejs.org/
[2]: https://www.typescriptlang.org/
[3]: https://primevue.org/
[4]: https://github.com/EasyWebApp/scaffold
[5]: https://github.com/idea2app/Vue-Prime-ts/actions/workflows/main.yml
[6]: https://codespaces.new/idea2app/Vue-Prime-ts
[7]: https://gitpod.io/?autostart=true#https://github.com/idea2app/Vue-Prime-ts
[8]: https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
[9]: https://github.com/idea2app/ECharts-JSX
[10]: https://github.com/EasyWebApp/KoAJAX
[11]: https://parceljs.org/
[12]: https://probot.github.io/apps/settings/
[13]: https://pullrequestbadge.com/
[14]: https://code.visualstudio.com/
[15]: https://github.com/new?template_name=Vue-Prime-ts&template_owner=idea2app
[16]: https://github.com/idea2app/Next-Bootstrap-ts/blob/80967ed49045af9dbcf4d3695a2c39d53a6f71f1/.github/workflows/pull-request.yml#L9-L11
[17]: https://github.com/idea2app/Vue-Prime-ts/settings/secrets/actions
[18]: https://github.com/kaiyuanshe/kaiyuanshe.github.io/blob/bb4675a56bf1d6b207231313da5ed0af7cf0ebd6/.github/workflows/pull-request.yml#L32-L56
[19]: https://github.com/idea2app/Vue-Prime-ts/issues/new/choose
[20]: https://github.com/idea2app/Vue-Prime-ts/projects
[21]: https://marketplace.visualstudio.com/items?itemName=vue.volar
