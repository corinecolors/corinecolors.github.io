<template>
  <div id="app" ref="app">
    <div class="app-inner">
      <!-- <FlippyImage class="bg"/> -->
      <!-- <Puzzle/> -->
      <AudioPlayer/>
      <transition appear name="section">
        <Puzzle class="section Puzzle" v-if="$store.state.screens['Toolbar']" />
      </transition>
      <Curtain />
      <transition appear name="section">
        <ChooseLanguage
          @next="handleNext"
          class="section ChooseLanguage"
          v-if="ChooseLanguage"
        />
      </transition>
      <transition appear name="section">
        <IntroVideo
          :playVid="playVid"
          @videoEnded="handleNext"
          class="section IntroVideo"
          v-if="IntroVideo"
        />
      </transition>
      <transition appear name="section">
        <Disclaimer
          @next="handleNext"
          class="section Disclaimer"
          v-if="Disclaimer"
        />
      </transition>
      <!-- <Digging class="section Digging"/> -->
      <transition appear name="section">
        <Toolbar
          class="section Toolbar"
          v-if="$store.state.screens['Toolbar']"
        />
      </transition>
      <Desktop class="section Desktop" />
      <transition appear name="section">
        <WarningSurveillance v-if="!$store.state.screens.Toolbar" />
      </transition>
    </div>
  </div>
</template>

<script>
// import FlippyImage from './components/FlippyImage.vue'
// import Puzzle from './components/Puzzle.vue'
import AudioPlayer from './components/AudioPlayer.vue'

import ChooseLanguage from "./components/ChooseLanguage.vue";
import Desktop from "./components/Desktop.vue";
import IntroVideo from "./components/IntroVideo.vue";
import Curtain from "./components/Curtain.vue";
import Disclaimer from "./components/Disclaimer.vue";
// import Digging from "./components/Digging.vue";
import Toolbar from "./components/Toolbar.vue";
import WarningSurveillance from "./components/WarningSurveillance.vue";
import Puzzle from "./components/Puzzle.vue";
import { mapState } from "vuex";
export default {
  name: "App",

  components: {
    // FlippyImage,
    // Puzzle
    ChooseLanguage,
    Desktop,
    IntroVideo,
    Curtain,
    Disclaimer,
    // Digging,
    Toolbar,
    WarningSurveillance,
    Puzzle,
    AudioPlayer
  },
  computed: {
    ...mapState(["emailsRead", "allEmailsRead"]),
  },
  watch: {
    emailsRead: {
      handler(e) {
        if (e.indexOf(false) < 0) {
          this.$store.commit("allEmailsRead", true);
          this.Toolbar = true;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      targetpiece: null,
      lastFilePos: {},
      ChooseLanguage: true,
      playVid: false,
      IntroVideo: true,
      Disclaimer: true,
    };
  },
  methods: {
    handleNext(e) {
      // console.log(e);
      if (e === "langDissapear") {
        this.playVid = true;
        this.ChooseLanguage = false;
      }
      if (e === "vidDissapear") {
        this.IntroVideo = false;
      }
      if (e === "disclaimerDissapear") {
        this.Disclaimer = false;
      }
    },
    clickndrag() {
      this.$refs.app.addEventListener("mousedown", (e) => {
        if (e.target.className === "link") {
          this.offsetX = e.clientX - e.target.getBoundingClientRect().x;
          this.offsetY = e.clientY - e.target.getBoundingClientRect().y;
          // console.log(e.target.getBoundingClientRect());
          this.targetpiece = e.target;
          this.$refs.app.addEventListener("mousemove", this.move);
        }
      });
    },
    move(e) {
      this.$store.commit("mouse", {mouseevent: "mousemove", e: e});

      this.lastFilePos = {
        x: e.clientX - this.offsetX,
        y: e.clientY - this.offsetY,
      };
      this.targetpiece.style.transform = `translate(${this.lastFilePos.x}px, ${this.lastFilePos.y}px)`;
    },
    release() {
      this.$refs.app.addEventListener("mouseup", () => {
        this.$refs.app.removeEventListener("mousemove", this.move);
      });
    },
    setStore() {
      for (let i = 0; i < this.$emails.length; i++) {
        this.$store.state.emailsRead.push(false);
      }
    },
  },
  mounted() {
    // this.clickndrag();
    this.release();
    this.setStore();
    //Set default FB meta tag Title
    // document.querySelector('meta[name="fbtitle"]').setAttribute("content", this.$cms.textField(this.$puzzle.fb_default_title));
    // //Set default FB meta tag Description
    // document.querySelector('meta[name="fbdescription"]').setAttribute("content", this.$cms.textField(this.$puzzle.fb_default_desc));
    // //Set default FB meta tag Image
    // document.querySelector('meta[name="fbimage"]').setAttribute("content", this.$puzzle.fb_default_image.url);
  },
};
</script>

<style>
.app-inner {
  height: 100vh;
}
p {
  margin: 0;
  font-size: 14px;
  color: white;
}

.bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.folder {
  width: 65px;
}
.link p,
.link img {
  pointer-events: none;
}
.link {
  cursor: pointer;
  text-decoration: none;
  color: black;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  position: absolute;
  padding: 20px;
}
::selection {
  background-color: transparent;
  color: #000;
}
button {
  text-decoration: none;
  background: none;
  border: 1px solid white;
  color: white;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
}
.Digging {
  z-index: 4;
}

.Puzzle {
  z-index: 5;
  transition-delay: 1s;
}
.ChooseLanguage {
  z-index: 4;
}
.IntroVideo {
  z-index: 3;
}
.Disclaimer {
  z-index: 2;
}
.Toolbar {
  z-index: 100;
}
.Desktop {
  z-index: 0;
}
.section-leave-to {
  opacity: 0 !important;
  transition: opacity 1s ease;
  pointer-events: none;
}
.section-enter-active {
  transition: opacity 1s ease;
  opacity: 0;
}
.section-enter-to {
  transition: opacity 1s ease;
  opacity: 1;
}
.section {
  transition: opacity 1s ease;
  opacity: 1;
}
.smol {
  font-size: 12px;
}
</style>
