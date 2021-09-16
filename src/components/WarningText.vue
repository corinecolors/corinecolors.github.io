<template>
  <div class="warning" ref="warningouter">
      <div class="warninginner" ref="warninginner">
          <h1 v-for="(item, i) in sentenceCount" :key="i" class="warning1" ref="warning1">This is a warning</h1>
        </div>
    </div>
</template>

<script>
import { gsap, Power0 } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin'
gsap.registerPlugin(CSSPlugin);
export default {
  name: "WarningText",
  data() {
    return {
        warningouterW: null,
        warning1W: null,
        sentenceCount: 1,
    };
  },
  props: {},
  watch: {},
  methods: {},
  mounted() {
      this.warningouterW = this.$refs.warningouter.getBoundingClientRect().width;
      this.warning1W = this.$refs.warning1[0].getBoundingClientRect().width;
      this.sentenceCount = Math.ceil(this.warningouterW / this.warning1W) + 1;
      console.log(this.sentenceCount);
      gsap.fromTo(this.$refs.warninginner,{x:0},{x:-this.warning1W, duration: 3, repeat: -1,ease: Power0.easeNone});
      
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.warning {
    position: fixed;
    z-index: 98;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    color: white;
    background: red;
}

.warning1 {
    display: inline-block;
    padding-right: 20px;
    margin: 0;
    text-transform: uppercase;
}
</style>
