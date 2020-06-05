<template>
  <div :class="{open: open}" class="answers">
    <h2 class="title" v-on:click="toggleOpen()">Meine Antworten</h2>
    <div class="items">
      <div class="item" v-for="(question, index) in questions" :key="index">
        <div class="question">{{question.question}}</div>
        <div class="answer" :class="{'selected': getAnswer(index) == 0}">{{question.answer1.text}} <span>{{question.answer1.category}}</span></div>
        <div class="answer" :class="{'selected': getAnswer(index) == 1}">{{question.answer2.text}} <span>{{question.answer2.category}}</span></div>
      </div>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'Answers',
  props: ['questions','answers'],
  data: function() {
    return{
      open: false
    }
  },
  mounted () {

  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    getAnswer(index) {
      return this.answers[index];
    }
  }
}

</script>

<style scoped lang="scss">

.answers {
  margin: 60px 0 0 0;
  padding: 0 20px;

  .title {
    position:relative;
    cursor: default;
    margin-bottom: 0;
    width: 250px;
    margin: 0 auto;

    &:after {
      position: absolute;
      right: 0;
      top:0;
      content: '';
      background-image: url("../assets/images/icons/arrow-down.png");
      background-repeat: no-repeat;
      background-size:contain;
      background-position: center;
      width: 20px;
      height: 100%;
      transform: rotate(-90deg);
      transition: all 0.3s ease;
    }
  }

  .items {
    max-height: 0;
    opacity: 0;
    transition: all 0.3s ease;
    overflow: hidden;

    .item {
      margin: 40px auto;
      max-width: $small;
      text-align: left;
    }

    .question {
      font-size: 18px;
    }

    .answer {
      color: grey;
      position: relative;
      padding-left: 25px;
      margin: 10px 0;

      span {
        margin-left: 15px;
        color: $l-medium;
      }

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top:0;
        background-image: url("../assets/images/icons/arrow-down.png");
        background-repeat: no-repeat;
        background-size:contain;
        background-position: center;
        width: 15px;
        height: 100%;
        transform: rotate(-90deg);
      }
    }

    .selected {
      color: white;

      &:before {
        background-image: url("../assets/images/icons/arrow-filled.png");
      }
    }


  }

  &.open {

    .items {
        opacity: 1;
        max-height: 5000px;
    }

    .title {

      &:after {
        transform: rotate(0);
      }
    }

  }
}
</style>
