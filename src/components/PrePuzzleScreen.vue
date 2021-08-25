<template>
  <div class="prepuzzlescreen">
      <div class="message">
          <p>Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo Popup message yo</p>
      </div>
      <div class="exit" ref="exit"/>
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
  methods: {},
  mounted() {
      this.$refs.exit.addEventListener("mousedown", () => {
          this.$emit("exit", true);
      })
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.prepuzzlescreen {
    width: 100%;
    height: 100%;
    background: rgb(0,0,0,.5);
}
.message {
    background: white;
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
        color: black;
    }
}
.exit {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
}
</style>
