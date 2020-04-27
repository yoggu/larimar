<template>
  <div class="game">
    <div class="menu">
      <router-link to="/">Menu</router-link>
    </div>
    <div id="story">
      <transition-group name="list">
      <template v-for="(item, index) in content">
        <p v-if="item.type === 'text'" :class="item.classes" :key="'paragraph-'+index">{{item.text}}</p>
        <div v-else-if="item.type === 'image'" :class="item.container" :key="'images-'+index">
          <img
            v-for="(image, index) in item.images"
            :src="image.src"
            :key="'image-'+index"
            :class="image.classes"
          />
        </div>
      </template>
      </transition-group>
      <div class="choices">
        <a
          class="choice"
          v-on:click.prevent="select(choice)"
          v-for="(choice, index) in choices"
          :key="'choice-'+index"
        >{{choice.text}}</a>
      </div>
      <!-- <button v-on:click="restart">Restart</button>
      <button v-on:click="save">Save</button>
      <button v-on:click="load">Load</button> -->
    </div>
  </div>
</template>

<script>
import { Story } from "inkjs";
import json from "../assets/story/story.json";

export default {
  name: "Game",
  components: {},
  data: function() {
    return {
      story: null,
      choices: [],
      tags: [],
      customClasses: [],
      content: []
    };
  },
  mounted: function() {
    this.story = new Story(json);
    if (this.$store.state.story !== null) {
      this.load();
    } else {
      this.restart();
    }

  },
  methods: {
    // main gameplay loop
    continueStory: function() {
      // Generate story text - loop through available content
      while (this.story.canContinue) {
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
    select: function(choice) {
      this.story.ChooseChoiceIndex(choice.index);
      this.save();
      this.choices = [];
      this.continueStory();

    },
    // split tags at ":"
    splitTags: function(tags) {
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
    checkTags: function(tags) {
      tags.forEach(tag => {
        if (tag.property === "CLASS") {
          this.customClasses.push(tag.val);
        } else if (tag.property === "CLEAR") {
          this.content = [];
        } else if (tag.property === "CONTENT") {
          let content = JSON.parse(tag.val.replace("\\", ""));

          // require images
          if (content.type === "image") {
            content.images.forEach(image => {
              image.src = require("@/assets/images/" + image.src);
            });
          }
          this.content.push(content);
        }
      });
    },
    restart: function() {
      this.choices = [];
      this.tags = [];
      this.customClasses = [];
      this.content = [];
      this.story.ResetState();
      this.$store.commit('saveState', this.story.state.ToJson());
      this.continueStory();
    },
    ending: function() {
      console.log("end");
    },
    save: function() {
      this.$store.commit('saveState', this.story.state.ToJson());
      //console.log(JSON.parse(this.$store.state.story))
    },
    load: function() {
      this.choices = [];
      this.tags = [];
      this.customClasses = [];
      this.content = [];
      this.story.state.LoadJson(this.$store.state.story);
      console.log(JSON.parse(this.$store.state.story))
      console.log(this.content);
      this.continueStory();
    }
  }
};
</script>

<style lang="scss" scoped>
#story {
  width: 600px;
  margin: 0 auto;

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

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  //transform: translateY(30px);
}
}
</style>
