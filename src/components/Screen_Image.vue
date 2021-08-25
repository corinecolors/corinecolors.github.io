<template>
  <div class="screen recordings">
      <Closebar @close="close"/>
      <div class="screeninner">
      <!-- <img class="sidebar" src="../assets/recordingsidebar.jpg"/> -->
         <img :src="$desktopcontent.screenimage.primary.image.url"/>
      </div>

  </div>
</template>

<script>
import Closebar from "./Closebar.vue";

export default {
  name: "Screen_Email",
  components: {
Closebar,
  },
  beforeDestroy() {
    if (this.$refs.video) this.$refs.video.pause();
  },
  data() {
    return {
      
    };
  },
  props: {},
  watch: {},
  methods: {

    close(i) {
      this.$emit("close", i)
      this.$store.commit("showEmailThread", true);
    }
  },
  mounted() {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.screeninner {
    overflow: scroll;
    height: 70vh;
    position: relative;
}
.screen {
    position: fixed;
    height: 410px;
    width: 720px;
    display: inline-block;
    background: white;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 5px;
    overflow: hidden;
    padding-bottom: 22px;
}


.sidebar, .main {
  display: inline-block;
  vertical-align: top;
}
.main {
  // height: 450px;
  // width: 512px;
  width: 100%;
  // margin-top: 50px;
  text-align: center;
  position: absolute;
  height: 500px;
  width: 720px;
}
.vid {
  width: 100%;
  // padding-top: 30px;
  margin-top: -40px;
}
.play {
  width: 60px;
  position: absolute;
  right: 210px;
  top: 335px;
}

.rewind {
  width: 370px;
  height: 40px;
  background: green;
  position: absolute;
  top: 178px;
  left: 300px;
  opacity: 0;
}
</style>
