# Vue-MobX-Bootstrap.ts

[Vue 3][1] project scaffold based on [TypeScript 4][2], [MobX 6][3] & [Bootstrap 5][4],
which is inspired by [WebCell scaffold][5].

[![NPM Dependency](https://david-dm.org/idea2app/Vue-MobX-Bootstrap-ts.svg)][6]
[![CI & CD](https://github.com/idea2app/Vue-MobX-Bootstrap-ts/workflows/CI%20&%20CD/badge.svg)][7]

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Knowledge

- [TypeScript 4][2]
- [MobX 6][3]
- [CoreUI-Vue 4](https://coreui.io/vue/docs/)
- [KoAJAX 0.7](https://github.com/EasyWebApp/KoAJAX)

## Extra components

- [`<StockNumber />`](src/components/StockNumber.vue)
- [`<Panel />`](src/components/Panel.vue)
- [`<Stepper />`](src/components/Stepper.vue)
- [`<Table />`](src/components/Table.vue)
- [`<ImageUploader />`](src/components/ImageUploader.vue)

## Usage

### Project setup

```Shell
npm install
```

### Compiles and hot-reloads for development

```Shell
npm start
```

### Compiles and minifies for production

```Shell
npm run build
```

### Lints and fixes files

```Shell
npm test
```

## Recommended IDE Setup

- [VSCode][8] + [Volar][9]

### Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

[1]: https://vuejs.org/
[2]: https://www.typescriptlang.org/
[3]: https://mobx.js.org/
[4]: https://getbootstrap.com/
[5]: https://github.com/EasyWebApp/scaffold
[6]: https://david-dm.org/idea2app/Vue-MobX-Bootstrap-ts
[7]: https://github.com/idea2app/Vue-MobX-Bootstrap-ts/actions
[8]: https://code.visualstudio.com/
[9]: https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar
