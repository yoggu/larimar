<template>
  <div class="result">
    <radar-chart :chartData="data" :options="options"></radar-chart>

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
      options: {
        responsive: true,
        scale: {
        angleLines: {
            display: false
        },
        gridLines: {
          color: 'rgba(255, 255, 255, 1)',
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
  },
  computed: {
      data() {
        return  {
        labels: ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'],
        datasets: [{
          label: "Dein Profil",
          data: [this.$store.state.result.R, this.$store.state.result.I, this.$store.state.result.A, this.$store.state.result.S, this.$store.state.result.E, this.$store.state.result.C],
          backgroundColor: 'rgba(92, 217, 255, 0.9)',
        }]
        }
      }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>