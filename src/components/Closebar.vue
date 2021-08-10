<template>
  <div class="closebar" @click="action('close')">
      <div class="button close" />
      <div class="button min"/>
      <div class="button exp"/>
  </div>
</template>

<script>
export default {
  name: "Closebar",
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {
      action(action) {
          this.$emit(`${action}`, true);
      }
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.closebar {
    background: #4f4f51;
    padding: 5px;
    height: 22px;
}
.button {
    width: 12px;
    height: 12px;
    margin: 5px;
    border-radius: 100px;
    display: inline-block;
}
.close {
    background: #ed6a5f;
}
.min {
    background: #f5bf4f;
}
.exp {
    background: #69be58;
}
</style>
