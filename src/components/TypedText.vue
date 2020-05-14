<template>
    <div v-on:click="showAll()">
      <p>{{visibleText}}</p>
    </div>  
</template>

<script>
export default {
  name: 'TypedText',
  props: {
    text: String,
    typeSpeed: Number,
    delay: Number,
    onComplete: Function,
  },
  data() {
    return {
      visibleText: "",
      position: 0,
      isTyping: true,
    }
  },
  mounted(){
    setTimeout(this.typeText, this.delay);
  },
  methods:{
    typeText() {
      if (this.position < this.text.length && this.isTyping) {
        this.visibleText += this.text.charAt(this.position);
        this.position++;
        setTimeout(this.typeText, this.typeSpeed);
      } else {
        this.isTyping = false;
        this.completed();
      }
    },
    showAll() {
      this.isTyping = false;
      this.visibleText = this.text;
    },
    completed() {
      this.$emit("onComplete");
    }
  },
}
</script>

<style scoped lang="scss">
  p {
    padding: 0 12px;
  }
</style>
