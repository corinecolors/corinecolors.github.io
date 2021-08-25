<template>
  <div class="screen recordings">
      <Closebar @close="close"/>
      <div class="screeninner">
      <!-- <img class="sidebar" src="../assets/recordingsidebar.jpg"/> -->
      <div class="main">
        <video class="vid" :poster="$desktopcontent.screenrecordings.primary.video_thumb.url" ref="video" id="video">
          <source :src="$desktopcontent.screenrecordings.primary.main_video.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div class="play" @click.prevent="handlePlay"><Playbutton :fill="`#83475d`"/></div>
        <div class="rewind" ref="rewind"></div>
        <div class="rwd" @click="rwd"></div>
        <div class="fwd" @click="fwd"></div>
        </div>
      </div>

  </div>
</template>

<script>
import Closebar from "./Closebar.vue";
import Playbutton from "./Playbutton.vue";

export default {
  name: "Screen_Email",
  components: {
Closebar,
Playbutton
  },
  beforeDestroy() {
    this.$refs.video.pause();
  },
  data() {
    return {
      menuitems: [
        {
          title: "Inbox",
          src: require('../assets/inbox.png')
        },
        {
          title: "Starred",
          src: require('../assets/starred.png')
        },
        {
          title: "Sent",
          src: require('../assets/sent.png')
        },
        {
          title: "Drafts",
          src: require('../assets/drafts.png')
        },
        {
          title: "Trash",
          src: require('../assets/trash.png')
        },
      ],
      currentEmail: null,
      isPlaying: false,
      rewindWidth: 0,
      
    };
  },
  props: {},
  watch: {},
  methods: {
    rwd() {
      this.$refs.video.currentTime -= 15;
    },
    fwd() {
      this.$refs.video.currentTime += 15;
    },
    handlePlay() {
      if (this.isPlaying) {
        this.$refs.video.pause();
        this.isPlaying = false;
      } else {
        this.$refs.video.play();
        this.isPlaying = true;
      }

    },
    rewindCapability(e) {

      
      // console.log(this.$refs.video.currentTime, this.rewindWidth, e.offsetX);
      this.$refs.video.currentTime = e.offsetX * (29 / this.rewindWidth);
      // this.$refs.video.play();

    },
    close(i) {
      this.$emit("close", i)
      this.$store.commit("showEmailThread", true);
    }
  },
  mounted() {
    // this.$refs.video.addEventListener('ended', () => {
    //   this.$store.commit("emailNotif", true);
    // })
    // this.rewindCapability();
    this.rewindWidth = this.$refs.rewind.getBoundingClientRect().width;
    this.$refs.rewind.addEventListener("mousedown", this.rewindCapability);
    // setTimeout(() => {
    //   this.$refs.video.play();
    // }, 1000)
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.screeninner {
    overflow: scroll;
    height: 70vh;
    position: relative;
}
.screen {
    margin-left: 100px;
    position: fixed;
    height: 410px;
    width: 720px;
    display: inline-block;
    background: white;
    left: 700px;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 5px;
    overflow: hidden;
    padding-bottom: 22px;
}


.sidebar, .main {
  display: inline-block;
  vertical-align: top;
}
.main {
  // height: 450px;
  // width: 512px;
  width: 100%;
  // margin-top: 50px;
  text-align: center;
  position: absolute;
  height: 500px;
  width: 720px;
}
.vid {
  width: 100%;
  // padding-top: 30px;
  margin-top: -40px;
}
.play {
  width: 60px;
  position: absolute;
  right: 210px;
  cursor: pointer;
  top: 335px;
}

.rewind {
  width: 370px;
  height: 40px;
  background: green;
  position: absolute;
  top: 178px;
  left: 300px;
  cursor: pointer;
  opacity: 0;
}
.rwd {
  width: 30px;
  height: 30px;
  position: absolute;
  background: green;
  opacity: 0;
  left: 412px;
  top: 352px;
  cursor: pointer;
}
.fwd {
  width: 30px;
  height: 30px;
  position: absolute;
  background: green;
  opacity: 0;
  left: 516px;
  top: 352px;
  cursor: pointer;

}
</style>
