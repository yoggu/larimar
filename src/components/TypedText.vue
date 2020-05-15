<template>
    <div class="textbox" v-on:click="showAll()">
      <p>{{visibleText}}</p>
      <span v-show="!this.isTyping">&#9660;</span>
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
  watch: { 
    text: function() { // watch it
      this.reset();
      setTimeout(this.typeText, this.delay);
    }
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
      }
    },
    showAll() {
      if (this.isTyping) {
        this.isTyping = false;
        this.visibleText = this.text;
      }
      else {
        this.completed();
      }
    },
    completed() {
      console.log("complete")
      this.$emit("onComplete");
    },
    reset() {
      this.visibleText = "";
      this.position = 0;
      this.isTyping = true;
    }
  },
}
</script>

<style scoped lang="scss">
.textbox {
  display: flex;
  justify-content: space-between;
  flex: 1;
  p { 
    margin: 0;
  }
}

</style>
