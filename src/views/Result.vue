<template>
  <div class="result">
    <div v-show="info" class="infobox">
        <div class="close">
          <a class="close-button" v-on:click.prevent="toggleInfo"></a>
        </div>
        <div class="faq">
          <h1>Und jetzt?</h1>
          <div class="text">
            <p class="q">Dein Code ergibt dir nicht die gewünschten Berufe an?</p>
            <p class="a">Die drei Buchstaben lassen sich in der Reihenfolge vertauschen, vielleicht findest du in einer anderen Kombination etwas?</p>
            <p class="q">Das hilft auch nicht weiter?</p>
            <p class="a">Das Ergebnis bleibt abgespeichert, du kannst es zu einem Termin bei der Berufsberatung mitnehmen.</p>
          </div>
          <p class="bottom">"Immerhin weisst du jetzt was du nicht willst Hihihiii"</p>
        </div> 
    </div>
    <div class="navbar">
      <router-link class="menu" to="/menu"></router-link>
      <a class="info-button" v-on:click.prevent="toggleInfo"></a>
    </div>
    <div class="content"> 
      <h1>Mein Ergebnis</h1>
      <p class="subtitle big">Die getroffenen Entscheidungen wurden ausgewertet...</p>
      <radar-chart class="chart" :chartData="data" :options="options"></radar-chart>
      <p class="big">...und daraus ergibt sich ein Code</p>    
      <div class="code"><span v-for="(letter, index) in code" :key="index">{{letter}}</span></div>
      <p class="big">Code entziffern mit der <a class="external-link" target="_blank" href="https://www.lmrl.lu/wp/wp-content/uploads/2015/01/Explorix-par-code.pdf">Berufsliste</a></p>
      <div class="categories">
        <h2>Kategorien</h2>
        <p class="subtitle">Erfahre mehr über die einzelnen Kategorien</p>
        <category v-for="(category, index) in categories" :key="index" :category="category" :index="index"></category>
      </div>
      <answers :questions="questions" :answers="answers"></answers>
    </div>
  </div>
</template>

<script>
import RadarChart from "../components/RadarChart";
import Category from "../components/Category";
import Answers from "../components/Answers";
import question_json from "../assets/questions.json";

export default {
  name: 'Result',
  components: {
    RadarChart,
    Category,
    Answers
  },
  data: function() {
    return {
      code: null,
      info: false,
      categories:[
        {
          type: "realistic",
          letter: "R",
          title: "Macher/in",
          description: "Personen dieses Typs arbeiten gerne mit den Händen und mit Gegenständen, sie interessieren sich für Werkzeuge und Maschinen. Sie sind gerne im Freien und betätigen sich körperlich. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: naturverbunden, bodenständig, praktisch, gesundes Selbstvertrauen und eher konservativ."
        },
        {
          type: "investigative",
          letter: "I",
          title: "Tüftler/in",
          description: "Personen dieses Typs vertiefen sich gerne in geistige oder naturwissenschaftliche Probleme. Sie analysieren, untersuchen, lernen, lesen, schreiben und rechnen gerne. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: neugierig, erfinderisch, intellektuell, kritisch, genau, logisch, rational und leistungsorientiert."
        },
        {
          type: "artistic",
          letter: "A",
          title: "Gestalter/in",
          description: "Personen dieses Typs drücken sich gerne kreativ oder sprachlich aus. Sie beschäftigen sich gerne mit ausgefallenen Ideen, speziellen Materialien, Musik oder Kultur. Ästhetik ist ihnen wichtig. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: fantasievoll, schöpferisch, ausdrucksstark, intuitiv, offen, sensibel, unkonventionell, eigensinnig und idealistisch."
        },
        {
          type: "social",
          letter: "S",
          title: "Helfer/in",
          description: "Personen dieses Typs kümmern sich gerne hilfreich um andere Menschen. Sie erziehen, lehren, beraten, pflegen, heilen und sorgen für körperliches, geistiges oder seelisches Wohlbefinden. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: freundlich, hilfsbereit, warmherzig, mitfühlend, verständnisvoll, kontaktfreudig, idealistisch und teilweise belehrend."
        },
        {
          type: "enterprising",
          letter: "E",
          title: "Unternehmer/in",
          description: "Personen dieses Typs motivieren, überzeugen und führen gerne, sie leiten und organisieren. Sie kümmern sich um wirtschaftliche Planung und finanzielle Ziele. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: selbstbewusst, motiviert, mitreißend, erfolgsorientiert, ehrgeizig, dominant, verantwortungsbereit und gesellig."
        },
        {
          type: "conventional",
          letter: "C",
          title: "Organisator/in",
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
            fontSize: 14,
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
    toggleInfo() {
      this.info = !this.info;
      document.body.classList.toggle("stop-scrolling");
    }
  }
}
</script>

<style lang="scss" scoped>

.result {

  .infobox {
    position: fixed;
    z-index: 1;
    height: 100vh;
    width: 100%;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;

    .close {
      display: flex;
      height: 40px;
      justify-content: flex-end;
      align-items: center;
      margin: 0 auto;
      padding: 0 12px;
      z-index: 99;
      flex-shrink: 0;
      max-width: 1024px;
      width: 100%;

      .close-button {
        background-image: url("../assets/images/icons/x-black.png");
        background-size: contain;
        height: 30px;
        width: 20px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }


    .faq {
      max-width: 768px;
      margin: 0 auto;
      background-image: url("../assets/images/info/alexa.gif"),url("../assets/images/info/background.png");
      background-size: contain;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;

      .text {
        max-width: 400px;
        padding: 0 30px;
        flex-grow: 1;

        .q {
          margin-top: 40px;
        }

        .a {
          padding-left: 16px;
        }
      }

      .bottom {
        margin: 40px 0;
        font-size: 14px;
      }

      h1 {
        text-align: center;
        margin: 0;
      }
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
    background-image: url("../assets/images/icons/menu-white.png");
    background-size: contain;
    height: 30px;
    width: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }

  .info-button {
    background-image: url("../assets/images/icons/info-white.png");
    background-size: contain;
    height: 30px;
    width: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }

}

  .content{
    padding: 0 12px;
    max-width: 768px;
    margin: 0 auto;
    text-align: center;

    .subtitle {
      margin: 10px 0;
    }

    .big {
      font-size: 18px;
    }
    
    h1 {
      color:white;
      margin-bottom: 0;
    }

    .chart {
      max-width: $small;
      margin: 0 auto;
    } 

    .external-link {
      position: relative;
      padding-left: 20px;
      margin-left: 10px;

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

    .code {
      color: black;
      background-image: url("../assets/images/icons/background-blue.png");
      background-size: contain;
      height: 150px;
      width: 100%;
      background-repeat: no-repeat;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        padding: 0 20px;
      }
    }

    .categories {
      margin-top: 60px;
      padding: 0 20px;

      h2 {
        margin-bottom: 0;
      }
    }
  }

}


</style>