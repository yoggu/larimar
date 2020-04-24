<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/game">Start</router-link>
    </div>
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
  background: black;
  color: white;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
