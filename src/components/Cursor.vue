<template>
  <div class="cursor-wrapper">
    <div class="cursor" ref="cursor">
      <img :src="$store.state.tool.src" />
      <DebrisChoppings class="debris" />
    </div>
  </div>
</template>

<script>
import DebrisChoppings from "./Debris_Choppings";
export default {
  name: "Cursor",
  data() {
    return {};
  },
  components: {
    DebrisChoppings,
  },
  props: {},
  watch: {},
  methods: {
    mousemove() {
      window.addEventListener("mousemove", (e) => {
        // console.log(e);
        this.$refs.cursor.style = `transform: translateX(${e.clientX}px) translateY(${e.clientY}px)`;
      });
    },
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
.debris {
  width: 100px;
  top: -15px;
  position: fixed;
  z-index: -1;
}
</style>
