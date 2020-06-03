<template>
  <div class="menu">
    <div class="menu-list">
      <a v-on:click.prevent="newGame" class="menu-link">Neues Spiel</a>
      <router-link v-if="$store.state.story !== null" class="menu-link" to="/game">Spiel fortsetzen</router-link>
      <router-link v-if="$store.state.isFinished" class="menu-link" to="/result">Mein Ergebnis</router-link>
      <router-link class="menu-link" to="/credits">Credits</router-link>
    </div> 
  </div>
</template>

<script>
import {Howl} from 'howler';
export default {
  name: 'Menu',
  components: {},
  data: function(){
    return {
      audio: null
    }
  },
  mounted() {
    this.audio = new Howl({
        src: require("@/assets/audio/tropfen.mp3"),
        loop: true,
        volume: 1
      });
      this.audio.play();
  },
  destroyed() {
    this.audio.stop();
  },
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
  background-image: url("../assets/images/tropfen.gif");
  background-repeat: no-repeat;
  background-size:contain;
  background-position: center;

  .menu-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 140px;

    .menu-link {
      margin: 12px 0;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      position: relative;
      padding-left: 30px;
      width: 160px;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top:0;
        background-image: url("../assets/images/icons/arrow-down.png");
        background-repeat: no-repeat;
        background-size:contain;
        background-position: center;
        width: 15px;
        height: 100%;
        transform: rotate(-90deg);
      }
    }
  }
}

</style>