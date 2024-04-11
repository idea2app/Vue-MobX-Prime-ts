# Vue-Prime.ts

[Vue 3][1] project scaffold based on [TypeScript 5][2] & [PrimeVue 3][3],
which is inspired by [WebCell scaffold][4].

[![CI & CD](https://github.com/idea2app/Vue-Prime-ts/actions/workflows/main.yml/badge.svg)][5]

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)][6]
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)][7]

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs][8] to learn more.

## Knowledge

- [TypeScript 5][2]
- [PrimeVue 3](https://primevue.org/)
- [ECharts-JSX 1](https://github.com/idea2app/ECharts-JSX)
- [KoAJAX 1](https://github.com/EasyWebApp/KoAJAX)
- [Parcel 2](https://parceljs.org/)

## Extra components

- [`<StockNumber />`](src/components/StockNumber.vue)
- [`<Overlay />`](src/components/Overlay.vue)
- [`<Image />`](src/components/Image.vue)
- [`<ImageUploader />`](src/components/ImageUploader.vue)
- [`<Downloader />`](src/components/Downloader.vue)

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

- [VSCode][9] + [Volar][10]

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
[9]: https://code.visualstudio.com/
[10]: https://marketplace.visualstudio.com/items?itemName=vue.volar
