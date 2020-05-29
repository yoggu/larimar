<template>
  <div class="result">
    <h1>Dein Ergebnis</h1>
    <radar-chart :chartData="data" :options="options"></radar-chart>
    <div class="code">
      <span v-for="(category, index) in code" :key="index">{{category}}</span>
    </div>
    <div class="categories">
      <div class="realistic">
        <h2>Realistisch</h2>
        <p>Personen dieses Typs arbeiten gerne mit den Händen und mit Gegenständen, sie interessieren sich für Werkzeuge und Maschinen. Sie sind gerne im Freien und betätigen sich körperlich. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: naturverbunden, bodenständig, praktisch, gesundes Selbstvertrauen und eher konservativ.</p>
      </div>
      <div class="investigative">
        <h2>Intellektuell</h2>
        <p>Personen dieses Typs vertiefen sich gerne in geistige oder naturwissenschaftliche Probleme. Sie analysieren, untersuchen, lernen, lesen, schreiben und rechnen gerne. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: neugierig, erfinderisch, intellektuell, kritisch, genau, logisch, rational und leistungsorientiert.</p>
      </div>
      <div class="artistic">
        <h2>Künstlerisch</h2>
        <p>Personen dieses Typs drücken sich gerne kreativ oder sprachlich aus. Sie beschäftigen sich gerne mit ausgefallenen Ideen, speziellen Materialien, Musik oder Kultur. Ästhetik ist ihnen wichtig. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: fantasievoll, schöpferisch, ausdrucksstark, intuitiv, offen, sensibel, unkonventionell, eigensinnig und idealistisch.</p>
      </div>
      <div class="social">
        <h2>Sozial</h2>
        <p>Personen dieses Typs kümmern sich gerne hilfreich um andere Menschen. Sie erziehen, lehren, beraten, pflegen, heilen und sorgen für körperliches, geistiges oder seelisches Wohlbefinden. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: freundlich, hilfsbereit, warmherzig, mitfühlend, verständnisvoll, kontaktfreudig, idealistisch und teilweise belehrend.</p>
      </div>
      <div class="enterprising">
        <h2>Unternehmerisch</h2>
        <p>Personen dieses Typs motivieren, überzeugen und führen gerne, sie leiten und organisieren. Sie kümmern sich um wirtschaftliche Planung und finanzielle Ziele. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: selbstbewusst, motiviert, mitreißend, erfolgsorientiert, ehrgeizig, dominant, verantwortungsbereit und gesellig.</p>
      </div>
      <div class="conventional">
        <h2>Konventionell</h2>
        <p>Personen dieses Typs arbeiten gerne ordentlich, genau und gut organisiert in einem Büro. Sie bearbeiten, kontrollieren und übermitteln Zahlen oder Texte. Klare Regeln sind ihnen wichtig. Im typischen Fall zeichnen sie sich durch folgende Eigenschaften aus: sorgfältig, genau, detailorientiert, ausdauernd, ordentlich, praktisch, angepasst, gewissenhaft.</p>
      </div>
    </div>

  </div>
</template>

<script>
import RadarChart from "../components/RadarChart";

export default {
  name: 'Result',
  components: {
    RadarChart
  },
  data: function() {
    return {
      code: null,
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
          },
          ticks: {
            beginAtZero: true,
            display: false,
            precision: 0
        }
      }
      }
    }
  },
  mounted() {
    this.getCode();
  },
  computed: {
      data() {
        return  {
        labels: ['Realistisch', 'Intellektuell', 'Künstlerisch', 'Sozial', 'Unternehmerisch', 'Konventionell'],
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
      console.log(sorted)
      this.code = Object.values(sorted.slice(0, 3));
      console.log(this.code)
    }
  }
}
</script>

<style lang="scss" scoped>

.result {
  padding: 0 12px;
  h1 {
  color:white;
}
}


</style>