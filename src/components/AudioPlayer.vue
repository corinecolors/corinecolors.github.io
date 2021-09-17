<template>
  <div class="audio">
      <audio  loop ref="audioetch">
        <source src="../assets/sounds/Etch.wav" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> 
      <audio ref="audiolight0">
        <source src="../assets/sounds/Light/Click_0.wav" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> 
      <audio ref="audiolight1">
        <source src="../assets/sounds/Light/Click_1.wav" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> 
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AudioPlayer",
  data() {
    return {
      counter: 3,
    };
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
        if (e.mouseevent === "mousedown" && this.tool.digType === "Reveal" && e.e !== "none") {
          this.counter ++;
          this.$refs[`audiolight${this.counter % 2}`].play();
        }
      }
    }
  },
  methods: {},
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
