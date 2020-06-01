<template>
  <div :class="[open ? 'open' : '', type]" class="category">
    <div class="title" v-on:click="toggleOpen()"><h3>{{title}}</h3></div>
    <div class="description">{{description}}</div>
  </div>
</template>

<script>

export default {
  name: 'Category',
  props: ['type','title','description','index'],
  data: function() {
    return{
      open: false
    }
  },
  mounted () {

  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    }
  }
}

</script>

<style scoped lang="scss">

.category {

  .title {
    padding: 12px 0;
    position:relative;

    h3 {
      margin: 0;
    }

    &:after {
      position: absolute;
      right: 0;
      top:0;
      content: '';
      background-image: url("../assets/images/icons/arrow-down.png");
      background-repeat: no-repeat;
      background-size:contain;
      background-position: center;
      width: 20px;
      height: 100%;
      transform: rotate(180deg);
      transition: all 0.3s ease;
    }
  }

  .description {
    max-height: 0;
    opacity: 0;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  &.open {

    .description {
        opacity: 1;
        max-height: 500px;
    }

    .title {

      &:after {
        transform: rotate(0);
      }
    }

  }
}
</style>
