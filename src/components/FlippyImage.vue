<template>
  <div class="flippy">
    <div
      class="imagewrap"
      :id="`imagewrap-${i}`"
      v-for="(item, i) in sections"
      :key="i"
      :style="getHeight()"
      @mouseover.prevent="warp(i)"
      @mouseleave="removeWarp(i)"
    >
      <!--  -->
      <img :src="image" :style="getPos(i)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FlippyImage",
  data() {
    return {
      sections: 20,
      sectionHeight: 0,
      image:
        "https://i.pinimg.com/564x/d7/f4/50/d7f4501dca2c4b61e1e34deb28394c0e.jpg",
    };
  },
  methods: {
    getHeight() {
      return `height: ${this.sectionHeight}px;`;
    },
    getPos(i) {
      return `top: -${this.sectionHeight * i}px; transform-origin: center ${
        this.sectionHeight * (i * 1.13)
      }px`;
    },
    mouse() {
      window.addEventListener("mousemove", (e) => {
        console.log(e.clientY, e.clientX);
      });
    },
    warp(i) {
      document.getElementById(
        `imagewrap-${Math.floor(i)}`
      ).children[0].className += "warp";
      document.getElementById(
        `imagewrap-${Math.floor(i + 1)}`
      ).children[0].className += "warp_partial";
      document.getElementById(
        `imagewrap-${Math.floor(i - 1)}`
      ).children[0].className += "warp_partial";
    },
    removeWarp(i) {
      setTimeout(() => {
        document.getElementById(
          `imagewrap-${Math.floor(i)}`
        ).children[0].className = "";
        document.getElementById(
          `imagewrap-${Math.floor(i + 1)}`
        ).children[0].className = "";
        document.getElementById(
          `imagewrap-${Math.floor(i - 1)}`
        ).children[0].className = "";
      }, 250);
    },
  },
  mounted() {
    this.sectionHeight = window.innerHeight / this.sections;
    //  this.mouse();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.flippy {
  height: 100vh;
}
img {
  position: absolute;
  height: 100vh;
  left: 0;
  width: 100%;
  left: 50%;
  transform: scaleY(1) translateX(-50%);
  transition: transform 1s ease-in-out;
}
.imagewrap {
  overflow: hidden;
  position: relative;
}
.warp {
  /* height: 50vh; */
  transform: scaleY(0.25) translateX(-50%);
  transition: transform 0.25s ease;
}
.warp_partial {
  transform: scaleY(0.35) translateX(-50%);
  transition: transform 0.5s ease-in-out;
}
</style>
