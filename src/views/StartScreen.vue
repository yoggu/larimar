<template>
  <div class="start-screen">
    <div class="title">
      <h1>Larimar</h1>
      <h2 class="subtitle">sag mir, was soll ich werden</h2>
    </div>
    <div class="frog">
      <router-link to="/menu">
        <!-- <img class="" :src="require('@/assets/images/frog_sleep.gif')"> -->
      </router-link>
    </div>
    <div class="start">
      <router-link to="/menu">
        Geschichte beginnen...
      </router-link>
    </div> 
  </div>
</template>

<script>
import {Howl} from 'howler';
export default {
  name: 'StartScreen',
  components: {},
  data: function(){
    return {
      audio: null
    }
  },
  mounted() {
    this.audio = new Howl({
        src: require("@/assets/audio/frog_sleep.mp3"),
        loop: true,
        volume: 1
      });
      this.audio.play();
  },
  destroyed() {
    this.audio.stop();
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.start-screen {
  max-width: 768px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #030303;

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

  .frog {
    background-image: url("../assets/images/frog_sleep.gif");
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

  }

  .start {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// @keyframes move-stone {
//   from {
//     transform: translateY(-10px);
//   }
//   to {
//     transform: translateY(10px);
//   }
  
// }

</style>