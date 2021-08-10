<template>
  <div class="debris_choppings">
    <span v-if="$store.state.isDigging">
      <transition
        appear
        v-if="$store.state.tool.digType === 'Axe'"
        key="chopping"
      >
        <img src="../assets/debris/Choppings.svg" />
      </transition>

      <transition appear v-if="$store.state.tool.digType === 'Dig'" key="dirt">
        <img src="../assets/debris/Dirt.svg" />
      </transition>

      <transition
        appear
        v-if="$store.state.tool.digType === 'Etch'"
        key="peeling"
      >
        <img
          src="../assets/debris/Peeling.svg"
          style="width: 40px; margin-top: 20px"
        />
      </transition>

      <transition
        appear
        v-if="$store.state.tool.digType === 'Snip'"
        key="snips"
      >
        <img src="../assets/debris/Snips.svg" />
      </transition>

      <transition
        appear
        v-if="
          $store.state.tool.digType === 'Sponge' ||
          $store.state.tool.digType === 'Paint'
        "
        key="splash"
      >
        <img
          src="../assets/debris/Splash.svg"
          style="width: 120px; margin-top: -20px; margin-left: -10px"
        />
      </transition>
    </span>
  </div>
</template>

<script>
export default {
  name: "Debris_Choppings",
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {},
  mounted() {
    console.log(this.$store.state.tool.digType);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.debris_choppings {
  pointer-events: none;
}
</style>
