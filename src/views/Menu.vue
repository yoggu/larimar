<template>
  <div>
    <h1>LARIMAR</h1>
    <div class="menu">
      <a v-on:click.prevent="newGame" class="menu-link" to="/game">Neues Spiel</a>
      <router-link v-if="$store.state.story !== null" class="menu-link" to="/game">Spiel fortsetzen</router-link>
      <router-link class="menu-link" to="/">Weitere Informationen (TODO)</router-link>
      <router-link class="menu-link" to="/">Credits (TODO)</router-link>
    </div> 
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Menu',
  components: {},
  mounted: function() {

  },
  methods: {
    newGame: function() {
      this.$store.commit('saveState', null);
      this.$router.push('/game')
    }
  }
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
    cursor: pointer;

    &:hover {
      color: #85d0e7;
    }
  }
}

</style>