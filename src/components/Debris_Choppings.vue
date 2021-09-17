<template>
  <div class="debris_choppings">
    <span v-if="$store.state.isDigging">
      <!-- AXE -->
      <transition appear v-if="tool.digType === 'Axe'" key="chopping">
        <div class="debris">
          <div class="bg"/>
          <img src="../assets/debris/Choppings.svg" />
        </div>
      </transition>

      <!-- DIG -->
      <transition appear v-if="tool.digType === 'Dig'" key="dirt">
        <div class="debris">
          <div class="bg"/>
         
          <img src="../assets/debris/Dirt.svg" />
        </div>
      </transition>

      <!-- ETCH -->
      <transition appear v-if="tool.digType === 'Etch'" key="peeling">
        <div class="debris">
          <div class="bg"/>
          
          <img
            src="../assets/debris/Peeling.svg"
            style="width: 40px; margin-top: 20px"
          />
        </div>
      </transition>

      <!-- SNIP -->
      <transition appear v-if="tool.digType === 'Snip'" key="snips">
        <div class="debris">
          <div class="bg"/>
         
          <img src="../assets/debris/Snips.svg" />
        </div>
      </transition>

      <!-- SNIP -->
      <transition appear v-if="tool.digType === 'Magnify'" key="magnify">
        <div class="debris">
          <div class="bg"/>
         
          <img src="../assets/debris/Glow.svg" style="margin-left: -60px; margin-top: -40px;"/>
        </div>
      </transition>

      <!-- PAINT -->
      <transition
        appear
        v-if="tool.digType === 'Sponge' || tool.digType === 'Paint'"
        key="splash"
      >
        <div class="debris">
          <div class="bg"/>
          
          <img
            src="../assets/debris/Splash.svg"
            style="width: 120px; margin-top: -20px; margin-left: -10px"
          />
        </div>
      </transition>
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Debris_Choppings",
  computed: {
    ...mapState(["tool", "mouse"]),
  },
  data() {
    return {};
  },
  props: {},
  watch: {
 
  },
  methods: {},
  mounted() {
    // console.log(this.tool.digType);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.debris_choppings {
  pointer-events: none;
  // .bg {
  //   background: url("https://images.prismic.io/firstlady/a93564d3-3d40-4658-a136-c839c272b209_SquareTexture.jpg?auto=compress,format");
  //   background-size: cover;
  //   mix-blend-mode: exclusion;
  //   width: 100%;
  //   height: 100%;
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   z-index: 4;
  // }
  .debris {
    position: relative;
  }
  // img {
  //   mask-image: url("https://images.prismic.io/firstlady/a93564d3-3d40-4658-a136-c839c272b209_SquareTexture.jpg?auto=compress,format");
  //    -webkit-mask-image:url("https://images.prismic.io/firstlady/a93564d3-3d40-4658-a136-c839c272b209_SquareTexture.jpg?auto=compress,format");
  // }
}
</style>
