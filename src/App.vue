<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "node_modules/normalize-scss/sass/normalize/import-now";

html {
  min-height: 100%;
}

body {
  min-height: 100%;
  background: $black;
  color: $white;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

h1 {
  color: #85d0e7;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #ca5ed8;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
