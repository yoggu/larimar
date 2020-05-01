<template>
  <div class="svg" :id = vivusId :ref= vivusId></div>
</template>

<script>
import Vivus from "vivus";

export default {
  name: 'DrawSvg',
  data () {
    return {
      svg: null
    }
  },
  props:{
    vivusId:{
      type:String,
      default:'vivusId'
    },
    file:{
      type:String,
      default: ''
    },
    type:{
      type:String,
      default:'delayed'
    },
    duration:{
      type:Number ,
      default:200  
    },
    start:{
      type:String,
      default:'inViewport' 
    },
    onReady:{
      type:Function,
      default:function(){
      }
    },
    callBack:{
      type:Function,
      default: function() {
        console.log(this)
        this.parentEl.classList.add('finished');
      }
    },
    pathTiming:{
      type:String,
      default:'EASE'
    },
    animTiming:{
      type:String,
      default:'EASE'
    },
    dashGap:{
      type:Number,
      default:2
    },
    forceRender:{
      type:Boolean,
      default:true
    },
    reverseStack:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    this.initVueSvg()
  },
  methods:{
    initVueSvg() {
      let pathTimingFunction,animTimingFunction
      switch (this.pathTiming) {
        case 'EASE':
          pathTimingFunction = Vivus.EASE
          break;
        case 'EASE_IN':
          pathTimingFunction = Vivus.EASE_IN
        break;
        case 'EASE_OUT':
          pathTimingFunction = Vivus.EASE_OUT
        break;
        case 'EASE_OUT_BOUNCE':
          pathTimingFunction = Vivus.EASE_OUT_BOUNCE
        break;
        default:
          break;
      }
       switch (this.animTiming) {
        case 'EASE':
          animTimingFunction = Vivus.EASE
          break;
        case 'EASE_IN':
          animTimingFunction = Vivus.EASE_IN
        break;
        case 'EASE_OUT':
          animTimingFunction = Vivus.EASE_OUT
        break;
        case 'EASE_OUT_BOUNCE':
          animTimingFunction = Vivus.EASE_OUT_BOUNCE
        break;
        default:
          break;
      }
      this.svg = new Vivus(this.vivusId,
      {
      type: this.type,
      duration: this.duration,
      file:this.file,
      onReady:this.onReady,
      pathTimingFunction:pathTimingFunction,
      animTimingFunction:animTimingFunction,
      dashGap:this.dashGap,
      forceRender:this.forceRender,
      reverseStack:this.reverseStack
      },this.callBack)
    },
    stop(){
      this.svg.stop()
    }, 
    reset(){
      this.svg.reset()
    }, 
    play(speed,fun){
      this.svg.play(speed,fun) 
    },
    finish(){
      this.svg.finish()
    }, 
    setFrameProgress(progress){
      this.svg.setFrameProgress(progress) // 0~1
    }, 
    getStatus(){
      this.svg.getStatus()
    }, 
    destroy(){
      this.svg.destroy()
    },
    finishDrawing() {
      console.log("done")
      this.vivusId.classList.add('finished');
    }
  },
  destroyed(){
    this.svg.destroy()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.svg {
  fill-opacity: 0;
  transition: fill-opacity 1s;
}
.finished {
  fill-opacity: 1;
}
</style>
