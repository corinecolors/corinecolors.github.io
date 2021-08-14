<template>
  <div class="finalscreen">
      <div class="cracks">
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
          </div>

  </div>
</template>

<script>
export default {
  name: "Template",
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {},
  mounted() {
  setTimeout(() => {
                this.$refs.crack1.className += " show";
       }, 1000);
       setTimeout(() => {
                this.$refs.crack2.className += " show";
       }, 2000);
       setTimeout(() => {
                this.$refs.crack3.className += " show";
       }, 3000);
       setTimeout(() => {
                this.$refs.crack4.className += " show";
       }, 4000);
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
</style>
