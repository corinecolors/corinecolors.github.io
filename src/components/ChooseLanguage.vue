<template>
  <div class="chooselanguage" :style="`background-image: url(${$puzzle.disclaimer_bg_image.url}); background-size: cover;
  background-repeat: no-repeat; background-position: center; `">
  <transition appear name="appear">
      <div class="msg" v-if="revealMsg">
        <div class="bg"/>
        <p class="line">Please choose your language.</p>
        <button class="eng" @click="handleLang('en')"><span class="sansserif">English Audio</span></button>
        <button class="arabic" @click="handleLang('ar')"><span class="sansserif">Arabic Audio</span></button>
      </div>
    </transition>
      <div class="container">
        <transition appear name="appear">
            <div 
            v-if="!revealMsg"
            class="msg playbutton" 
            @click="revealMsg = true"
            @mousedown="revealMsg = true">
              <Playbutton fill="#7e494e"/>
            </div>
        </transition>
    </div>
    <div class="footer">
        <SocialsLinking class="social"/>
        <p>© 2021 – 2023 CColorsInMotion <small>corine attieh</small></p>
      </div>

  </div>
</template>

<script>
import Playbutton from "./Playbutton";
import SocialsLinking from "./SocialsLinking";

export default {
  name: "ChooseLanguage",
  data() {
    return {
      revealMsg:false
    };
  },
  components: {
    Playbutton,
    SocialsLinking
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
.container {
  position: fixed;
    left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 50%;
  height: 100px;
}
.chooselanguage {
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
  z-index: 2;
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

.footer {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  margin-bottom: 10px;
  background: rgb(255,255,255,.75);
  display: inline-block;
  border-radius: 10px;
  filter: invert(1);
  padding: 10px;
p {
  font-size: 12px;
  color: black;
  margin: 0;
}
.social {
    padding: 10px;
    width: auto !important;
    padding-bottom: 0;
    margin-bottom: 10px;
    margin-left: 50%;
    transform: translateX(-50%);
    &::v-deep .share {
      display: none;
    }
  }
}
</style>
