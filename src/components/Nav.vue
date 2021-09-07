<template>
  <div class="nav">
      <div :class="`navdrawer navOpen ${showNav ? `show` : `hide`}`">
          <ul>
              <li><a class="navOpen" target="_blank" href="/">Home</a></li>
          </ul>
    <FooterItem ref="footer" class="section FooterItem" />

      </div>
      <img 
      :class="`hamburger navOpen ${showNav ? `openHamburger` : `closedHamburger`}`" 
      @click.prevent="showNav = !showNav" 
      src="../assets/Hamburger.svg" />
      <!-- <a href="/" target="_blank">
     <img 
      class="hamburger" 
      src="../assets/Hamburger.svg" />
      </a> -->
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
        showNav: false
    };
  },
  props: {},
  watch: {},
  methods: {},
  mounted() {
      window.addEventListener("mousedown", e => {
          if (Array.from(e.target.classList).indexOf("navOpen") < 0) {
              this.showNav = false;
          }
      })
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../main.scss";

.nav {
    height: 0;
    overflow: visible;
    position: fixed;
    z-index: 100;
}
.hamburger {
    position: fixed;
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
    background: $maroon;
    color: white;
    ul, a, li {
        text-decoration: none;
        list-style: none;
        color: white;
        font-weight: bold;
        font-size: 20px;
    }
}
.hide {
    right: -25%;
    transition: right .5s ease;
}
.openHamburger {
    opacity: 1;
}
</style>
