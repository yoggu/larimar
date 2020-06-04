<template>
<div class="start-screen-container">
  <div class="start-screen">
    <div class="title">
      <h1>Larimar</h1>
      <h2 class="subtitle">eine Geschichte deiner Interessen</h2>
    </div>
    <div class="frog"></div>
    <div class="start">
      <router-link to="/menu">
        Geschichte beginnen...
      </router-link>
    </div> 
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
.start-screen-container {
  background-color: #030303;
}

.start-screen {
  max-width: 768px;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .title {
    text-align: center;
    z-index: 1;

    h1 {
      font-size: 70px;
      margin-bottom: 0;
    }

    .subtitle {
      font-size: 17px;
      margin: -6px 0 0 0;
    }
  }

  .frog {
    margin-top: -40px;
    background-image: url("../assets/images/frog_sleep.gif");
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

  }

  .start {
    height: 150px;
    display: flex;
    justify-content: center;
    font-size: 18px;
    padding-top: 30px;
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