<template>
  <div :class="[open ? 'open' : '', category.type]" class="category">
    <div class="title" v-on:click="toggleOpen()"><span class="letter">{{category.letter}}</span><h3>{{category.title}}</h3></div>
    <div class="description">{{category.description}}</div>
  </div>
</template>

<script>

export default {
  name: 'Category',
  props: ['category','index'],
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  .title {
    padding: 12px;
    text-align: left;
    width: 200px;
    display: flex;


    h3 {
      margin: 0;
      cursor: default;
      position:relative;
      padding-right: 30px;
      font-size: 20px;

      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 4px;
        background-image: url("../assets/images/icons/arrow-down.png");
        background-repeat: no-repeat;
        background-size:contain;
        background-position: center;
        width: 15px;
        height: 15px;
        transform: rotate(-90deg);
        transition: transform 0.3s ease;
      }
    }
    .letter {
      margin-right: 20px;
      font-size: 20px;
      color: $l-medium;
    }

  }

  .description {
    max-height: 0;
    opacity: 0;
    transition: all 0.3s ease;
    overflow: hidden;
    max-width: $small;
    margin: 0 auto;
    text-align: left;
  }

  &.open {

    .description {
        opacity: 1;
        max-height: 500px;
    }

    .title {
      h3 {
        &:after {
          transform: rotate(0);
        }
      }

    }

  }
}
</style>
