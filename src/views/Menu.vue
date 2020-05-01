<template>
  <div class="menu">
    <div class="title">
      <img :src="require('@/assets/images/title.png')">
    </div>
    <div class="menu-list">
      <a v-on:click.prevent="newGame" class="menu-link">Neues Spiel</a>
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
  display: grid;
  grid-template-rows: 200px 1fr ;
  grid-template-columns: 1fr;
}

.title {
  grid-row: 1;
  grid-column: 1;
}

.menu-list {
  grid-row: 2;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .menu-link {
    color: $white;
    text-decoration: none;
    margin: 12px 0;
    cursor: pointer;

    &:hover {
      color: $l-light;
    }
  }
}

</style>