<template>
  <div class="game" :class="{dark: dark}">
    <div class="navbar">
      <router-link to="/menu">menü</router-link>
      <a v-on:click.prevent="toggleMute()" class="audio" :class="{'audio-dark': dark, 'mute': mute}">
      </a>
    </div> 
    <div class="story" ref="story" v-if="!finished">
        <div class="image-container" v-on:click="showText()">
          <div v-if="currentImage.type === 'image'" :class="currentImage.container" class="container">
            <transition-group name="fade">
            <img
              v-for="(image, index) in currentImage.images"
              :src="image.src"
              :key="'image-'+index+image.src"
              :class="image.classes"
            />
            </transition-group>
          </div>
          <draw-svg v-else-if="currentImage.type === 'svg'" :duration=200 :class = currentImage.container :vivusId ="'vivus'+index" :file= currentImage.src type="delayed" :ref="'vivus'+index"></draw-svg>
        </div>  
        <div class="text-container">
          <typed-text ref="typedText" :typeSpeed="20" :text="currentText.text" :class="currentText.classes" @next="continueStory()" @onComplete="showChoice = true"></typed-text>
          <div class="choices" v-show="showChoice">
            <a
              class="choice"
              v-on:click.prevent="select(choice)"
              v-for="(choice, index) in choices"
              :key="'choice-'+index"
            ><span class="arrow">&#x25b7;</span> {{choice.text}}</a>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
let counter = 0
import { Story } from "inkjs";
import {Howl, Howler} from 'howler';
import json from "../ink/export/story.json";
import DrawSvg from "../components/DrawSvg";
import TypedText from "../components/TypedText";

