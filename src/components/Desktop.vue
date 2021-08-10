<template>
  <div id="desktop">
    <div
      v-for="(item, i) in $store.state.data.desktop"
      class="link"
      :key="i"
      :style="`transform: translateY(${i * 100}px)`"
      @click="goTo(item)"
    >
      <img class="folder" :src="item.icon.url" />
      <p>{{$cms.textField(item.label)}}</p>
    </div>
    <div class="screenarea">
      <component :is="activeScreen" @close="handleClose"/>
      </div>
  </div>
</template>

<script>
import ScreenEmail from "../components/Screen_Email.vue";

export default {
  components: {
    ScreenEmail
  },
  name: "Desktop",
  data() {
    return {
      activeScreen: null,
   
    };
  },
  props: {},
  watch: {},
  methods: {
    handleClose(i) {
      if (i) {
        this.activeScreen = null;
      }
    },
    goTo(item) {
      if (!this.activeScreen)
        this.activeScreen = this.$cms.textField(item.link);
    }
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#desktop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
