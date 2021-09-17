<template>
  <div class="nav">
      <div :class="`navdrawer navOpen ${showNav ? `show` : `hide`}`">
          <ul class="navOpen">
              <li class="navOpen"><a class="navOpen" href="/" target="_blank">Home</a></li>
              <!-- href="/about-this-platform" -->
              <li class="navOpen"><a class="navOpen" @click="drawer(`aboutplatform`)">About This Platform</a></li>
              <!-- href="/about-the-creators" -->
              <li class="navOpen"><a class="navOpen" @click="drawer(`aboutcreators`)">About The Creators</a></li>
              <li class="navOpen"><a class="navOpen" @click="drawer(`credits`)">Credits</a></li>

          </ul>
    <FooterItem ref="footer" class="section FooterItem" />

      </div>
      <img 
      v-if="!showNav"
      :class="`hamburger navOpen ${showNav ? `openHamburger` : `closedHamburger`}`" 
      @click.prevent="handleNav" 
      src="../assets/Hamburger.svg" />
      <img 
      v-if="showNav"
      :class="`hamburger navOpen ${showNav ? `openHamburger` : `closedHamburger`}`" 
      @click.prevent="handleNav" 
      src="../assets/X.svg" />
      <transition appear name="slidein">
        <div :key="`${data}i`" class="sideDrawer" v-if="data && (aboutplatformopen || aboutcreatorsopen || creditsopen)" :style="`background-image: url(${data.bg})`">
            <img 
            class="x-inner"
            @click.prevent="closeSideBar" 
            src="../assets/X.svg" />
            <div class="inner">
                <h2>{{data.title}}</h2>
                <img class="logo" src="../assets/CCLockup.png" v-if="aboutcreatorsopen"/>
                <div class="overlay" :style="`background: ${data.overlay}`"/>
                <div :class="data.className" v-html="$cms.htmlField(data.content.text)"/>
            </div>
        </div>
      </transition>

  </div>
</template>

<script>
import FooterItem from "../components/FooterItem.vue";

export default {
  name: "Nav",
  components: {
    FooterItem
  },
  data() {
    return {
        showNav: false,
        aboutplatformopen: false,
        aboutcreatorsopen: false,
        creditsopen: false,
        data: null
    };
  },
  props: {},
  watch: {},
  methods: {
      handleNav() {
        this.showNav = !this.showNav;
        if (!this.showNav) {
            this.aboutcreatorsopen = false;
            this.creditsopen = false;
            this.aboutplatformopen = false;
        }
      },
      closeSideBar() {
        this.showNav = true;
        this.aboutcreatorsopen = false;
        this.creditsopen = false;
        this.aboutplatformopen = false;
      },
      drawer(what) {
        //   this.showNav = false;
        
          if (what === "aboutplatform") {
              this.aboutcreatorsopen = false;
              this.creditsopen = false;
              this.aboutplatformopen = true;
              this.data = {
                  content: this.$aboutplatform, 
                  bg: this.$aboutplatform.bg.url, 
                  overlay: this.$cms.textField(this.$aboutplatform.overlaycolor),
                  className: "sansserif",
                  title: "About This Platform"
                };
          } else if (what === "aboutcreators") {
              this.aboutplatformopen = false;
              this.creditsopen = false;
              this.aboutcreatorsopen = true;
              this.data = {
                  content: this.$aboutcreators, 
                  bg: this.$aboutcreators.bg.url, 
                  overlay: this.$cms.textField(this.$aboutcreators.overlaycolor),
                  className: "sansserif",
                  title: "About The Creators"
                };
          } else {
              this.aboutcreatorsopen = false;
              this.aboutplatformopen = false;
              this.creditsopen = true;
              this.data = {
                  content: this.$credits, 
                  bg: this.$credits.bg.url, 
                  overlay: this.$cms.textField(this.$credits.overlaycolor),
                  className: "",
                  title: "Credits"
                };
          }
      }
  },
  mounted() {
      window.addEventListener("mousedown", e => {
          if (Array.from(e.target.classList).indexOf("navOpen") < 0) {
              this.showNav = false;
          }
      })
          console.log(this.$aboutcreators)

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../main.scss";
.logo {
    width: 100%;
    padding: 30px 0;
}
.nav {
    height: 0;
    overflow: visible;
    position: fixed;
    z-index: 1000;
}
.hamburger {
    position: fixed;
    background: rgb(0,0,0,0.5);
    width: 40px;
    top: 0;
    right: 0;
    padding: 20px;
    transition: opacity .5s ease;
    cursor: pointer;
    opacity: .25;
    &:hover {
        transition: opacity .5s ease;
        opacity: 1;
    }
}
.navdrawer {
    padding: 80px 20px;
    position: fixed;
    width: calc(25% - 40px);
    height: calc(100% - 160px);
    right: 0;
    top: 0;
    transition: right .5s ease;
    // background: $maroon;
    background: rgb(200,200,200,.6);
    color: white;
    ul, a, li {
        text-decoration: none;
        list-style: none;
        color: black;
        font-weight: bold;
        font-size: 20px;
    }
    li {
        margin: 20px 0;
    }
    a, li {
        cursor: pointer;
    }
}
.hide {
    right: -25%;
    transition: right .5s ease;
}
.openHamburger {
    opacity: 1;
}
.sideDrawer {
    margin-bottom: 60px;
    top: 0;
    z-index: 100;
    left: 0;
    position: fixed;
    // background: rgba(0, 0, 0, 0.6);
    height: 100vh;
    width: 360px;
    overflow-y: scroll;
    overflow-x: hidden;
    &::v-deep p {
        color: white;
        font-size: 16px;
        text-align: justify;
        text-justify: inter-word;
    }
    &::v-deep h5, &::v-deep h3 {
        font-size: 16px;
        margin-bottom: 10px;
        text-align: left !important;
        color: white !important;
    }
}
.overlay {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: .7;
    width: 360px;
}
.slidein-enter, .slidein-leave-to {
    transition: transform .5s ease;
    transform: translateX(-100%);
}
.slidein-enter-to, .slidein-leave {
    transition: transform .5s ease;
    transform: translateX(0);
}
.inner {
    padding: 30px;
    padding-top: 60px;
}
.x-inner {
    position: absolute;
    right: 0;
    width: 30px;
    padding: 20px;
    cursor: pointer;
}
h2 {
    color: white;
    position: relative;
    display: inline-block;
    &:after {
        content: '';
        background: white;
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 2px;
    }
}
</style>
