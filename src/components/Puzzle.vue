<template>
  <div class="puzzle">
   <img class="bg" :src="$puzzle.main_bg_bordered.url"/>
    <VideoPopup
      class="section VideoPopup"
      v-if="showVid"
      :data="$puzzle.piece[activei - 1]"
      @closeVid="showVid = false"
    />

    <div class="wholePuzzle">
      <transition v-for="(item, i) in $puzzle.piece" :key="i">
        <div class="piece">
          <Digging
            :activei="activei"
            :i="i"
            :key="i"
            @solved="handleSolved"
            :data="{ data: item, i: i }"
            :class="`${activei === i ? `active` : `inactive`} ${
              i < activei ? `solvedPuz` : ``
            }`"
          />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Digging from "./Digging.vue";
import VideoPopup from "./VideoPopup.vue";

export default {
  name: "Puzzle",
  data() {
    return {
      activei: 0,
      showVid: false,
      activeVidData: {},
    };
  },
  components: {
    Digging,
    VideoPopup,
  },
  props: {},
  watch: {},
  methods: {
    handleSolved(e) {
      //do other stuff first, then this is called.
      this.showVid = true;
      this.activei = e.i + 1;
      this.$store.commit("activePiece", this.$puzzle.piece[this.activei]);
      // console.log(this.$store.state.activePiece);
    },
  },
  mounted() {
    //   console.log(this.$puzzle.piece);
    this.$store.commit("activePiece", this.$puzzle.piece[0]);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.puzzle {
  position: fixed;
  // z-index: 1000;
  background: black;
  width: 100%;
  height: 100%;
}
.wholePuzzle {
  display: flex;
  flex-wrap: wrap;
  width: calc(100vh * 1.52);
  margin: auto;
}
.inactive:not(.solvedPuz) {
  pointer-events: none;
  // opacity: 0;
}
.solvedPuz {
  opacity: 1;
}
.digging {
  height: 50vh;
  // flex: 1 1 25%;
  // &:nth-child(4n + 1) {
  //     margin-left: auto;
  // }
  //  &:nth-child(4n) {
  //     margin-right: auto;
  // }
}
.VideoPopup {
  z-index: 1000;
  position: fixed;
}
.piece {
  position: relative;
}
.bg {
  width: calc(100vw - 2px);
  height: calc(100vh - 2px);
}
</style>
