<template>
  <div class="chooselanguage" :style="`background-image: url(${$puzzle.disclaimer_bg_image.url}); background-size: cover;
  background-repeat: no-repeat; background-position: center; `">
  <transition appear name="appear">
      <div class="msg" v-if="revealMsg">
        <div class="bg"/>
        <p class="line">Please choose your language.</p>
        <button class="eng" @click="handleLang('en')">English Audio</button>
        <button class="arabic" @click="handleLang('ar')">Arabic Audio</button>
      </div>
    </transition>
    <transition appear name="appear">
    <div 
    v-if="!revealMsg"
    class="msg playbutton" 
    @click="revealMsg = true"
    @mousedown = "revealMsg = true">
      <Playbutton/>
    </div>
    </transition>
  </div>
</template>

<script>
import Playbutton from "./Playbutton";

export default {
  name: "ChooseLanguage",
  data() {
    return {
      revealMsg:false
    };
  },
  components: {
    Playbutton
  },
  computed: {
  },
  props: {},
  watch: {
  
  },
  methods: {
    handleLang(lang) {
      if (lang === "ar") {
        this.$store.commit("localizationData", this.$arabic);
      } else {
        this.$store.commit("localizationData", this.$eng);
      }
      this.$emit("next", "langDissapear");
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chooselanguage {
  /* background: black; */
  
  
  position: fixed;
  top: 0;
  left: 0;
  background: black;
  width: 100%;
  height: 100%;
}
.msg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  padding:  20px;
  display: inline-block;
  .bg {
    background: black;
    opacity: .8;
    width: 100%;
    border-radius: 20px;
    height: 100%;
  }
}
button {
  width: 100px;
  cursor: pointer;
}
.line {
  padding-bottom: 20px;
}
.eng {
  margin-right: 20px;
}
.eng, .arabic {
    transition: background .5s ease, color .5s ease;

  &:hover {
    background: white;
    color: black;
    transition: background .5s ease, color .5s ease;
  }
}
.playbutton {
  width: 100px;
  cursor: pointer;
}
.appear-enter-active {
  opacity: 0 ;
  transition: opacity .5s ease;
}
.appear-enter-to {
  opacity: 1 ;
  transition: opacity .5s ease;
}
.appear-leave-active {
  opacity: 1;
}
.appear-leave-to {
  opacity: 0;
  transition: opacity .5s ease;
}
</style>
