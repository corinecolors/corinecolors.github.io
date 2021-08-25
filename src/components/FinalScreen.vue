<template>
  <div class="finalscreen">
      <div class="cracks">
        <audio  loop ref="alarmsound">
            <source :src="$fin.alarm_sound.url" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio> 
        <div class="bg"/>
        <div class="crack crack1" ref="crack1">
            <img src="../assets/Cracks/crack1.svg"/>
        </div>
        <div class="crack crack2" ref="crack2">
            <img src="../assets/Cracks/crack2.svg"/>
        </div>
        <div class="crack crack3" ref="crack3">
            <img src="../assets/Cracks/crack3.svg"/>
        </div>
        <div class="crack crack4" ref="crack4">
            <img src="../assets/Cracks/crack4.svg"/>
        </div>
        <div class="alarm" ref="alarm" v-show="showAlarm">
          <img class="firealarm" src="../assets/firealarm/firealarm.png"/>
          <transition v-for="(item, i) in 8" :key="i">
            <img :class="`firealarm ${animtick === i ? `show` : `hide`}`" 
            :src="getImage(i)" 
            :refs="`lever-${i}`"/>
        </transition>
        <button class="mute" @click="handleMute"><iconMute :mute="!mute" class="iconMute"/></button>
        <div class="desc" v-if="pulled">
            <h2>{{$cms.textField($fin.header)}}</h2>
            <p>{{$cms.textField($fin.text)}}</p>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import iconMute from "./iconMute";

export default {
  name: "FinalScreen",
  components: {
    iconMute
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
      })
      console.log(this.$fin.alarm_sound.url, this.$refs.alarm);
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
// .cracks {}
.crack {
    position: absolute;
    left: 50vw;
    top: 50vh;
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;
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
}
.crack2 {
    width: 20%;
}
.crack3 {
    width: 40%;
}
.crack4 {
    width: 50%;
}
.bg {
    background: black;
    opacity: .5;
}
.firealarm {
    width: 15%;
    position: fixed;
    left: 50vw;
    top: 40vh;
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
    position: fixed;
    left: 50%;
    top: 55%;
    transform: translateX(-50%);
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
    top: 65%;
    width: 100%;
}
</style>
