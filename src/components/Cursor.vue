<template>
  <div class="cursor-wrapper">
    <div class="cursor" ref="cursor">
      <img :src="$store.state.tool.src" />
      <DebrisChoppings class="debris" />
      <div class="digmore" v-if="$store.state.digMoreMessage">Dig More!</div>
      <div class="pressPlayMessage" v-if="$store.state.pressPlayMessage">
        Watch the Video!
      </div>
    </div>
  </div>
</template>

<script>
import DebrisChoppings from "./Debris_Choppings";
import { mapState } from "vuex";

export default {
  name: "Cursor",
  data() {
    return {};
  },
  computed: {
    ...mapState(["digMoreMessage", "pressPlayMessage"]),
  },
  components: {
    DebrisChoppings,
  },
  props: {},
  watch: {
    pressPlayMessage() {
      setTimeout(() => {
        this.$store.commit("pressPlayMessage", false);
      }, 2000);
    },
    digMoreMessage() {
      setTimeout(() => {
        this.$store.commit("digMoreMessage", false);
      }, 2000);
    },
  },
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
.cursor-wrapper {
  color: white;
  font-weight: bold;
  color: rgb(211, 134, 247);
}
.digmore,
.pressPlayMessage {
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
}
</style>
