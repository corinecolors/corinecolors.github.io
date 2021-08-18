<template>
  <div class="audio">
      <audio  loop ref="audioetch">
        <source src="../assets/sounds/Etch.wav" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> 
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AudioPlayer",
  data() {
    return {};
  },
  computed: {
    ...mapState(["tool", "mouse"]),
  },
  props: {},
  watch: {
    mouse: {
      handler(e) {
        if (e.mouseevent !== "mouseup" && this.tool.digType === "Etch") {
            this.$refs.audioetch.play();
        } else {
            this.$refs.audioetch.pause();
          }
      }
    }
  },
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
