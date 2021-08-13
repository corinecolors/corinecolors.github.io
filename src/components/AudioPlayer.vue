<template>
  <div class="audio">
      <audio  loop ref="audioaxe">
        <source src="../assets/sounds/Axe.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
        <audio  loop ref="audiodig">
        <source src="../assets/sounds/Dig.wav" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio  loop ref="audioetch">
        <source src="../assets/sounds/Etch.wav" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
        <audio  loop ref="audiosnip">
        <source src="../assets/sounds/Snip.wav" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio  loop ref="audiopaint">
        <source src="../assets/sounds/Paint.wav" type="audio/mpeg" />
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
        switch(this.tool.digType) {
          case "Axe": {
            if (e.mouseevent === "mouseup") {
              this.$refs.audioaxe.pause();
            } else {
              this.$refs.audioaxe.play();
            }
            
            break;
          }
           case "Dig": {
             if (e.mouseevent === "mouseup") {
              this.$refs.audiodig.pause();
            } else {
            this.$refs.audiodig.play();
            }
            break;
          }
          case "Etch": {
            if (e.mouseevent === "mouseup") {
              this.$refs.audioetch.pause();
            } else {
            this.$refs.audioetch.play();
            }
            break;
          }
          case "Snip": {
            if (e.mouseevent === "mouseup") {
              this.$refs.audiosnip.pause();
            } else {
            this.$refs.audiosnip.play();
            }
            break;
          }
          case "Paint": {
            if (e.mouseevent === "mouseup") {
              this.$refs.audiopaint.pause();
            } else {
            this.$refs.audiopaint.play();
            }
            break;
          }
          case "Sponge": {
            if (e.mouseevent === "mouseup") {
              this.$refs.audiopaint.pause();
            } else {
            this.$refs.audiopaint.play();
            }
            break;
          }
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
