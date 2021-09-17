<template>
  <div class="disclaimer">
    <div class="bg" />
    <div class="msg" v-if="$store.state.data.disclaimer && $store.state.data.disclaimer.length">
      <div class="sansserif" v-html="$cms.htmlField($store.state.data.disclaimer)"/>
        <button class="disclaimerbutton" @click="handleLang('agree')"><span class="sansserif">Agree</span></button>
        <button class="disclaimerbutton" @click="handleLang('leave')"><span class="sansserif">Leave</span></button>
        <br/>
        <button class="mute" @click="handleMute"><iconMute :mute="mute" class="iconMute"/></button>
        <p class="sansserif"><strong>USE HEADPHONES FOR AN OPTIMAL EXPERIENCE.</strong></p>
      </div>
      
  </div>
</template>

<script>
import iconMute from "./iconMute";

export default {
  name: "Disclaimer",
  components: {
  iconMute
  },
  data() {
    return {
      mute: true
    };
  },
  props: {},
  watch: {
  },
  methods: {
    handleLang(e) {
      if (e === "agree") this.$emit("next", "disclaimerDissapear", "localizationData");
      else window.location.href="/";
    },
    handleMute() {
      this.$emit("muteDisclaimer", this.mute);
      this.mute = !this.mute;
    }
  },
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.disclaimer {
  position: fixed;
  background: black;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  text-align: center;
  color: white;
  &::v-deep p {
    margin: 10px 0;
    font-size: 16px;
  }
  &::v-deep strong {
  font-family: "Orator";
}
}
.msg {
  margin: auto;
  margin-top: 50vh;
  transform: translateY(-50%);
  max-width: 800px;

}
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: black;
  height: 100%;
  opacity: 0.75;
}
.disclaimerbutton {
  margin: 10px;
}
.iconMute {
  width: 20px;
  height: 20px;
  transform: translateY(-8px) translateX(-10px);
}
.mute {
  width: 20px;
  height: 20px;
  margin-bottom: 20px;
   &:hover {
      &::v-deep svg g path{
      fill: black !important;
    }
 }
}
strong {
  font-family: "Orator";
}
</style>
