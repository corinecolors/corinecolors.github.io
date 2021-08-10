<template>
  <div class="chooselanguage">
    <div class="msg">
      <p class="line">Please choose your language.</p>
      <button class="eng" @click="handleLang('en')">English</button>
      <button class="arabic" @click="handleLang('ar')">Arabic</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "ChooseLanguage",
  data() {
    return {};
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
</style>
