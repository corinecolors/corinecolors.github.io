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
       <component  :is="item" @close="handleClose(i)" :class="item" @click.native="showOnTop(item)" :ref="item"/>
      </transition>
      </div>
  </div>
</template>

<script>
import ScreenEmail from "../components/Screen_Email.vue";
import ScreenRecordings from "../components/Screen_Recordings.vue";
import ScreenImage from "../components/Screen_Image.vue";

export default {
  components: {
    ScreenEmail,
    ScreenRecordings,
    ScreenImage
  },
  name: "Desktop",
  data() {
    return {
      activeScreen: ['ScreenRecordings', 'ScreenImage'],
    };
  },
  props: {
    openEmailScreen: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    openEmailScreen: {
      handler(e) {
        if (e) {
          this.activeScreen.push("ScreenEmail");
        }
      },
      deep: true 
    }
  },
  methods: {
    handleClose(i) {
      this.activeScreen.splice(i, 1);
    },
    showOnTop(item) {
      if (this.$refs[this.activeScreen[0]][0]) {
        for (let i = 0; i < this.activeScreen.length; i++) {
          this.$refs[this.activeScreen[i]][0].$el.style=" z-index: 0"
        }
        this.$refs[item][0].$el.style=" z-index: 1";
      }
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
.ScreenRecordings {
  transform: translateY(-300px) translateX(-600px);
  z-index: 1;
}
.ScreenImage {
    transform: translateY(-100px) translateX(-100px);
}
</style>
