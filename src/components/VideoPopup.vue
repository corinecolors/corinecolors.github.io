<template>
  <div class="videopopup">
    <div class="bg" />
    <div class="inner">
      <div class="close" v-if="showX" @click="closeVid">X</div>
      <div class="videopopup-inner">
        <h2>{{ $cms.textField(data.video_title) }}</h2>
        <video class="vid" controls ref="video" id="video">
          <source :src="data.video.url" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <!-- <iframe ref="video" id="video" class="vid" :src="activeVidData.url" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      <br/> -->

        <!-- <youtube video-id="video" ref="youtube" :width="width" :height="height"></youtube> -->
        <div class="infobar">
          <div class="info">
            <InfoIcon />
            <p>{{ $cms.textField(data.info) }}</p>
          </div>
          <div class="socialicons" v-if="url">
            <transition v-for="(item, i) in socials" :key="i">
              <ShareNetwork
                class="social"
                :network="item.name"
                :url="url"
                :title="$cms.textField(data.video_title)"
                :description="desc"
                hashtags="#nice, #good"
                :quote="`${$cms.textField(data.video_title)} – ${desc}`"
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
      </div>
    </div>
  </div>
</template>

<script>
import iconFacebook from "./iconFacebook";
import iconTwitter from "./iconTwitter";
import iconWhatsapp from "./iconWhatsapp";
import InfoIcon from "./InfoIcon.vue";
import iconCopyLink from "./iconCopyLink";

export default {
  name: "VideoPopup",
  components: {
    iconFacebook,
    iconTwitter,
    iconWhatsapp,
    InfoIcon,
    iconCopyLink
  },
  data() {
    return {
      url: null,
      showX: false,
      showCopiedMsg: false,
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
  props: {
    desc: {
      type: String, //default for now
    },
    data: {
      type: Object,
      default: null,
    },
  },
  computed: {
    // player() {
    //   return this.$refs.youtube.player
    // },
    width() {
      return window.innerWidth / 1.5;
    },
    height() {
      return window.innerHeight / 1.5;
    },
  },
  watch: {},
  methods: {
    closeVid() {
      this.$emit("closeVid", true);
        if (this.$store.state.activePiece.i === 7) {
          this.$store.commit("donePuzzle", true);
        }
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
    watchEndVideo() {
      // this.player.loadVideoById('video');
      // this.player.loadVideoByUrl(this.data.video.url);
      // this.player.addEventListener("onStateChange", () => {
      //   this.showX = true;
      // })
      this.$refs.video.addEventListener("ended", () => {
        this.showX = true;
      });
    },
    updateFbMetaTags() {
      //Set default FB meta tag Title
      document
        .querySelector('meta[name="fbtitle"]')
        .setAttribute("content", this.$cms.textField(this.data.video_title));
      //Set default FB meta tag Description
      document
        .querySelector('meta[name="fbdescription"]')
        .setAttribute("content", this.$cms.textField(this.data.info));
      //Set default FB meta tag Image
      document
        .querySelector('meta[name="fbimage"]')
        .setAttribute("content", this.data.vid_preview_image.url);
      document
        .querySelector('meta[name="fburl"]')
        .setAttribute("content", this.url);
    },
  },
  mounted() {
    // console.log(this.$store.state.activePiece.i);
    // Will have to change later, if this url changes
    this.url = `https://corinecolors.github.io/#/video/${
      this.data.video.name.split(".")[0]
    }`;
    // console.log("Popp Video data ", this.data);
    this.updateFbMetaTags();
    this.watchEndVideo();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon {
  width: 40px;
}
.social {
  display: inline-block;
  padding: 0 5px;
}
#video {
  width: 800px;
  height: 500px;
}
.videopopup-inner {
  // position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translateX(-50%);
  text-align: center;
  padding: 40px 0;
  margin: auto;
  // position: absolute;
  // left: 50%;
}
.videopopup {
  text-align: center;
  width: 100%;
  overflow: scroll;
  height: 100%;
}
h2 {
  color: white;
  // margin-top: 0;
}
.close {
  color: white;
  font-size: 40px;
  position: fixed;
  right: 25%;
  top: 50px;
  cursor: pointer;
}
p {
  color: white;
}
.info {
  position: relative;
  width: 50%;
  margin: auto;
  vertical-align: middle;
  display: inline-block;
  text-align: left;
  p {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 50px);
    margin-top: 15px;
  }
  .infoIcon {
    padding: 10px;
    vertical-align: top;
    display: inline-block;
  }
}
.inner {
}
.bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: black;
  opacity: 0.75;
}
.infobar {
  // text-align: right;
  width: calc(100vw / 1.5);
  margin: auto;
}
.socialicons {
  vertical-align: top;
  display: inline-block;
  text-align: right;
  margin-left: auto;
  width: 50%;
}
.infobar {
  padding-top: 20px;
}
.copy {
  text-align: right;
  color: white;
  margin-top: 10px;
  position: relative;
  display: inline-block;
  width: auto;
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
</style>
