<template>
  <div class="prepuzzlescreen">
      <div class="message">
          <div class="x" @mousedown="close">X</div>
          <p v-html="$cms.htmlField($puzzle.prepuzzletext)"></p>
      </div>
      <div class="exit" @mousedown="close" ref="exit"/>
  </div>
</template>

<script>
export default {
  name: "PrePuzzleTemplate",
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {
      close() {
        this.$emit("exit", true);
      }
  },
  mounted() {
    console.log(this.$puzzle);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../main.scss";
.prepuzzlescreen {
    width: 100%;
    height: 100%;
    background: rgb(0,0,0,.5);
}
.message {
    background: rgb(126,73,78, .5);
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 20px;
    z-index: 2;
    border-radius: 10px;
    width: 800px;
    max-width: 100%;
    text-align: center;
    &::v-deep p {
        color: white;
        font-size: 18px;
        line-height: 1.2;
        margin: 10px 0;
    }
    &::v-deep h1,&::v-deep h2,&::v-deep h3,&::v-deep h4 {
      margin-bottom: 0;
      font-size: 30px;
    }
}
.exit {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
}
.x {
    font-size: 60px;
    position: absolute;
    color: white;
    // top: -80%;
    font-family: Helvetica !important;
    transform: translateY(-100%) translateX(100%);
    cursor: pointer;
    right: 0;
}
</style>
