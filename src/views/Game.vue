<template>
  <div class="game">
    <div class="navbar">
      <router-link to="/menu">menU</router-link>
    </div> 
    <div class="story" ref="story" v-if="!finished">
      <!-- <template v-for="(item, index) in content"> -->
        <div class="image-container">
          <div v-if="currentImage.type === 'image'" :class="currentImage.container">
            <img
              v-for="(image, index) in currentImage.images"
              :src="image.src"
              :key="'image-'+index"
              :class="image.classes"
            />
          </div>
          <draw-svg v-else-if="currentImage.type === 'svg'" :duration=200 :class = currentImage.container :vivusId ="'vivus'+index" :file= currentImage.src type="delayed" :ref="'vivus'+index"></draw-svg>
        </div>  
        <div class="text-container">
          <typed-text :typeSpeed="50" :text="currentText.text" :class="currentText.classes" @onComplete="continueStory()"></typed-text>
          <div class="choices">
            <a
              class="choice"
              v-on:click.prevent="select(choice)"
              v-for="(choice, index) in choices"
              :key="'choice-'+index"
            >&#x25BA; {{choice.text}}</a>
          </div>
        </div>
      <!-- </template> -->
    </div>
    <div class="result" v-if="finished"> 
      <p v-for="(category, index) in result" :key="'category' + index" >
        {{category}}
      </p>
    </div>
  </div>
</template>

<script>
let counter = 0
import { Story } from "inkjs";
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
      content: [],
      finished: false,
      result: {},
    };
  },
  mounted () {
    this.story = new Story(json);
    if (this.$store.state.story !== null) {
      this.load();
    } else {
      this.restart();
    }
    this.checkPermission();

  },
  updated() {
    // whenever data changes and the component re-renders, this is called.
    this.$nextTick(() => this.scrollToEnd());
  },
  methods: {
    // main gameplay loop
    continueStory() {
      // Generate story text - loop through available content
      if (this.story.canContinue) {
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
        if (tag.property === "CLASS") {
          this.customClasses.push(tag.val);
        } else if (tag.property === "CLEAR") {
          console.log("Clear")
          this.content = [];
        } else if (tag.property === "CONTENT") {
          let content = JSON.parse(tag.val.replace("\\", ""));

          // require images
          if (content.type === "image") {
            content.images.forEach(image => {
              image.src = require("@/assets/images/" + image.src);
            });
          } 
          else if (content.type === "svg") {
            content.src = require("@/assets/images/" + content.src)
          }

          //console.log(content);
          this.currentImage = content;

        }
      });
    },
    restart() {
      this.choices = [];
      this.tags = [];
      this.customClasses = [];
      this.content = [];
      this.story.ResetState();
      this.$store.commit('saveState', this.story.state.ToJson());
      this.continueStory();
    },
    ending() {
      this.result.R = this.story.variablesState.$("R");
      this.result.I = this.story.variablesState.$("I");
      this.result.A = this.story.variablesState.$("A");
      this.result.S = this.story.variablesState.$("S");
      this.result.E = this.story.variablesState.$("E");
      this.result.C = this.story.variablesState.$("C");
      console.log(this.result);
      this.finished = true;
      this.content = [];
    },
    save() {
      this.$store.commit('saveState', this.story.state.ToJson());
      //console.log(JSON.parse(this.$store.state.story))
    },
    load() {
      this.choices = [];
      this.tags = [];
      this.customClasses = [];
      this.content = [];
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
  font-size: 12px;
  height: 100vh;
  overflow: hidden;

}

.result {
  
}

.navbar {
  display: flex;
  height: 40px;
  justify-content: left;
  align-items: center;
  padding-left: 12px;
  z-index: 99;
  background-color: white;
  flex-shrink: 0;

  a {
    color: black;
    font-weight: 400;
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

    img {
      object-fit: contain;
      width: 100%;
      max-height: 100%;
    }

  }

  .text-container {
    height: 120px;
    padding: 4px 12px 0 12px;
    display: flex;
    flex-flow: column;
    width: 100%;
  }


  .choices {
    display: flex;
    justify-content: space-evenly; 

    .choice {
      margin: 24px 0 24px 0;
      padding: 0 12px;
      color: black;
      font-weight: 400;
      //font-size: 18px;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: black;
      }
    }
  }


}
</style>
