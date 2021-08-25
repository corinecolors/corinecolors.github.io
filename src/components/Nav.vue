<template>
  <div class="nav">
      <div :class="`navdrawer ${showNav ? `show` : `hide`}`">
          <ul>
              <li><a target="_blank" href="/">Home</a></li>
          </ul>
      </div>
      <!-- <img 
      :class="`hamburger ${showNav ? `openHamburger` : `closedHamburger`}`" 
      @click.prevent="showNav = !showNav" 
      src="../assets/HouseIcon.svg" /> -->
      <a href="/" target="_blank">
     <img 
      class="hamburger" 
      src="../assets/HouseIcon.svg" />
      </a>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
        showNav: false
    };
  },
  props: {},
  watch: {},
  methods: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
    padding: 100px 20px;
    position: fixed;
    width: calc(25% - 40px);
    height: 100%;
    right: 0;
    top: 0;
    transition: right .5s ease;
    background: rgba(255, 255, 255, 0.5);
    color: white;
    ul, a, li {
        text-decoration: none;
        list-style: none;
        color: rgb(63, 35, 62);
        font-weight: bold;
        font-size: 40px;
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
