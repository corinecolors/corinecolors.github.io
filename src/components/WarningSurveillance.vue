<template>
  <div class="warning">
      <p class="warningmsg">
          <span class="msginner">
          <span class="first">WARNING: Lina's desktop is under strict 24 hour surveillance.</span>
          <span>🔴</span><span class="rec">REC</span>
          <span class="stoprec" @click.prevent="handleClick" v-if="allEmailsRead">Stop REC</span>
          </span>
        </p>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "Template",
  data() {
    return {};
  },
  computed: {
    ...mapState(["allEmailsRead"])

  },
  props: {},
  watch: {},
  methods: {
      handleClick() {
          this.$store.commit('screens', {what: "Toolbar", bool: true});
      }
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
    color: red;
    text-align: center;
    font-size: 10px;
}
span:not(.stoprec) {
    padding-right: 5px;
}
.warning {
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    border: 1px solid red;
}
.warningmsg {
    color: white;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    padding-right: 10px;
    // background: red;
    width: 100%;
}
.msginner {

    animation: flash 5s linear;
    animation-iteration-count:infinite ;
}
.first {
    padding-right: 10px;
}

@keyframes flash {
    0% {
        opacity: 0;
    }
    25% {
        opacity: 1;
    }
    75% {
        opacity: 1;

    }
    100% {
        opacity: 0;
    }
}
.stoprec {
    border: 1px solid red;
    text-align: center;
    color: red;
    padding: 5px;
    border-radius: 20px;
    cursor: pointer;
}
</style>
