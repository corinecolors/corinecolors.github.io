<template>
  <div class="disclaimer">
    <div class="bg" />
    <div class="msg" v-if="$store.state.data.disclaimer && $store.state.data.disclaimer.length">
      <div v-html="$cms.htmlField($store.state.data.disclaimer)"/>
      <button class="mute" @click="handleMute"><iconMute :mute="mute" class="iconMute"/></button>
        <button class="disclaimerbutton" @click="handleLang('agree')">I Agree</button>
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
    handleLang() {
      this.$emit("next", "disclaimerDissapear", "localizationData");
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
}
.msg {
  width: 50%;
  margin: auto;
  margin-top: 50vh;
  transform: translateY(-50%);
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
  margin-top: 20px;
}
.iconMute {
  width: 20px;
  height: 20px;
}
.mute {
   &:hover {
      &::v-deep svg g path{
      fill: black !important;
    }
 }
}
</style>
