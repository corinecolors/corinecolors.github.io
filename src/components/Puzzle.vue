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
            :class="`${activei >= i ? `active` : `inactive`}`"
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
      showVid: false,
      activeVidData: {},
      activei: this.$store.state.activePiece.i 
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
      this.showVid = true;
      this.$store.commit("activePiece", {activepiece: this.$puzzle.piece[e.i + 1], i: e.i + 1});
      this.activei = e.i + 1;
    },
  },
  mounted() {
    //   console.log(this.$puzzle.piece);
    this.$store.commit("activePiece", {activepiece: this.$puzzle.piece[this.activei], i: this.activei});
    // this.handleSolved({i: this.$store.state.completedPuzzles});
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.puzzle {
  position: fixed;
  // z-index: 1000;
  // background: black;
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
