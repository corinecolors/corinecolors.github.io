<template>
  <div class="VideoPage">
    <img class="bg" :src="$puzzle.main_bg_bordered.url"/>
    <div class="VideoPage-inner">
      <h1 v-if="vid">{{$cms.textField(vid.video_title)}}</h1>
        <video 
        v-if="vid"
        class="vid" 
        controls 
        ref="video" 
        :src="vid.video.url" 
        :poster="vid.vid_preview_image.url" 
        id="video">
          Your browser does not support the video tag.
        </video>

          <ShareNetwork
            v-if="vid"
            class="social"
            network="facebook"
            :url="`https://corinecolors.github.io/#/video/${currentslug}`"
            :title="`title ofvideo`"
            :description="`desciptoijsdbfdjs`"
            hashtags="#nice, #good"
            quote="Corine colors ... dsufhdsukfh usdfhusdh fkudsjhksj www.google.com"
            :media="vid.vid_preview_image.url"
          >
            SHARE ON FB
          </ShareNetwork>
      </div>
        
      <!-- <div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://streamable.com/e/u8q3s2" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div> -->
  </div>
</template>

<script>
export default {
  name: "VideoPage",
  data() {
    return {
      slugarr: null,
      currentslug: null,
      vid: null
    };
  },
  props: {},
  watch: {},
  methods: {
    updateFbMetaTags() {
      //Set default FB meta tag Title
      // document.querySelector('meta[name="fbtitle"]').setAttribute("content", this.$cms.textField(this.vid.video_title));
      // //Set default FB meta tag Description
      // document.querySelector('meta[name="fbdescription"]').setAttribute("content", this.$cms.textField(this.vid.info));
      // //Set default FB meta tag Image
      // document.querySelector('meta[name="fbimage"]').setAttribute("content", this.vid.vid_preview_image.url);
    }
  },
  mounted() {
    this.slugarr = window.location.hash.split("/");
    this.currentslug = this.slugarr[this.slugarr.length - 1];
    this.vid = this.$puzzle.piece.filter((i) => i.video.name.split(".")[0] === this.currentslug)[0];
    console.log(this.vid)

    this.$nextTick(() => {
      if (!this.vid) {
        window.location.href="/";
      }
    })
    this.updateFbMetaTags();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vid {
  width: 50%;
  height: 50vh;
}
.VideoPage-inner {
  color: white;
  position: fixed;
  left: 0;
  top: 0;
    width: 100vw;
  height: 100vh;
  z-index: 2;
}
.bg {
  width: 100vw;
  height: 100vh;
  z-index: 0;
}
</style>
