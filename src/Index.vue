<template>
  <div id="index" :style="`background: url(${$puzzle.main_bg.url}); background-size; cover;
  background-repeat: no-repeat; background-position: center; ${$store.state.tool.src ? `cursor: none` : `cursor: default`}`">
    <router-view
    @finalscreen="handlefinalscreen" v-if="!isVidScreen"></router-view>
    <VideoPage v-else/>
    <CursorThing />
    <Nav />
  <!-- <FooterItem ref="footer" class="section FooterItem" /> -->
  </div>
</template>

<script>
import CursorThing from "./components/Cursor.vue";
import VideoPage from "./components/VideoPage.vue";
import Nav from './components/Nav.vue'
// import FooterItem from "./components/FooterItem.vue";

export default {
  name: "Index",
  metaInfo: {
    title: `Lina's Desktop`,
    titleTemplate: "%s | An Immersive Experience",
    // meta: [
    //   {
    //     name: "fbtitle",
    //     property: "og:title",
    //     content: "TESTING TO SEE IF THIS APPEARS",
    //   },
    // ],
  },

  data() {
    return {
      isVidScreen: false
    };
  },

  components: {
    CursorThing,
    VideoPage,
    Nav,
    // FooterItem
  },
  props: {},
  watch: {},
  methods: {
    handlefinalscreen() {
      this.$refs.footer.$el.className += ` fin`;
    }
  },
  computed: {},
  mounted() {
     this.isVidScreen = window.location.hash.includes(`#video`);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@font-face {
    font-family: 'Orator';
    src: url('./assets/fonts/OratorStd.eot');
    src: url('./assets/fonts/OratorStd.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/OratorStd.woff2') format('woff2'),
        url('./assets/fonts/OratorStd.woff') format('woff'),
        url('./assets/fonts/OratorStd.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}


img, p, h1, h2, h3, h4, h5, h6, div {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
#index {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100vh;
  /* background: black; */
  // background: rgb(126, 107, 125);
  // background: linear-gradient(
  //   180deg,
  //   rgba(126, 107, 125, 1) 0%,
  //   rgba(62, 50, 62, 1) 100%
  // );

  font-family: 'Open Sans Condensed', sans-serif;
  /* margin-top: 60px; */

  overflow: hidden;
  // cursor: none;
  p, a, h1, h2, h3, h4, h5, span, input, button {
    font-family: Orator, Helvetica, sans-serif;
    
  }
  .sansserif {
    font-family: 'Open Sans Condensed', sans-serif;
    p {
      font-family: 'Open Sans Condensed', sans-serif;

    }
  }
}

body {
  margin: 0;
  height: 100%;
  /* overflow: hidden; */
  overscroll-behavior-y: none;
}
// .FooterItem {
//   z-index: 20;
//   position: fixed;
//   bottom: 0;
  
//   right: 0;
//   // background: green;
// }
</style>
