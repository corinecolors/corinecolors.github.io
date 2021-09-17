<template>
  <div class="footer navOpen">
    <SocialsSharing/>

    <div class="newsletter">
      <form @submit.prevent="submit"  ref="form">
        <h3 class="navOpen">Subscribe to follow the story!</h3>
        <input class="navOpen" type="text" ref="newsletter" placeholder="Email address"/>
        <div :style="`color: ${submissionMessage.color};`" class="copiedMsg navOpen" v-if="submissionMessage">{{submissionMessage.msg}}</div>
      </form>
    </div>
    <!-- <div class="socials navOpen">
    <div class="copiedMsg navOpen" v-if="showCopiedMsg">
      Link copied to clipboard!
      </div>
      <div class="share navOpen">
        <h3 class="navOpen">Share</h3>
        </div>
       <transition v-for="(item, i) in socials" :key="i">
            <ShareNetwork
            class="social navOpen"
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
        
        <button @click="copytoclipboard" class="copy">
            <iconCopyLink class="iconCopyLink navOpen"/>
            <input type="text" class="url" ref="url" :value="url" />
          </button>
    </div> -->
  </div>
</template>

<script>

// import SocialsLinking from "./SocialsLinking";
import SocialsSharing from "./SocialsSharing";

// import iconWhatsapp from "./iconWhatsapp";
// import iconInstagram from "./iconInstagram";
// import iconFacebook from "./iconFacebook";
// import iconTwitter from "./iconTwitter";
// import iconCopyLink from "./iconCopyLink";
export default {
  name: "Footer",
  components: {
    SocialsSharing,
    // iconWhatsapp,
    // iconInstagram,
    // iconFacebook,
    // iconTwitter,
    // iconCopyLink
  },
  data() {
    return {
      showCopiedMsg: false,
      url: "",
      title: "The First Lady",
      desc: "description text blah blah blah",
      submissionMessage: null,
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
      pagesocials: [
        {
          name: "facebook",
          component: "iconFacebook",
          link: "https://www.facebook.com/C.Colors.In.Motion/"
        },
        {
          name: "twitter",
          component: "iconTwitter",
          link: "https://twitter.com/ccolorsinmotion"
        },
        {
          name: "instagram",
          component: "iconInstagram",
          link: "https://www.instagram.com/corine.colors"
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
      console.log("actio of submitting to newsletter goes here");
      this.$refs.form.reset();
      this.submissionMessage = {
        color: "green",
        msg: `Successfully submitted.`
      };
      setTimeout(() => {
        this.submissionMessage = null;
      }, 3000)
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
    if (!window.location.href.includes("localhost")) {
      this.url = window.location.href;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../main.scss";
.icon {
  width: 25px;
  vertical-align: middle;
  display: inline-block;
  padding: 5px;
}
.footer {
  text-align: left;
  position: absolute;
  bottom: 40px;
  left: 0;
  width: calc(100% - 40px);
  padding-left: 40px;
  // margin-right: 25px;
  // opacity: .35;
  transition: opacity .5s ease;
  &:hover {
  transition: opacity .5s ease;
    opacity: 1;
  }
}
.pagesocial {
  padding: 5px;
  width: 25px;
  &::v-deep svg  {
    fill: black !important;
  }
}
.instagram {
  vertical-align: middle;
  // display: inline-block;
  cursor: pointer;
}
.social {
  display: inline-block;
  &::v-deep svg g path {
    fill: black !important;
    pointer-events: none;
  }
  &::v-deep svg g .st0 {
    fill: white !important;
  }
 
}
// .social, .copy {
//   &::v-deep svg {
//   -webkit-box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5); 
//   box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.5);
//   }
// }
.copy {
  text-align: right;
  color: black;
  // margin-top: 10px;
  position: relative;
  vertical-align: top;
  display: inline-block;
  width: auto;
}
.url {
  position: absolute;
  opacity: 0;
}
.copiedMsg {
  padding: 10px;
  color: black;
  position: absolute;
  left: 50%;
  bottom: -20px;
  width: 100%;
  font-size: 10px;
  transform: translateX(-50%);
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
   &::v-deep svg {
    background: black;
    border-radius: 4px;
  }
}
 h3 {
    color: black;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 100;
  }
.newsletter {
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  width: 90%;
  margin-bottom: 20px;
 
  input {
    background: $maroon;
    color: white;
    &::-webkit-input-placeholder {
      color: lightgrey;
    }
    &:focus {
      outline: none;
    }
    border-style: none;
    height: 30px;
    border-radius: 10px;
    // width: 300px;
    width: calc(100% - 20px);
    // margin-bottom: 30px;
    padding: 0 10px;
    margin-right: 30px;
    // text-align: center;
    font-size: 16px;
  }
}
.socials {
  display: inline-block;
  width: calc(100% - 60px);
  margin-bottom: 20px;
   &::v-deep svg {
    background: white;
    border-radius: 4px;
    pointer-events: none;
  }
  .copy {
      &::v-deep .cls-1 {
      fill: black;
    }
  }
}
.fin {
  .socials,.newsletters {
    display: block;
  }
  .newsletter input {
      margin-right: 0;
    }
    bottom: 100px;
    z-index: 100;
    opacity: 1;
}
form {
  position:relative;
  padding-bottom: 5px;
  background: rgb(255,255,255,0.8);
  border-radius: 10px;
  display: inline-block;
  padding: 10px;
  width: calc(100% - 25px);
}
</style>
