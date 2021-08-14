<template>
  <div id="index" :style="`background: url(${$puzzle.main_bg.url}); background-size; cover;
  background-repeat: no-repeat; background-position: center;`">
    <router-view></router-view>
    <CursorThing />
  </div>
</template>

<script>
import CursorThing from "./components/Cursor.vue";
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
    return {};
  },

  components: {
    CursorThing,
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
img {
-webkit-user-drag: none;
-khtml-user-drag: none;
-moz-user-drag: none;
-o-user-drag: none;
user-drag: none;
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

  font-family: Arial, Helvetica, sans-serif;
  /* margin-top: 60px; */
  overflow: hidden;
  cursor: none;
  p, a, h1, h2, h3, h4, h5, span {
    font-family: Arial, Helvetica, sans-serif;
  }
}

body {
  margin: 0;
  height: 100%;
  /* overflow: hidden; */
  overscroll-behavior-y: none;
}
</style>
