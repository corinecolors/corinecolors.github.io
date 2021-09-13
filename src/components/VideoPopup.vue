<template>
  <div class="videopopup">
    <div class="inner">
      <div class="close" v-if="showX" @click="closeVid">X</div>
      <div class="videopopup-inner">
        <h2>{{ $cms.textField(data.video_title) }}</h2>
        <video class="vid" controls controlsList="nodownload" oncontextmenu="return false;" ref="video" id="video">
          <source :src="blobVideo(data.video.url)" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
       <!-- <canvas class="vid" id="video" ref="video"/> -->
        <div class="infobar">
          <!-- <div class="info">
            <InfoIcon />
            <p>{{ $cms.textField(data.info) }}</p>
          </div> -->
          <div class="socialicons" v-if="url">
            <transition v-for="(item, i) in socials" :key="i">
                <span @mouseover="handleShareNetwork(item)">
                <ShareNetwork
                  class="social"
                  :network="item.name"
                  :url="url"
                  :title="title"
                  :description="desc"
                  hashtags="#nice, #good"
                  :ref="item.name"
                  :quote="`${$cms.textField(data.video_title)} – ${desc}`"
                >
                  <component 
                  class="icon" 
                  :is="item.component" />
                </ShareNetwork>
                </span>
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
      desc: `In the decade following the August 4, 2020 Port of Beirut Explosion, the Police State which Lebanon has become, intensified its crackdown on opposition and freedom of expression. The impoverished Lebanese people have become scarred and betrayed prisoners, being killed by their establishment. Refusing to stand idle, the First Lady jumps ship and becomes a dissident from the inside of the ruling class. This platform is a gateway into the mind of the woman who will startle the deep-state and set it off its domineering streak.`,
      title: this.$cms.textField(this.data.video_title),
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
    data: {
      type: Object,
      default: null,
    },
  },
  beforeCreate() {
    this.$store.commit('screens', {what: "Toolbar", bool: false});
  },
  beforeDestroy() {
    this.$store.commit('screens', {what: "Toolbar", bool: true});
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
    handleShareNetwork(item) {
      if (item.name === "twitter") {
        this.title = `${this.$cms.textField(this.data.video_title)}
In the decade following the August 4, 2020 Port of Beirut Explosion, the Police State which Lebanon has become, intensified its crackdown on opposition and freedom of expression...`;
      } else {
        this.title = this.$cms.textField(this.data.video_title);
      }
    },
    closeVid() {
      // console.log("closing vie on 7");
      this.$emit("closeVid", true);
        // if (this.$store.state.activePiece.i === 8) {
        //   this.$store.commit("donePuzzle", true);
        // }
        // if (this.$store.state.activePiece.i === 8) {
        //   this.$store.commit("donePuzzle", true);
        // }
    },
    blobVideo(url) {
      // var file = new Blob([url], {"type" : "video/mp4"});
      // return URL.createObjectURL(file);
      return url;

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
    // loadVid() {
    //   var canvas = this.$refs.video;
    //   var ctx = canvas.getContext('2d');
    // }
  },
  mounted() {
    // console.log(this.$store.state.activePiece.i);
    // Will have to change later, if this url changes
    
    // this.url = `https://corinecolors.github.io/video/${
    //   this.data.video.name.split(".")[0]
    // }`;
    this.url = `https://corinecolors.github.io/#video_${
      this.data.video.name.split(".")[0]
    }`;
    // console.log("Popp Video data ", this.data);
    this.updateFbMetaTags();
    this.watchEndVideo();
     this.$store.commit("tool", {
          src: '',
          digType: "",
        })
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
  // pointer-events: none;
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
  background: rgb(0,0,0,.75);
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
  // text-align: right;
  text-align: center;

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
  &:hover {
    transition: background .5s ease, color .5s ease;
    background: none;
    color: none;
  }
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
