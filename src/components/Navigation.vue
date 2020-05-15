<template>
    <div class="navbar" :class="{ 'hidden-navbar': !showNavbar }">
      <router-link to="/menu">menU</router-link>
    </div> 
</template>

<script>
const OFFSET = 40
export default {
  name: 'Navigation',
  props: {},
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      scrollValue: 0
    }
  },
  mounted(){
    this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll () {
        // Get the current scroll position
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop    
        
        // stop if less than 0
        if (currentScrollPosition < 0) {
          return
        }
        
        // stop if difference is smaller than offset
        if (Math.abs(currentScrollPosition - this.lastScrollPosition) < OFFSET) {
          return
        }

        this.showNavbar = currentScrollPosition < this.lastScrollPosition    
        this.lastScrollPosition = currentScrollPosition
    }
  }
}
</script>

<style scoped lang="scss">

.navbar {
  position: fixed;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 12px;
  transition: all 0.2s ease-in-out;
  width: 100%;
  height: 40px;
  z-index: 99;
  background-color: white;
  transform: translate3d(0, 0, 0);
  box-shadow: 0 2px 10px rgba(245, 245, 245, 0.8);

  a {
    color: black;
    font-weight: 400;
  }

  &.hidden-navbar {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
  }

}
</style>
