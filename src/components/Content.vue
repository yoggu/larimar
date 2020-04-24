<template v-for="(item, index) in content" :key="'content-'+index">
    <p v-if="item.type === 'text'" :class="item.classes" >{{item.text}}</p>
    <div v-else-if="item.type === 'image'" :class="item.container">
      <img v-for="(image, index) in item.images" :src="image.src" :key="'image-'+index" :class="image.classes">
    </div>
</template>

<script>
export default {
  name: 'Content',
  props: {
    content: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
