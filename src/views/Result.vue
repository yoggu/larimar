<template>
  <div class="result">
    <div class="navbar">
      <router-link class="back" to="/menu"></router-link>
    </div>
    <div class="content"> 
      <h1>Mein Ergebnis</h1>
      <radar-chart class="chart" :chartData="data" :options="options"></radar-chart>
      <h2>Mein Code</h2>
      <div class="code">
        <span v-for="(letter, index) in code" :key="index">{{letter}}</span>
      </div>
      <h2>Kategorien</h2>
      <div class="categories">
        <category v-for="(category, index) in categories" :key="index" :type="category.type" :title="category.title" :description="category.description" :index="index"></category>
      </div>
      <h2>Meine Antworten</h2>
      <ol>
        <li v-for="(question, index) in questions" :key="index">
          <div>{{question.question}}</div>
          <div :class="{'selected': getAnswer(index) == 0}">{{question.answer1.text}}</div>
          <div :class="{'selected': getAnswer(index) == 1}">{{question.answer2.text}}</div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import RadarChart from "../components/RadarChart";
import Category from "../components/Category";
import question_json from "../assets/questions.json";

export default {
  name: 'Result',
  components: {
    RadarChart,
    Category
  },
  data: function() {
    return {
      code: null,
      categories:[
        {
          type: "realistic",
          title: "Macher/in (R)",
          description: "Personen dieses Typs arbeiten gerne mit den Händen und mit Gegenständen, sie interessieren sich für Werkzeuge und Maschinen. Sie sind gerne im Freien und betätigen sich körperlich. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: naturverbunden, bodenständig, praktisch, gesundes Selbstvertrauen und eher konservativ."
        },
        {
          type: "investigative",
          title: "Tüftler/in (I)",
          description: "Personen dieses Typs vertiefen sich gerne in geistige oder naturwissenschaftliche Probleme. Sie analysieren, untersuchen, lernen, lesen, schreiben und rechnen gerne. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: neugierig, erfinderisch, intellektuell, kritisch, genau, logisch, rational und leistungsorientiert."
        },
        {
          type: "artistic",
          title: "Gestalter/in (A)",
          description: "Personen dieses Typs drücken sich gerne kreativ oder sprachlich aus. Sie beschäftigen sich gerne mit ausgefallenen Ideen, speziellen Materialien, Musik oder Kultur. Ästhetik ist ihnen wichtig. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: fantasievoll, schöpferisch, ausdrucksstark, intuitiv, offen, sensibel, unkonventionell, eigensinnig und idealistisch."
        },
        {
          type: "social",
          title: "Helfer/in (S)",
          description: "Personen dieses Typs kümmern sich gerne hilfreich um andere Menschen. Sie erziehen, lehren, beraten, pflegen, heilen und sorgen für körperliches, geistiges oder seelisches Wohlbefinden. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: freundlich, hilfsbereit, warmherzig, mitfühlend, verständnisvoll, kontaktfreudig, idealistisch und teilweise belehrend."
        },
        {
          type: "enterprising",
          title: "Unternehmer/in (E)",
          description: "Personen dieses Typs motivieren, überzeugen und führen gerne, sie leiten und organisieren. Sie kümmern sich um wirtschaftliche Planung und finanzielle Ziele. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: selbstbewusst, motiviert, mitreißend, erfolgsorientiert, ehrgeizig, dominant, verantwortungsbereit und gesellig."
        },
        {
          type: "conventional",
          title: "Organistor/in (C)",
          description: "Personen dieses Typs arbeiten gerne ordentlich, genau und gut organisiert in einem Büro. Sie bearbeiten, kontrollieren und übermitteln Zahlen oder Texte. Klare Regeln sind ihnen wichtig. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: sorgfältig, genau, detailorientiert, ausdauernd, ordentlich, praktisch, angepasst, gewissenhaft."
        }
      ],
      questions: {},
      answers: {},
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scale: {
          scaleLabel: {
            fontColor:'rgba(255, 255, 255, 1)',
          },
          gridLines: {
            color: 'rgba(255, 255, 255, 1)',
          },
          angleLines: {
            color: 'rgba(255, 255, 255, 1)'
          },
          pointLabels: {
            fontColor:'rgba(255, 255, 255, 1)',
            fontFamily: "'IM Fell Double Pica', serif",
            fontSize: 16,
          },
          ticks: {
            max: 5,
            min: 0,
            stepSize: 1,
            display: false,
          }
        }
      }
    }
  },
  mounted() {
    this.getCode();
    this.questions = question_json;
    this.answers = this.$store.state.answers;
  },
  computed: {
      data() {
        return  {
        labels: ['Macher/in', 'Tüftler/in', 'Gestalter/in', 'Helfer/in', 'Unternehmer/in', 'Organistor/in'],
        datasets: [{
          label: "Ergebnis",
          backgroundColor: 'rgba(92, 217, 255, 0.2)',
          borderColor: "rgba(92, 217, 255, 1)",
          data: [this.$store.state.result.R, this.$store.state.result.I, this.$store.state.result.A, this.$store.state.result.S, this.$store.state.result.E, this.$store.state.result.C],
        }]
        }
      }
  },
  methods: {
    getCode() {
      let result = this.$store.state.result;
      let sorted = Object.keys(result).sort(function(a,b){return result[b]-result[a]});
      this.code = Object.values(sorted.slice(0, 3));
    },
    getAnswer(index) {
      console.log(this.answers[index])
      return this.answers[index];
    }
  }
}
</script>

<style lang="scss" scoped>

.result {

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

  .back {
    background-image: url("../assets/images/icons/arrow-down.png");
    background-size: contain;
    height: 40px;
    width: 20px;
    background-repeat: no-repeat;
    background-position: center;
    transform: rotate(90deg);
  }

}

.content{
  padding: 0 12px;
  max-width: 768px;
  margin: 0 auto;
  
  h1 {
  color:white;
  }


  .selected {
    color: lightblue
  }

}

}


</style>