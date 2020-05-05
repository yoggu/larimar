<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "node_modules/normalize-scss/sass/normalize/import-now";
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

html {
  height: 100%;
  font-family: 'Oswald', sans-serif;
}

body {
  min-height: 100%;
  background: $black;
  color: $white;
  font-family: 'Oswald', sans-serif;
}

* {
    box-sizing: border-box;
}

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  min-height: 100vh;
  font-family: 'Oswald', sans-serif;
}

h1 {
  color: #85d0e7;
}

img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}


a {
  font-weight: bold;
  color: $white;
  text-decoration: none;

  &:hover {
    color: $l-light;
  }

  &.router-link-exact-active {
    color: $l-light;
  }
}
</style>
