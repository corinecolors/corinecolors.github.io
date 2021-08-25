<template>
  <div class="footer">
    <div class="newsletter">
      <form @submit.prevent="submit">
        <!-- <h3>Subscribe to the newsletter!</h3> -->
        <input type="text" ref="newsletter" placeholder="Sign up for the newsletter!"/>
      </form>
    </div>
    <div class="socials">
    <div class="copiedMsg" v-if="showCopiedMsg">
      Link copied to clipboard!
      </div>
       <transition v-for="(item, i) in socials" :key="i">
            <ShareNetwork
            class="social"
            :network="item.name"
            :url="url"
            :title="title"
            :description="desc"
            hashtags="#nice, #good"
            :quote="`${title} – ${desc}`"
            :fill="`white`"
            >
            <component class="icon" :is="item.component" :fill="`#FFFFFF`"/>
            </ShareNetwork>
        </transition>
        <div class="instagram"><a target="_blank" href="http://www.instagram.com"><iconInstagram class="ig"/></a></div>
        <button @click="copytoclipboard" class="copy">
            <iconCopyLink class="iconCopyLink"/>
            <input type="text" class="url" ref="url" :value="url" />
          </button>
    </div>
  </div>
</template>

<script>
import iconFacebook from "./iconFacebook";
import iconTwitter from "./iconTwitter";
import iconWhatsapp from "./iconWhatsapp";
import iconInstagram from "./iconInstagram";
import InfoIcon from "./InfoIcon.vue";
import iconCopyLink from "./iconCopyLink";
export default {
  name: "Footer",
  components: {
    iconFacebook,
    iconTwitter,
    iconWhatsapp,
    InfoIcon,
    iconCopyLink,
    iconInstagram
  },
  data() {
    return {
      showCopiedMsg: false,
      url: "https://corinecolors.github.io/#/",
      title: "The First Lady",
      desc: "description text blah blah blah",
        socials: [
        {
          name: "facebook",
          component: "iconFacebook",
          link: "http://www.facebook.com"
        },
        {
          name: "twitter",
          component: "iconTwitter",
          link: "http://www.twitter.com"
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
    handleClick(link) {
      window.open(link);
    },
    submit() {
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
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.icon {
  width: 25px;
  vertical-align: middle;
  display: inline-block;
  padding: 5px;
}
.footer {
  text-align: center;
  // margin-right: 25px;
  opacity: .35;
  transition: opacity .5s ease;
  &:hover {
  transition: opacity .5s ease;
    opacity: 1;
  }
  width: 100%;
}
.ig {
  padding: 5px;
  width: 25px;
  &::v-deep svg  {
    fill: white !important;
  }
}
.instagram {
  vertical-align: middle;
  display: inline-block;
  cursor: pointer;
}
.social {
  &::v-deep svg g path {
    fill: white !important;
  }
  &::v-deep svg g .st0 {
    fill: black !important;
  }
}
.copy {
  text-align: right;
  color: white;
  margin-top: 10px;
  position: relative;
  vertical-align: middle;
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
  position: absolute;
  right: 0;
  bottom: 0;
}
button {
  padding: 0;
  border: none;
}
.iconCopyLink {
  width: 25px;
  vertical-align: middle;
  display: inline-block;
  padding: 5px;
  width: 25px;
}
.newsletter {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  h3 {
    color: white;
    margin-bottom: 10px;
  }
  input {
    &:focus {
      outline: none;
    }
    border-style: none;
    height: 30px;
    border-radius: 10px;
    width: 300px;
    // margin-bottom: 30px;
    padding: 0 10px;
    margin-right: 30px;
    // text-align: center;
    font-size: 16px;
  }
}
.socials {
  display: inline-block;
}
</style>
