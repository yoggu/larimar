<template>
  <div class="credits">
    <div class="navbar">
      <router-link class="menu" to="/menu"></router-link>
    </div>
    <div class="content">
      <h1>Credits</h1>
      <h2>Seline Schwab</h2>
      <h2>Yannick Bättig</h2>
    </div>  

  </div>
</template>

<script>

export default {
  name: 'Credits',
  components: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.credits {

  .navbar {
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 0 12px;
    z-index: 99;
    flex-shrink: 0;
    max-width: 1024px;
    width: 100%;

    .menu {
      background-image: url("../assets/images/icons/menu-white.png");
      background-size: contain;
      height: 30px;
      width: 20px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  .content {
    padding: 0 12px;
    max-width: 768px;
    margin: 0 auto;
    text-align: center;
  }
}

</style>