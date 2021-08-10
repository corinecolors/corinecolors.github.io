<template>
  <div class="curtain">
      <transition v-if="!hide" appear name="curtain">
        <div class="curtain-inner">
        </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Template",
  data() {
    return {
        hide: false
    };
  },
  props: {},
  watch: {},
  methods: {},
  mounted() {
      setTimeout(() => {
          this.hide = true;
      }, 200);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.curtain-inner {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 100;
    opacity: 1;
}
.curtain-leave-to {
    opacity: 0;
    transition: opacity 2s ease;
    pointer-events: none;
}
</style>
