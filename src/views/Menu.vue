<template>
  <div class="menu">
    <div class="title">
      <h1>Larimar</h1>
      <h2 class="subtitle">sag mir, was soll ich werden</h2>
    </div>
    <div class="menu-list">
      <a v-on:click.prevent="newGame" class="menu-link">Neues Spiel</a>
      <router-link v-if="$store.state.story !== null" class="menu-link" to="/game">Spiel fortsetzen</router-link>
      <router-link v-if="$store.state.isFinished" class="menu-link" to="/result">Mein Ergebnis</router-link>
      <router-link class="menu-link" to="/credits">Credits</router-link>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'Menu',
  components: {},
  mounted() {},
  methods: {
    newGame() {
      this.$store.commit('saveState', null);
      this.$router.push('/game')
    }
  }
}
</script>

<style lang="scss" scoped>

.menu {
  max-width: 768px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;


  .title {
    text-align: center;

    h1 {
      font-size: 60px;
      margin-bottom: 0;
    }

    .subtitle {
      font-size: 14px;
      margin: 0;
    }
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 60px;

    .menu-link {
      color: white;
      text-decoration: none;
      margin: 12px 0;
      font-weight: bold;
      cursor: pointer;
  
      &:hover {
        color: $l-light;
      }
    }
  }
}

</style>