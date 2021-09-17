<template>
     <div class="socials navOpen">
      <div class="share navOpen">
        <h3>Share The Story</h3>
        </div>
       <transition v-for="(item, i) in pagesocials" :key="i">
            <div class="social navOpen"><a target="_blank" :href="item.link"><component :is="item.component" class="pagesocial"/></a></div>
        </transition>
        <!-- <button @click="copytoclipboard" class="copy">
            <iconCopyLink class="iconCopyLink navOpen"/>
            <input type="text" class="url" ref="url" :value="url" />
          </button>
          <div class="copiedMsg navOpen" v-if="showCopiedMsg">
            Link copied to clipboard!
          </div> -->
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
    // if (!window.location.href.includes("localhost")) {
    //   this.url = window.location.href;
    // }
    this.url = "http://www.the-firstlady.com/";
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
  text-align: center;
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  // margin-right: 25px;
  // opacity: .35;
  transition: opacity .5s ease;
  &:hover {
  transition: opacity .5s ease;
    opacity: 1;
  }
  width: 100%;
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
  pointer-events: none;
}
.copiedMsg {
  padding: 10px;
  color: black;
  position: absolute;
  width: 100px;
  right: 0;
  font-size: 12px;
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
  text-align: center;
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
  // width: 100%;
  position: relative;
  background: rgb(255,255,255,0.8);
  border-radius: 10px;
  display: inline-block;
  padding: 10px;
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
}
</style>
