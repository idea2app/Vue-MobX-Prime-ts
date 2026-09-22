<template>
  <div id="nav" class="flex flex-wrap justify-center gap-x-2 gap-y-1">
    <router-link to="/">Home</router-link> |
    <router-link to="/decorator/class">Decorator (class)</router-link> |
    <router-link to="/decorator/function">Decorator (function)</router-link> |
    <router-link to="/component">Component</router-link> |
    <router-link to="/chart">Chart</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <main class="rich-text mx-auto w-full max-w-6xl px-4 pb-12">
    <router-view />
  </main>
</template>

<style lang="less">
#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: var(--foreground);
}

#nav {
  width: 100%;
  box-sizing: border-box;
  padding: 24px 16px;

  a {
    font-weight: bold;
    color: var(--foreground);

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
