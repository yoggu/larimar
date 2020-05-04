<template>
  <div class="game">
    <div class="menu">
      <router-link to="/menu">Menu</router-link>
    </div>
    <div class="story" ref="story">
      <template v-for="(item, index) in content">
        <vue-typed-js v-if="item.type === 'text'" :typeSpeed="10" :key="'paragraph-'+index" :strings="[item.text]" :showCursor='false' :loop='false' @onComplete="continueStory()"><p :class="'typing ' +item.classes"></p></vue-typed-js>
        <div v-else-if="item.type === 'image'" :class="item.container" :key="'images-'+index">
          <img
            v-for="(image, index) in item.images"
            :src="image.src"
            :key="'image-'+index"
            :class="image.classes"
          />
        </div>
        <draw-svg v-else-if="item.type === 'svg'" :duration=400 :class = item.container :key="'svg'+index" :vivusId ="'vivus'+index" :file= item.src type="oneByOne" :ref="'vivus'+index"></draw-svg>
      </template>
      <div class="choices">
        <a
          class="choice"
          v-on:click.prevent="select(choice)"
          v-for="(choice, index) in choices"
          :key="'choice-'+index"
        >{{choice.text}}</a>
      </div>
    </div>
    <div class="result" v-if="finished"> 
      <p v-for="(category, index) in result" :key="'category' + index" >
        {{category}}
      </p>
    </div>
  </div>
</template>

<script>
import { Story } from "inkjs";
import json from "../assets/story/story.json";
import DrawSvg from "../components/DrawSvg";

export default {
  name: "Game",
  components: {
    DrawSvg
  },
  data: function() {
    return {
      story: null,
      choices: [],
      tags: [],
      customClasses: [],
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
        console.log(this.content);
        let paragraphText = this.story.Continue();

        this.tags = this.splitTags(this.story.currentTags);
        //console.log(this.story.currentTags);
        this.checkTags(this.tags);

        this.content.push({
          type: "text",
          text: paragraphText,
          classes: this.customClasses
        });
        console.log(this.content);
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

          this.content.push(content);
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
    scrollToEnd() {
    // scroll to the start of the last message
    console.log(this.$refs.story.lastElementChild.offsetTop)
    window.scrollTo({
      top: this.$refs.story.lastElementChild.offsetTop + 40,
      left: 0,
      behavior: 'smooth'
      })
    }
  }
};
</script>

<style lang="scss" scoped>

.game {
  display: grid;
  grid-template-rows: 50px 1fr ;
  grid-template-columns: 1fr;
  max-width: 800px;
  margin: 0 auto;
}

.menu {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 12px;
}

.story {
  margin: 0 10px;
  grid-column: 1;
  grid-row: 2;
  padding-bottom: 40px;

  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }

  .choices {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .choice {
      margin: 12px 0;
      color: $color-choice;
      font-weight: 700;
      font-size: 18px;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: white;
      }
    }
  }

  .fire {
    position: relative;
  }

  .flame1 {
    position: absolute;
    animation: flame ease-in-out 2s infinite alternate;
  }

  .flame2 {
    position: absolute;
    animation: flame ease-in-out 2s infinite alternate-reverse;
  }

  .flame3 {
    position: absolute;
    animation: flame ease-in-out 2s infinite alternate-reverse;
  }

  @keyframes flame {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .jump {
    position: relative;
  }

  .frog {
    z-index: 1;
    position: absolute;
  }

  .frog-jump {
    animation: jump 2s forwards;
  }

  @keyframes jump {
    0% {
      left: 0px;
      top: 0px;
    }
    100% {
      left: -60px;
      top: -120px;
    }
  }

  .right {
    margin-left: 50%;
  }


}
</style>
