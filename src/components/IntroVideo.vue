<template>
  <div class="video">
    <video ref="video" :src="src" />
    <button class="mute" @click="handleMute"><iconMute :mute="!mute" class="iconMute"/></button>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import iconMute from "./iconMute";

export default {
  name: "IntroVideo",
  components: {
    iconMute
  },
  data() {
    return {
      src: "https://media.istockphoto.com/videos/storm-coming-in-over-lake-erie-time-lapse-video-id589466152",
      mute: false
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
    handleMute() {
      this.mute = !this.mute;
      this.$refs.video.muted = this.mute;
    },
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
  height: 100vh;
  width: 100vw;
  text-align: center;
}
.iconMute {
  width: 20px;
  height: 20px;
}
.mute {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  margin: 10px;
  background: rgb(0,0,0,.5);
}
</style>
