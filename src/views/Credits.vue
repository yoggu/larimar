<template>
  <div class="credits">
    <div class="navbar">
      <router-link class="menu" to="/menu"></router-link>
    </div>
    <div class="content">
      <h1>Credits</h1>
      <h2>Ideation & Creation</h2>
      <h3>Seline Schwab</h3>
      <p>Design</p>
      <p>Story</p>
      <p>Illustrationen</p>
      <p>Research</p>
      <h3>Yannick Bättig</h3>
      <p>Programming</p>
      <p>Audio</p>
      <p>Research</p>

      <div>
        <p>Besonderen Dank an unsere Mentorinnen und Mentor und das BIZ Zug für die Unterstützung</p> 
      </div>
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