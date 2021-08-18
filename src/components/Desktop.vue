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
    <div class="screenarea" v-if="activeScreen && activeScreen.length">
      <transition v-for="(item, i) in activeScreen" :key="i">
       <component  :is="item" @close="handleClose(i)"/>
      </transition>
      </div>
  </div>
</template>

<script>
import ScreenEmail from "../components/Screen_Email.vue";
import ScreenRecordings from "../components/Screen_Recordings.vue";

export default {
  components: {
    ScreenEmail,
    ScreenRecordings
  },
  name: "Desktop",
  data() {
    return {
      activeScreen: [],
    };
  },
  props: {},
  watch: {},
  methods: {
    handleClose(i) {
      this.activeScreen.splice(i, 1);
    },
    goTo(item) {
      if (this.activeScreen.indexOf(this.$cms.textField(item.link)) < 0)
        this.activeScreen.push(this.$cms.textField(item.link));
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
