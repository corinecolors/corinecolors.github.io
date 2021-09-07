<template>
  <div class="prepuzzlescreen">
      <div class="message">
          <div class="x" @mousedown="close">X</div>
          <p>Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo</p>
      </div>
      <div class="exit" @mousedown="close" ref="exit"/>
  </div>
</template>

<script>
export default {
  name: "Template",
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
    background: $maroon;
    display: inline-block;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 20px;
    z-index: 2;
    border-radius: 10px;
    max-width: 50%;
    p {
        color: white;
        font-size: 16px;
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
    top: -80%;
    cursor: pointer;
    right: -5%;
}
</style>
