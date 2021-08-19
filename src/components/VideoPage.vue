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
        <div class="socials" v-if="vid">
            <transition v-for="(item, i) in socials" :key="i">
              <ShareNetwork
                class="social"
                :network="item.name"
                :url="url"
                :title="$cms.textField(vid.video_title)"
                :description="desc"
                hashtags="#nice, #good"
                :quote="`${$cms.textField(vid.video_title)} – ${desc}`"
              >
                <component class="icon" :is="item.component" />
              </ShareNetwork>
            </transition>
            <button @click="copytoclipboard" class="copy">
             <iconCopyLink/>
              <input type="text" class="url" ref="url" :value="url" />
            </button>
            <div class="copiedMsg" v-if="showCopiedMsg">
              Link copied to clipboard!
            </div>
          </div>
      </div>
        
      <!-- <div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://streamable.com/e/u8q3s2" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div> -->
  </div>
</template>

<script>
import iconFacebook from "./iconFacebook";
import iconTwitter from "./iconTwitter";
import iconWhatsapp from "./iconWhatsapp";
import InfoIcon from "./InfoIcon.vue";
import iconCopyLink from "./iconCopyLink";
export default {
  name: "VideoPage",
  components: {
    iconFacebook,
    iconTwitter,
    iconWhatsapp,
    InfoIcon,
    iconCopyLink
  },
  data() {
    return {
      slugarr: null,
      currentslug: null,
      vid: null,
      desc: null,
      showCopiedMsg:false,
      socials: [
        {
          name: "facebook",
          component: "iconFacebook",
        },
        {
          name: "twitter",
          component: "iconTwitter",
        },
        {
          name: "whatsapp",
          component: "iconWhatsapp",
        },
      ],
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
    },
    copytoclipboard() {
      var url = this.$refs.url;
      url.select();
      url.setSelectionRange(0, 99999);
      document.execCommand("copy");
      this.showCopiedMsg = true;
      setTimeout(() => {
        this.showCopiedMsg = false;
      }, 3000);
    },
  },
  mounted() {
    this.slugarr = window.location.hash.split("/");
    this.currentslug = this.slugarr[this.slugarr.length - 1];
    this.vid = this.$puzzle.piece.filter((i) => i.video.name.split(".")[0] === this.currentslug)[0];
    console.log(this.vid)
    this.url = `https://corinecolors.github.io/#/video/${
      this.currentslug
    }`;
    this.desc = "desc"; //default for now
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
  text-align: center;
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
.copy {
    width: 50px;
    height: 50px;
}
.copylink {
  width: 50px;
}
.url {
  position: absolute;
  opacity: 0;
}
.copiedMsg {
  padding: 10px;
  color: white;
}
button {
  border: none;
  padding: 0 5px;
}
.socialicons {
  vertical-align: top;
  display: inline-block;
  text-align: right;
  margin-left: auto;
  width: 50%;
}
.social {
  display: inline-block;
  padding: 0 5px;
  width: 50px;
}

</style>
