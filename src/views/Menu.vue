<template>
  <div>
    <h1>LARIMAR</h1>
    <div class="menu">
      <router-link class="menu-link" to="/game">Neues Spiel</router-link>
      <router-link class="menu-link" to="/">Laden (TODO)</router-link>
      <router-link class="menu-link" to="/">Weitere Informationen (TODO)</router-link>
      <router-link class="menu-link" to="/">Credits (TODO)</router-link>
    </div> 
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Menu',
  components: {}
}
</script>

<style lang="scss" scoped>

.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .menu-link {
    color: white;
    text-decoration: none;
    margin: 12px 0;

    &:hover {
      color: #85d0e7;
    }
  }
}

</style>