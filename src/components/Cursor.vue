<template>
<div class="cursor-wrapper">
  <div class="cursor" ref="cursor"><img :src="$store.state.tool.src"></div>
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
  methods: {
    mousemove() {
      window.addEventListener("mousemove", e => {
        // console.log(e);
        this.$refs.cursor.style =`transform: translateX(${e.clientX}px) translateY(${e.clientY}px)`;
      })
    }
  },
  mounted() {
    this.mousemove();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cursor {
  position: fixed;
  z-index: 1000000;
  pointer-events: none;
  left: -30px;
  top: -30px;
}
img {
  max-height: 60px;
}
</style>
