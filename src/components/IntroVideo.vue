<template>
  <div class="video">
    <video ref="video" :src="src" />
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "IntroVideo",
  data() {
    return {
      src: "https://media.istockphoto.com/videos/storm-coming-in-over-lake-erie-time-lapse-video-id589466152",
    };
  },
  props: {
    playVid: Boolean,
  },
  computed: {
    ...mapState(['data'])
  },
  watch: {
    data: {
      handler(e) {
        this.src = e.introvid.url;
      }
    },
    playVid(e) {
      if (e) {
        // console.log("true!");
        setTimeout(() => {
          this.$refs.video.play();
        }, 200);
      }
    },
  },
  methods: {
    watchEndVideo() {
      this.$refs.video.addEventListener("ended", () => {
        setTimeout(() => {
          this.$emit("videoEnded", "vidDissapear");
        }, 200);
      })
    }
  },
  mounted() {
    this.watchEndVideo();
    // this.src = this.$store.state.data.intro_vid.url;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.video {
  text-align: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
video {
  width: 100%;
}
</style>
