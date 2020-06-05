<template>
  <div class="game" :class="{dark: dark}">
    <div class="navbar">
      <router-link class="menu" :class="{'menu-dark': dark}" to="/menu"></router-link>
      <a v-on:click.prevent="toggleMute()" class="audio" :class="{'audio-dark': dark, 'mute': mute}">
      </a>
    </div> 
    <div class="story" ref="story">
        <div class="image-container" v-on:click="showText()">
          <div :class="currentImage.container" class="container">
            <transition-group name="fade">
            <img
              v-for="(image, index) in currentImage.images"
              :src="image.src"
              :key="'image-'+index+image.src"
              :class="image.classes"
            />
            </transition-group>
          </div>
        </div>  
        <div class="text-container">
          <typed-text ref="typedText" :dark="dark" :typeSpeed="20" :text="currentText.text" :class="currentText.classes" @next="continueStory()" @onComplete="showChoice = true"></typed-text>
          <div class="choices" v-show="showChoice">
            <a
              class="choice" :class="{'arrow-dark': dark}"
              v-on:click.prevent="select(choice)"
              v-for="(choice, index) in choices"
              :key="'choice-'+index"
            >{{choice.text}}</a>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Story } from "inkjs";
import {Howl, Howler} from 'howler';
import json from "../ink/export/story.json";
import TypedText from "../components/TypedText";

export default {
  name: "Game",
  components: {
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
      showChoice: false,
      dark: false,
      mute: false,
      audio: {},
    };
  },
  mounted () {
    this.story = new Story(json);
    if (this.$store.state.story !== null) {
      this.load();
    } else {
      this.restart();
    }

  },
  destroyed() {
    Howler.stop();
  }, 
  methods: {
    // main gameplay loop
    continueStory() {
      if (this.story.canContinue) {
        this.showChoice = false;
        let paragraphText = this.story.Continue();

        this.tags = this.splitTags(this.story.currentTags);

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
        } else if (tag.property === "AUDIO_STOP") {
          Howler.stop();
        } else if (tag.property === "CONTENT") {
          let content = JSON.parse(tag.val.replace("\\", ""));
          // images
          if (content.type === "image") {
            content.images.forEach(image => {
              image.src = require("@/assets/images/" + image.src);
              this.currentImage = content;
            });
          // audio  
          } else if (content.type === "audio") {
            content.src = require("@/assets/audio/" + content.src)
            this.audio = content;
            this.playAudio(this.audio);
          }
        // set dark or light theme
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
    playAudio(audio) {
      this.currentAudio = new Howl({
        src: [audio.src],
        loop: audio.loop,
        volume: audio.volume
      });
      this.currentAudio.play();
      this.currentAudio.fade(0.0, this.currentAudio.volume(), audio.fade);
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
      this.continueStory();
    },
    ending() {
      let result = {};
      result.R = this.story.variablesState.$("R");
      result.I = this.story.variablesState.$("I");
      result.A = this.story.variablesState.$("A");
      result.S = this.story.variablesState.$("S");
      result.E = this.story.variablesState.$("E");
      result.C = this.story.variablesState.$("C");

      let answers = {
        q1: this.story.variablesState.$("q1"),
        q2: this.story.variablesState.$("q2"),
        q3: this.story.variablesState.$("q3"),
        q4: this.story.variablesState.$("q4"),
        q5: this.story.variablesState.$("q5"),
        q6: this.story.variablesState.$("q6"),
        q7: this.story.variablesState.$("q7"),
        q8: this.story.variablesState.$("q8"),
        q9: this.story.variablesState.$("q9"),
        q10: this.story.variablesState.$("q10"),
        q11: this.story.variablesState.$("q11"),
        q12: this.story.variablesState.$("q12"),
        q13: this.story.variablesState.$("q13"),
        q14: this.story.variablesState.$("q14"),
        q15: this.story.variablesState.$("q15")
      }
      this.$store.commit('saveResult', result);
      this.$store.commit('setAnswers', answers)
      this.$store.commit('setFinished', true)
      this.$router.push('/result')

    },
    save() {
      this.$store.commit('saveState', this.story.state.ToJson());
      this.$store.commit('setImage', this.currentImage);
      this.$store.commit('setAudio', this.audio);
    },
    load() {
      this.choices = [];
      this.tags = [];
      this.customClasses = [];
      this.dark = this.$store.state.isDark;
      this.story.state.LoadJson(this.$store.state.story);
      this.currentImage = this.$store.state.image;
      this.playAudio(this.$store.state.audio);
      this.continueStory();
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_animations.scss";

.game {
  display: flex;
  flex-flow: column;
  background-color: white;
  color: black;
  font-size: 14px;
  height: 100vh;
  overflow: hidden;

  @media screen and (min-width: $medium) {
      font-size: 16px;
    }

  &.dark {
    color:white;
    background-color: black;
  }

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

  .menu {
    background-image: url("../assets/images/icons/menu-black.png");
    background-size: contain;
    height: 30px;
    width: 20px;
    background-repeat: no-repeat;
    background-position: center;

    &.menu-dark { 
      background-image: url("../assets/images/icons/menu-white.png");
    } 
  }

  .audio {
    background-image: url("../assets/images/icons/sound-on-black.png");
    background-size: contain;
    height: 30px;
    width: 20px;
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
    padding: 12px 30px 0 30px;
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
      padding: 0 12px 0 20px;
      color: inherit;
      font-weight: 400;
      max-width: 50%;
      text-decoration: none;
      cursor: pointer;
      position: relative;

      &:hover {
        color: inherit;
      }

      &:before {
        content: '';
        background-image: url("../assets/images/icons/continue.png");
        background-size: contain;
        height: 10px;
        width: 15px;
        background-repeat: no-repeat;
        background-position: center;
        transform: rotate(-90deg);
        left: 0;
        top: 2px;
        position: absolute;

        @media screen and (min-width: $medium) {
          height: 12px;
          width: 15px;
        }
      }

      &.arrow-dark {
        &:before {
          background-image: url("../assets/images/icons/continue-white.png");
        }
      }  
    }
  }
}
</style>
