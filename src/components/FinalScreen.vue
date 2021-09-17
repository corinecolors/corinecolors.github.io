<template>
  <div class="finalscreen">
      <div class="cracks">
        <audio  loop ref="alarmsound">
            <source :src="$fin.alarm_sound.url" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio> 
        <div class="bg"/>
        <div class="crack crack1" ref="crack1">
            <!-- <img src="../assets/Cracks/crack1.svg"/> -->
            <img src="../assets/texture.png"/>
        </div>
        <div class="crack crack2" ref="crack2">
            <!-- <img src="../assets/Cracks/crack2.svg"/> -->
            <img src="../assets/texture.png"/>

        </div>
        <div class="crack crack3" ref="crack3">
            <!-- <img src="../assets/Cracks/crack3.svg"/> -->
            <img src="../assets/texture.png"/>

        </div>
        <div class="crack crack4" ref="crack4">
            <!-- <img src="../assets/Cracks/crack4.svg"/> -->
            <img src="../assets/texture.png"/>

        </div>
        <div class="alarm" ref="alarm" v-show="showAlarm">
          <img class="firealarm" src="../assets/firealarm/firealarm.png"/>
          <transition v-for="(item, i) in 8" :key="i">
            <img :class="`firealarm ${animtick === i ? `show` : `hide`}`" 
            :src="getImage(i)" 
            :refs="`lever-${i}`"/>
        </transition>
        <div class="desc" v-if="pulled">
            <h2>{{$cms.textField($fin.header)}}</h2>
            <p v-html="$cms.htmlField($fin.text)"></p>
            <div class="share">
                <div class="shareinner">
                    <h3>Share the Experience</h3>
                    <SocialsSharing class="social"/>
                </div>
            </div>
            <button class="mute" @click="handleMute"><iconMute :mute="!mute" class="iconMute"/></button>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import iconMute from "./iconMute";
import SocialsSharing from "./SocialsSharing";

export default {
  name: "FinalScreen",
  components: {
    iconMute,
    SocialsSharing
  },
  data() {
    return {
        startTimer: false,
        animtick: 0,
        showAlarm: false,
        mute: false,
        pulled:false
    };
  },
  props: {},
  beforeCreate() {
    this.$store.commit('screens', {what: "Toolbar", bool: false});
  },
  watch: {
      startTimer() {
        var timer = setInterval(() => {
            this.animtick ++;
            if (this.animtick > 6) {
                clearInterval(timer);
            }
        }, 250)
      }
  },
  methods: {
    handleMute() {
      this.mute = !this.mute;
      this.$refs.alarmsound.muted = this.mute;
    },
      getImage(i) {
          return require(`../assets/firealarm/${i}.png`);
      }
  },
  mounted() {
      this.$refs.alarm.addEventListener("mousedown", () => {
          this.startTimer = true;
          this.$refs.alarmsound.play();
          this.pulled = true;
          this.$emit("showWarning", true);
      })
  setTimeout(() => {
                this.$refs.crack1.className += " show";
       }, 500);
       setTimeout(() => {
                this.$refs.crack2.className += " show";
       }, 1000);
       setTimeout(() => {
                this.$refs.crack3.className += " show";
       }, 1500);
       setTimeout(() => {
                this.$refs.crack4.className += " show";
       }, 2000);
       setTimeout(() => {
                this.showAlarm = true;
       }, 2500);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import "../main.scss";
.crack {
    position: absolute;
    left: 50vw;
    top: 50vh;
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    // mask-size: 100%;
    mask-repeat: no-repeat;
    mask-position: center;
}
.show {
    opacity: 1;  
}
.cracks {
    position: fixed;
    left: 50vw;
    top: 50vh;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
    height: 100%;
}
.crack1 {
    width: 20%;
    mask-image: url("../assets/Cracks/crack1.svg");
    background: $maroon;

}
.crack2 {
    width: 20%;
    mask-image: url("../assets/Cracks/crack2.svg");
    background: $maroon;
}
.crack3 {
    width: 30%;
    mask-image: url("../assets/Cracks/crack3.svg");
    background: $maroon;
}
.crack4 {
    width: 80%;
    mask-image: url("../assets/Cracks/crack4.svg");
    background: $maroon;
}
.bg {
    background: black;
    opacity: .5;
}
.firealarm {
    cursor: pointer;
    height: 200px;
    position: fixed;
    left: 50vw;
    top: 20%;
    transform: translateX(-50%) translateY(-50%);
}
.show {
    opacity: 1;
}
.hide {
    opacity: 0;
}
.iconMute {
  width: 20px;
  height: 20px;
}
.mute {
 margin-left: 50%;
transform: translateX(-50%);
padding: 10px;
margin-top: 20px;
}
h2, p {
    color: white;
    text-align: center;
    margin-top: 0;
}
h2 {
    margin-bottom: 10px;
}
.desc {
    position: fixed;
    top: 60%;
    width: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgb(0,0,0,.75);
    padding: 10px;
    border-radius: 10px;

    &::v-deep p {
        margin: 10px 0;
    }
    h3 {
        color: white;
        text-align: center;
        margin-bottom: 0;
    }
}

.social {
  filter: invert(1);
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  width: auto !important;
  &::v-deep .share {
    display: none;
  }
  &::v-deep .copiedMsg {
    width: 200% !important;
    transform: translateY(50%) translateX(-50%);
    text-align: center;
    left: 50%;
}
}
.share {
    width: 100%;
    .shareinner {
        display: inline-block;
        background: rgb(0,0,0,.5);
        filter: invert(1);
        width: 300px;
        margin-left: 50%;
        transform: translateX(-50%);
        border-radius: 10px;
        padding-bottom: 10px;
    }
    &::v-deep .social {
        padding-bottom: 0;
    }
}
</style>
