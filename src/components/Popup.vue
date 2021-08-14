<template>
  <div class="popup"></div>
</template>

<script>
export default {
  name: "Template",
  data() {
    return {};
  },
  props: {
      pos: {
        type: Object,
        default: () => {return {x: 0, y: 0}}
      }
  },
  watch: {},
  methods: {},
  mounted() {
      console.log(this.pos);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
