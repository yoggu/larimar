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
        zum Beginnen hier klicken
      </router-link>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'StartScreen',
  components: {},
  mounted() {},
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

  .title {
    grid-row: 1;
    grid-column: 2;
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