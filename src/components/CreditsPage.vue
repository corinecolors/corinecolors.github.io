<template>
  <div class="credits" :style="`background-image: url(${$puzzle.main_bg_bordered.url})`">
      <div class="creditspage">
          <h1>CREDITS</h1>
          <h2 v-html="$cms.htmlField($credits.credits)"/>
          </div>
  </div>
</template>

<script>
export default {
  name: "CreditsPage",
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bg {
  width: 100vw;
  height: 100vh;
  z-index: -1;
  
}
.credits {
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: scroll;
    padding: 0 30px;
}
.creditspage {
    max-width: 700px;
    margin: auto;
    color: white;
    padding-top: 100px;
    text-align: center;
    &::v-deep h5 {
      margin-bottom: 10px;
    }
}
</style>