export default {
  name: "Game",
  components: {
    DrawSvg,
    TypedText
  },
  data: function() {
    return {
      story: null,
      choices: [],
      tags: [],
      customClasses: [],
      currentText: Object,
      currentImage: Object,
      currentAudio: Object,
      finished: false,
      result: {},
      showChoice: false,
      dark: false,
      mute: false
    };
  },
  mounted () {
    this.story = new Story(json);
    if (this.$store.state.story !== null) {
      this.load();
    } else {
      this.restart();
    }
    //this.checkPermission();

  },
  destroyed() {
    Howler.stop();
  }, 
  methods: {
    // main gameplay loop
    continueStory() {
      if (this.story.canContinue) {
        this.showChoice = false;
        //console.log(this.content);
        let paragraphText = this.story.Continue();

        this.tags = this.splitTags(this.story.currentTags);
        //console.log(this.story.currentTags);

        this.checkTags(this.tags);

        this.currentText = {
          type: "text",
          text: paragraphText,
          classes: this.customClasses
        }
  
        this.customClasses = [];
      }

      this.choices = this.story.currentChoices;

      if (!this.story.canContinue && !this.choices.length) {
        this.ending();
      }
  
    },
    select(choice) {
      this.story.ChooseChoiceIndex(choice.index);
      this.save();
      this.choices = [];
      this.continueStory();

    },
    // split tags at ":"
    splitTags(tags) {
      return tags.map(tag => {
        let propertySplitIdx = tag.indexOf(":");
        let obj;
        if (propertySplitIdx !== -1) {
          obj = {
            property: tag.substring(0, propertySplitIdx).trim(),
            val: tag.substring(propertySplitIdx + 1).trim()
          };
        } else {
          obj = {
            property: tag.trim()
          };
        }
        return obj;
      });
    },
    // checks the type of tag
    checkTags(tags) {
      tags.forEach(tag => {
        // css classes
        if (tag.property === "CLASS") {
          this.customClasses.push(tag.val);
        } else if (tag.property === "CLEAR") {
          console.log("Clear")
        } else if (tag.property === "AUDIO_STOP") {
          Howler.stop();
          console.log("stop audio");
        } else if (tag.property === "CONTENT") {
          let content = JSON.parse(tag.val.replace("\\", ""));

          // images
          if (content.type === "image") {
            content.images.forEach(image => {
              image.src = require("@/assets/images/" + image.src);
              this.currentImage = content;
            });
          } 
          // svg 
          else if (content.type === "svg") {
            content.src = require("@/assets/images/" + content.src)
            this.currentImage = content;
          // audio  
          } else if (content.type === "audio") {
            content.src = require("@/assets/audio/" + content.src)
            this.currentAudio = new Howl({
              src: [content.src],
              loop: content.loop,
              volume: content.volume
            });
            this.currentAudio.play();
            this.currentAudio.fade(0.0, this.currentAudio.volume(), content.fade);
          }

        } else if (tag.property === "THEME") { 
          if (tag.val == 'dark') {
            this.dark = true;
          } else if (tag.val == 'light') {
            this.dark = false;
          }
          this.$store.commit('setTheme', this.dark); 
        }
      });
    },
    showText() {
      this.$refs.typedText.showAll();
    },
    toggleMute() {
      this.mute = !this.mute;
      Howler.mute(this.mute);
    },
    restart() {
      this.choices = [];
      this.tags = [];
      this.customClasses = [];
      this.$store.commit('setTheme', this.dark);
      this.story.ResetState();
      this.$store.commit('saveState', this.story.state.ToJson());
      this.finished = false;
      this.continueStory();
    },
    ending() {
      this.result.R = this.story.variablesState.$("R");
      this.result.I = this.story.variablesState.$("I");
      this.result.A = this.story.variablesState.$("A");
      this.result.S = this.story.variablesState.$("S");
      this.result.E = this.story.variablesState.$("E");
      this.result.C = this.story.variablesState.$("C");

      this.result.R = 4
      this.result.I = 2
      this.result.A = 1
      this.result.S = 3
      this.result.E = 2
      this.result.C = 3
      console.log(this.result);
      this.$store.commit('saveResult', this.result);
      this.$router.push('/result')
      this.finished = true;
    },
    save() {
      this.$store.commit('saveState', this.story.state.ToJson());
      //console.log(JSON.parse(this.$store.state.story))
    },
    load() {
      this.choices = [];
      this.tags = [];
      this.customClasses = [];
      this.dark = this.$store.state.isDark;
      this.story.state.LoadJson(this.$store.state.story);
      this.continueStory();
    },
    deviceOrientation(e) {
      //console.log(e.gamma);
      const limit = 45;
      if(counter++ % 10 === 0) {
        let leftToRight = Math.round(e.gamma);
        if (Math.abs(leftToRight) > limit) {
        if (leftToRight > limit) {
              leftToRight = limit;
          } else {
              leftToRight = -limit;
          }
        }
        let frontToBack = Math.round(e.beta);
        if (Math.abs(frontToBack) > limit) {
        if (frontToBack > limit) {
              frontToBack = limit;
          } else {
              frontToBack = -limit;
          }
        }    
        leftToRight = leftToRight * -1;
        frontToBack = frontToBack * -1;
        console.log(leftToRight +", "+ frontToBack)
        let translate = "translate(" + leftToRight + "px," + frontToBack +"px)";
        this.$el.querySelectorAll(".orient").forEach((el) => {
          el.style.transform = translate;
        });
      }
    },
    checkPermission() {
      console.log("checkPermission");
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', (e) => {this.deviceOrientation(e)});
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', (e)=> {this.deviceOrientation(e);});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_animations.scss";

.game {
  display: flex;
  flex-flow: column;
  background-color: $white;
  color: black;
  font-size: 16px;
  height: 100vh;
  overflow: hidden;

  &.dark {
    color:white;
    background-color: black;
  }

}

.result {
  
}

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

  a {
    color: inherit;
    font-weight: 400;
  }

  .audio {
    background-image: url("../assets/images/icons/sound-on-black.png");
    background-size: contain;
    height: 40px;
    width: 30px;
    background-repeat: no-repeat;
    background-position: center;
    transform: rotate(180deg);

    &.audio-dark { 
      background-image: url("../assets/images/icons/sound-on-white.png");

      &.mute {
        background-image: url("../assets/images/icons/sound-off-white.png");
      }
    }

    &.mute {
      background-image: url("../assets/images/icons/sound-off-black.png");

    }

  }


}


.story {
  margin: 0 auto;
  max-width: 768px;
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;

  .image-container {
    flex: 1;
    overflow: auto;
    width: 100%;

    .container {
      position: relative;
      height: 100%;
      overflow: hidden; 

      img {
        object-fit: contain;
        width: 100%;
        max-height: 100%;
        position: absolute;
      }
    }

  }

  .text-container {
    min-height: 150px;
    padding: 6px 12px 0 12px;
    display: flex;
    flex-flow: column;
    width: 100%;

    @media screen and (min-width: $medium) {
      min-height: 200px;
  }

  }


  .choices {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin: 0 0 20px 0;

    .choice {
      margin: 20px 0 20px 0;
      padding: 0 12px;
      color: inherit;
      font-weight: 400;
      max-width: 50%;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: inherit;
      }
    }

  .arrow {
    font-size: 12px;
  }
  }

}
</style>
