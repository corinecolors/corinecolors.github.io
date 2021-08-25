<template>
  <div id="app" ref="app">
    <div class="app-inner" v-if="ww > 1000">
      <transition appear name="EmailNotif" v-if="emailNotif && showEmailThread">
          <EmailNotif 
          class="EmailNotif" 
          @closeNotif="handlecloseNotif"
          @openEmail="handleopenEmail"/>
      </transition>
     <Nav v-if="!ChooseLanguage"/>

      <!-- <transition appear name="section" >
        <PostDisclaimerVideo 
        class="section PostDisclaimerVideo"
        v-show="PostDisclaimerVideo"
        :playVid="PostDisclaimerVideo"
        @videoEnded="handleNext"/>
        </transition> -->

       <transition appear name="section" v-if="$store.state.screens['showPuzzle'] && PrePuzzleScreen">
        <PrePuzzleScreen class="section PrePuzzleScreen" @exit="handlePrePuzzleScreen"/>
      </transition>

      <audio ref="disclaimervoice" v-if="disclaimervoiceUrl">
          <source :src="disclaimervoiceUrl" type="audio/mpeg" />
      </audio>
<!--  -->
      <transition  v-if="finalscreen" appear name="section">
        <FinalScreen class="section FinalScreen"/>
        </transition>


      <AudioPlayer/>

      <transition appear name="section">
        <Puzzle class="section Puzzle" v-if="$store.state.screens['showPuzzle']" />
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
          @muteDisclaimer="handlemuteDisclaimer"
        />
      </transition>

      <transition appear name="toolbar">
        <Toolbar
          class="section Toolbar"
          v-if="$store.state.screens['Toolbar'] "
        />
      </transition>

      <Desktop 
      class="section Desktop" 
      v-if="!$store.state.screens['showPuzzle'] && !Disclaimer"
      :openEmailScreen="openEmailScreen"/>

    </div>
      <div v-else class="mobile">
        <h1>Please view this experience on desktop.</h1>
      </div>
  </div>
</template>

<script>
// import FlippyImage from './components/FlippyImage.vue'
// import Puzzle from './components/Puzzle.vue'
import AudioPlayer from './components/AudioPlayer.vue'
// import PostDisclaimerVideo from './components/PostDisclaimerVideo.vue'

import ChooseLanguage from "./components/ChooseLanguage.vue";
import Desktop from "./components/Desktop.vue";
import IntroVideo from "./components/IntroVideo.vue";
import Curtain from "./components/Curtain.vue";
import Disclaimer from "./components/Disclaimer.vue";
import Nav from "./components/Nav.vue";
import PrePuzzleScreen from "./components/PrePuzzleScreen.vue";
// import Digging from "./components/Digging.vue";
import Toolbar from "./components/Toolbar.vue";
// import WarningSurveillance from "./components/WarningSurveillance.vue";
import Puzzle from "./components/Puzzle.vue";
import FinalScreen from "./components/FinalScreen.vue";
import EmailNotif from "./components/EmailNotif.vue";

import { mapState } from "vuex";
export default {
  name: "App",

  components: {
    // FlippyImage,
    // Puzzle
    ChooseLanguage,
    Desktop,
    Nav,
    IntroVideo,
    Curtain,
    Disclaimer,
    // Digging,
    Toolbar,
    // WarningSurveillance,
    Puzzle,
    AudioPlayer,
    FinalScreen,
    // PostDisclaimerVideo,
    EmailNotif,
    PrePuzzleScreen
  },
  computed: {
    ...mapState(["emailsRead", "allEmailsRead","donePuzzle", "localizationData", "activePiece", "showEmailThread"]),
  },
  watch: {
     
    // localizationData: {
     
    //   },
      deep:true
    },
    donePuzzle() {
      if (this.donePuzzle) {
        console.log("done puzzle!");
        this.finalscreen = true;
      }
    },
    emailsRead: {
      handler(e) {
        if (e.indexOf(false) < 0) {
          this.$store.commit("allEmailsRead", true);
          this.Toolbar = true;
        }
      },
      deep: true,
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
      finalscreen: false,
      disclaimervoiceUrl: null,
      PostDisclaimerVideo: false,
      ww: null,
      emailNotif:true,
      openEmailScreen: false,
      muteDisclaimer: false,
      PrePuzzleScreen: false
    };
  },
  methods: {
    handlePrePuzzleScreen() {
      this.PrePuzzleScreen = false;
      this.$store.commit('screens', {what: "Toolbar", bool: true});
    },
    handlemuteDisclaimer(e) {
      if (e) this.$refs.disclaimervoice.pause();
      else this.$refs.disclaimervoice.play();
    },
    handleNext(e) {
      // console.log(e);
      if (e === "langDissapear") {
        this.playVid = true;
        this.ChooseLanguage = false;
      }
      if (e === "vidDissapear") {
        this.IntroVideo = false;
         this.disclaimervoiceUrl = this.$store.state.data.disclaimervoice.url;
        setTimeout(() => {
          if (this.Disclaimer) this.$refs.disclaimervoice.play();
        }, 1000)
      }
      if (e === "disclaimerDissapear") {
        this.Disclaimer = false;
        this.PrePuzzleScreen = true;
        this.PostDisclaimerVideo = true;
        this.$refs.disclaimervoice.pause();
      }
      if (e === "disclaimerVidDissapear") {
        this.PostDisclaimerVideo = false;
      }
    },
    handleopenEmail() {
      this.openEmailScreen = true;
      this.emailNotif = false;
    },
    handlecloseNotif() {
      this.emailNotif = false;
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
    this.ww = window.innerWidth;
    window.addEventListener('resize', () => {
      this.ww = window.innerWidth;
    })

      // this.$store.commit('screens', {what: "Toolbar", bool: true});//temp

    // console.log(this.$puzzle.debris_bg.url);
    //Set default FB meta tag Title
    // document.querySelector('meta[name="fbtitle"]').setAttribute("content", this.$cms.textField(this.$puzzle.fb_default_title));
    // //Set default FB meta tag Description
    // document.querySelector('meta[name="fbdescription"]').setAttribute("content", this.$cms.textField(this.$puzzle.fb_default_desc));
    // //Set default FB meta tag Image
    // document.querySelector('meta[name="fbimage"]').setAttribute("content", this.$puzzle.fb_default_image.url);
  },
};
</script>

<style lang="scss">
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
  transition: background .5s ease, color .5s ease;
  &:hover {
  transition: background .5s ease, color .5s ease;
    background: white;
    color: black;
  }
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
.FinalScreen {
  z-index: 100;
  width: 100%;
  height: 100%;
  position: fixed;
}
.mobile {
  h1 {
    position: fixed;
    color: white;
    text-align: center;
    left: 50%;
    top: 50%;
    margin: 0;
    width: 80%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.EmailNotif, .bgg {
  left: calc(100% - 10px);
  transition: transform 1s ease ;
  // showing
  transform: translateX(-100%);
}
.EmailNotif-enter-to, .EmailNotif-leave-to {
  transform: translateX(-100%);
  transition: transform 1s ease ;
}
.EmailNotif-enter, .EmailNotif-leave, .EmailNotif-leave-active {
  transition: transform 1s ease ;
  transform: translateX(calc(0% + 20px));
}

.PrePuzzleScreen {
  position: fixed;
  z-index: 6;
}
.Toolbar {
  z-index: 100;
}
.toolbar-enter-active, .toolbar-leave-to {
  transform: translateX(-100%) !important;
  transition: transform .75s ease;
}
.toolbar-enter-to  {
  transform: translateX(0%) !important;
}
</style>
