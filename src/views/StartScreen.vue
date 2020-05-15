<template>
  <div class="start-screen">
    <div class="title">
      <img :src="require('@/assets/images/title.png')">
    </div>
    <div class="stone">
      <router-link to="/menu">
        <img class="move-stone" :src="require('@/assets/images/stone.png')">
      </router-link>
    </div>
    <div class="start">
      <router-link to="/menu">
      <img :src="require('@/assets/images/start.png')">
      </router-link>
    </div> 
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'StartScreen',
  components: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.start-screen {
  display: grid;
  grid-template-rows: 200px minmax(0,300px) 200px ;
  grid-template-columns: auto minmax(auto, 768px ) auto;;
  height: 100vh;
  overflow: hidden;

  .title {
    grid-row: 1;
    grid-column: 2;
    text-align: center;
  }

  .stone {
    grid-row: 2;
    grid-column: 2;
    text-align: center;

    .move-stone {
      animation: move-stone 1s infinite alternate ease-in-out;
    }
  }

  .start {
    grid-row: 3;
    grid-column: 2;
    text-align: center;
  }
}

@keyframes move-stone {
  from {
    transform: translateY(-10px);
  }
  to {
    transform: translateY(10px);
  }
  
}

</style>