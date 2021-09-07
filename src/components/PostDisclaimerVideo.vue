<template>
  <div class="post_disclaimer_video">
    <video controlsList="nodownload" oncontextmenu="return false;" ref="video" :src="src" />
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "PostDisclaimerVideo",
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
        this.src = e.postdisclaimervid.url;
      }
    },
    playVid(e) {
      if (e) {
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
          this.$emit("videoEnded", "disclaimerVidDissapear", "activePiece");
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
.post_disclaimer_video {
  text-align: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9;
}
video {
  width: 100%;
}
</style>
