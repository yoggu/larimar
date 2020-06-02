<template>
    <div class="textbox" v-on:click="showAll()">
      <p>{{visibleText}}</p>
      <span :class="{'arrow-dark': dark}" class="arrow" v-show="!this.isTyping"></span>
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
    dark: Boolean
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
        this.completed();
      }
    },
    showAll() {
      if (this.isTyping) {
        this.isTyping = false;
        this.visibleText = this.text;
      }
      else {
        this.next();
      }
    },
    next() {
      this.$emit("next");
    },
    completed() {
      //console.log("complete")
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
  flex: 1;
  width:100%;
  position: relative;
  padding-right: 14px;

  p {
    width:100%;
    margin: 0;
  }

  .arrow {
      background-image: url("../assets/images/icons/continue.png");
      background-size: contain;
      height: 14px;
      width: 14px;
      background-repeat: no-repeat;
      background-position: center;
      right:0;
      top:0;
      position: absolute
  }
}

</style>
