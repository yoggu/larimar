<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "node_modules/normalize-scss/sass/normalize/import-now";
@import url('https://fonts.googleapis.com/css2?family=IM+Fell+Double+Pica&display=swap');

html {
  height: 100%;
  font-weight: 400;
  font-style: normal;
}

body {
  min-height: 100%;
  background: black;
  color: white;
}

* {
    box-sizing: border-box;
}

#app {
  font-family: 'IM Fell Double Pica', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

img {
  max-width: 100%;
  height: 100%;
}


a {
  color: white;
  text-decoration: none;

  &:hover {
    color: $l-medium;
  }

  &.router-link-exact-active {
    color: $l-medium;
  }
}

.stop-scrolling {
  overflow: hidden;
  height: 100vh;
}

</style>
