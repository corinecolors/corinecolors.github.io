<template>
  <div class="debris_choppings">
    <span v-if="$store.state.isDigging">
      <!-- AXE -->
      <transition appear v-if="tool.digType === 'Axe'" key="chopping">
        <span>
          
          <img src="../assets/debris/Choppings.svg" />
        </span>
      </transition>

      <!-- DIG -->
      <transition appear v-if="tool.digType === 'Dig'" key="dirt">
        <span>
         
          <img src="../assets/debris/Dirt.svg" />
        </span>
      </transition>

      <!-- ETCH -->
      <transition appear v-if="tool.digType === 'Etch'" key="peeling">
        <span>
          
          <img
            src="../assets/debris/Peeling.svg"
            style="width: 40px; margin-top: 20px"
          />
        </span>
      </transition>

      <!-- SNIP -->
      <transition appear v-if="tool.digType === 'Snip'" key="snips">
        <span>
         
          <img src="../assets/debris/Snips.svg" />
        </span>
      </transition>

      <!-- PAINT -->
      <transition
        appear
        v-if="tool.digType === 'Sponge' || tool.digType === 'Paint'"
        key="splash"
      >
        <span>
          
          <img
            src="../assets/debris/Splash.svg"
            style="width: 120px; margin-top: -20px; margin-left: -10px"
          />
        </span>
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
}
</style>
