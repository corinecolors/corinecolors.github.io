<template>
  <div class="aboutplatform" :style="`background-image: url(${$puzzle.main_bg_bordered.url})`">
      <div class="aboutplatformpage">
          <h1>About this Platform</h1>
          <h2 v-html="$cms.htmlField($aboutplatform.text)"/>
          </div>
  </div>
</template>

<script>
export default {
  name: "AboutPlatformPage",
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
.aboutplatform {
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: scroll;
    padding: 0 30px;
}
.aboutplatformpage {
    max-width: 700px;
    margin: auto;
    color: white;
    padding-top: 100px;
    text-align: center;
}
</style>
