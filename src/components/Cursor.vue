<template>
  <div class="cursor-wrapper">
    <div class="cursor" ref="cursor">
      <img :src="$store.state.tool.src" :style="$store.state.tool.src ? `opacity: 1` : `opacity: 0`"/>
      <!-- <DebrisChoppings class="debris" /> -->
      <div class="tooltip" 
      v-if="digMoreMessage" 
      ref="tooltip">{{digMoreMessage}}</div>
      <!-- <div class="pressPlayMessage" v-if="$store.state.pressPlayMessage">
        Press play to continue!
      </div> -->
    </div>
  </div>
</template>

<script>
// import DebrisChoppings from "./Debris_Choppings";
import { mapState } from "vuex";

export default {
  name: "Cursor",
  data() {
    return {};
  },
  computed: {
    ...mapState(["digMoreMessage", "pressPlayMessage", "activePiece", "AAsolved"]),
  },
  components: {
    // DebrisChoppings,
  },
  props: {},
  watch: {
      AAsolved() {
        this.$store.commit("tool", {
        src: '',
        digType: "",
      })
    },
  },
  methods: {
    mousemove() {
      window.addEventListener("mousemove", (e) => {
        this.$refs.cursor.style = `transform: translateX(${e.clientX}px) translateY(${e.clientY}px)`;
        this.$refs.tooltip.style = `transform: translateX(${e.clientX})`
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
  left: -50px;
  top: -50px;
  img {
    width: 80px;
    height: 80px;
  }
}
img {
  max-height: 100px;
}
.debris {
  width: 100px;
  top: -15px;
  position: fixed;
  z-index: -1;
}
.cursor-wrapper {
  color: black;
  font-size: 12px;
}
.tooltip {
  background: white;
  padding: 1px 5px;
  border: 1px solid black;
  // margin-top: 80px;
  font-family: Helvetica !important;

}

.pressPlayMessage {
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 1);
}
</style>
