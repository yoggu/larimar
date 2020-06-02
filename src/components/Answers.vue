<template>
  <div :class="[open ? 'open' : '', type]" class="answers">
    <h2 class="title" v-on:click="toggleOpen()">Meine Antworten</h2>
    <ol class="list">
      <li v-for="(question, index) in questions" :key="index">
        <div class="question">{{question.question}}</div>
        <div class="answer" :class="{'selected': getAnswer(index) == 0}"><span>{{question.answer1.category}}: </span>{{question.answer1.text}}</div>
        <div class="answer" :class="{'selected': getAnswer(index) == 1}"><span>{{question.answer2.category}}: </span>{{question.answer2.text}}</div>
      </li>
    </ol>
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
      console.log(this.answers[index])
      return this.answers[index];
    }
  }
}

</script>

<style scoped lang="scss">

.answers {

  .title {
    padding: 12px 0;
    position:relative;

    h2 {
      margin: 0;
    }

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
      transform: rotate(180deg);
      transition: all 0.3s ease;
    }
  }

  .list {
    max-height: 0;
    opacity: 0;
    transition: all 0.3s ease;
    overflow: hidden;
  }

  &.open {

    .list {
        opacity: 1;
        max-height: 5000px;
    }

    .title {

      &:after {
        transform: rotate(0);
      }
    }

  }

  .selected {
    color: lightblue
  }
}
</style>
