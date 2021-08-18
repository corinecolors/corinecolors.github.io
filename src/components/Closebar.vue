<template>
  <div class="closebar" >
      <div class="close-wrapper" @click="action('close')">
        <div class="button close"/>
      </div>
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
.close-wrapper {
    display: inline-block;
    cursor: pointer;
    height: 22px;
    width: 22px;
    position: relative;
    &:hover  {
        &:after {
            content: '✕';
            font-size: 8px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
    }
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
