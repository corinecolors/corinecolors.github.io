<template>
  <div class="digging" ref="digging" @mouseout="mouseout">
    <transition appear name="section">
    <div class="lightboximage" v-if="lightboxImage && showlightboxImage" >
      <div class="lightboximage-inner">
        <div class="lightboximageinner" >
          <h3 class="text" v-if="showPreviewText">{{
            $cms.textField(data.data.puzzle_preview_message)
          }}</h3>
          <span @mousedown="handlePlayButton" @mouseover="handleHover" @mouseout="handleOutHover"  class="play">
            <Playbutton
              :fill="$cms.textField(this.data.data.playbuttom_color)"
              :style="`${
                Asolved ? `opacity: .75; cursor: pointer;` : ``
              }`"
              
            />
            <!-- <img class="glow" v-if="activei === i && Asolved" src="../assets/debris/Glow.svg"/> -->
            <img class="glow" v-if="activei === i && AAsolved" src="../assets/debris/Glow.svg"/>
            <!-- <div class="tooltip" v-if="activei === i && Asolved">Click to play</div> -->
          </span>
          <img :src="lightboxImage" @mousedown="handleChangingImages"/>
        </div>
        <div class="info"><p>{{$cms.textField(data.data.info)}}</p></div>
        <div class="x" v-if="Asolved" @click="closeLightbox">X</div>
      </div>
    </div>
    </transition>
    <div class="previewtext">
      <h3 class="text" v-if="showPreviewText">{{
        $cms.textField(data.data.puzzle_preview_message)
      }}</h3>
      <p class="questionmark" v-else><img :src="imgSrc(data.i)"/></p>
    </div>
    <canvas
      v-if="data.data.c.url"
      :id="`canvas${data.i}C`"
      class="c"
      :style="`${Csolved ? `opacity: 1;` : ``}`"
    />
    <canvas
      @mousedown="handleLightbox"
      @click.prevent="handleLightbox"
      :id="`canvas${data.i}B`"
      class="b"
      :style="`${Bsolved ? `opacity: 0; pointer-events: none;` : ``}`"
    />
    <canvas
      :id="`canvas${data.i}A`"
      ref="a"
      class="a"
      :style="`${Asolved ? `opacity: 0; pointer-events: none;` : ``}`"
    />
    <div class="lightbox" @click="handleLightbox" 
    :style="!Asolved && !AAsolved && activei === i ? `pointer-events: none` : `pointer-events: auto`">
      <img class="mg" src="../assets/magnifying_icon.svg"/>
      <img class="glow" v-if="showGlow && activei === i && AAsolved" src="../assets/debris/Glow.svg"/>
      </div>
    <!-- <div class="playbutton" :style="`${Asolved ? `opacity: 1; cursor: pointer;` : `pointer-events: none`}`" @click="handlePlayButton"></div> -->
 
    <canvas
      :id="`canvas${data.i}AA`"
      class="aa"
      ref="aa"
      :style="`${AAsolved  ? `opacity: 0; pointer-events: none;` : ``}`"
    />
  </div>
</template>

<script>
import Playbutton from "./Playbutton.vue";
// import InfoIcon from "./InfoIcon.vue";

import { mapState } from "vuex";
export default {
  name: "Digging",
  data() {
    return {
      width: 0,
      height: 0,
      whArray: [],
      activeWhArray: null,
      range: 40,
      AAsolved: false,
      Asolved: false,
      Bsolved: false,
      Csolved: false,
      isPress: false,
      ctx: null,
      old: null,
      showBlurb: false,
      active: null,
      Aprohibited: true,
      showPreviewText: false,
      Aoffset: 1000,
      AAoffset: 15,
      etch: "Etch",
      reveal: "Reveal",
      imgA: null,
      imgB: null,
      lightboxImage: null,
      showlightboxImage: false,
      playButtonNoClick: false,
      preventPopup: false

    };
  },
  computed: {
    ...mapState(["tool", "mouse"]),
  },
  components: {
    Playbutton,
    // InfoIcon
  },
  props: {
    data: {
      type: Object,
      default: null,
    },
    image: {
      type: String,
      default:
        "https://cloud.githubusercontent.com/assets/4652816/12771961/5341c3c4-ca68-11e5-844c-f659831d9c00.jpg",
    },
    activei: {
      type: Number,
      default: 0,
    },
    i: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    tool() {
      this.handlePlayButtonUnclickable();
    },
    // Bsolved() {
    //   if (this.Bsolved) {
    //     this.$store.commit("tool", {
    //       src: '',
    //       digType: "",
    //     });
    //   }
    // },
    AAsolved() {
      if (this.AAsolved && this.activei === this.i) {
        this.lightboxImage = this.imgA;
        //Remove previous mouse listeners
        this.$store.commit('AAsolved', true);

        this.active.removeEventListener("mousedown", this.mousedown);
        this.active.removeEventListener("mousemove", this.mousemove);
        this.active.removeEventListener("mouseup", this.mouseup);
        //update the active canvas
        this.active = document.getElementById(`canvas${this.data.i}A`);
        //re-introduce moue listener to the new active canvas
        this.$store.commit("mouse", {mouseevent: "mouseup", e: "none"});
        this.mouseEvents();
      }
      if (!this.preventPopup) this.handleLightbox();
     
    },
    Asolved() {
      if (this.Asolved && this.activei === this.i) {
        this.lightboxImage = this.imgB;
        this.playButtonNoClick = false;
        // if (!this.imgC) {
        //   this.$store.commit("tool", {
        //     src: '',
        //     digType: "",
        //   });
        // }
        this.active.removeEventListener("mousedown", this.mousedown);
        this.active.removeEventListener("mousemove", this.mousemove);
        this.active.removeEventListener("mouseup", this.mouseup);
        this.$store.commit("isDigging", false);
        // this.$store.commit("mouse", {mouseevent: "mouseup", e: "none"});
        if (this.data.data.c.url) {
          this.active = document.getElementById(`canvas${this.data.i}B`);
          // this.$store.commit("mouse", {mouseevent: "mouseup", e: "none"});
          this.mouseEvents();
        }
      }
    },
  },
  methods: {
    handleMouseDown() {

  //  this.handlePlayButtonUnclickable();
  //     console.log(this.tool.digType);
  //     if 
  //     (((this.tool.digType === "Etch" && !this.AAsolved  || 
  //     this.AAsolved && this.tool.digType === "Reveal") 
  //     && this.activei === this.i) ||  (this.activei > this.i))
  //     {
  //       this.tool.digType = this.$store.state.tool.digType;
  //       this.showPreviewText = true;
  //       this.$refs.digging.style = "pointer-events: auto";
  //       document.getElementById(`canvas${this.data.i}A`).style="pointer-events: auto";

  //     } else {
  //       if (!document.getElementById(`canvas${this.data.i}A`).style.toString().includes("pointer-events: none;")) document.getElementById(`canvas${this.data.i}A`).style="pointer-events: none;";
  //       // { emit nudge move }
  //     }

      if (this.tool.digType === "Etch") {
        this.showPreviewText = true;
      }
    },
    closeLightbox() {
      this.showlightboxImage = false;
        if (this.$store.state.activePiece.i === 8) {
          this.$store.commit("donePuzzle", true);
        }
      this.$store.commit("hideBack", false);
      this.$store.commit("puzzleScreenOpen", false);
      this.$store.commit("tool", {
          src: '',
          digType: "",
        });
        this.$store.commit("AAsolved", false);
    },
    handleChangingImages(e) {
      this.$store.commit("mouse", {mouseevent: "mousedown", e: e});
      if (this.tool.digType !== "Reveal") {
        return;
      }
      if (this.lightboxImage === this.imgA) {
        this.lightboxImage = this.imgB;
        this.Asolved = true;
        this.$store.commit("pressPlayMessage", true);
      }
      else if (this.lightboxImage === this.imgB && this.imgC) {
        this.lightboxImage = this.imgC;
      } else {
        this.lightboxImage = this.imgA;
      }
    },
    handleLightbox() {
      // console.log(this.lightboxImage);
      // if (this.activei !== this.i) {
      //   return;
      // }
      if (this.tool.digType === "Etch" && this.activei !== this.i) {
        return;
      }
      this.$store.commit("hideBack", true);
      this.$store.commit("puzzleScreenOpen", true);
      this.showlightboxImage = true;
    },
    handleHover() {
      if (!this.Asolved) {
        this.$store.commit("digMoreMessage", "Use Light tool to reveal Invisible Ink");
      } else{
        this.$store.commit("digMoreMessage", "Click to play");
      }
    //catch-all in case the mouseout is not senses
      setTimeout(() => {
          this.$store.commit("digMoreMessage", null);
        }, 3000)
    },
    handleOutHover() {
      if (!this.Asolved) {
        this.$store.commit("digMoreMessage", null);
      } else if (this.AAsolved) {
        this.$store.commit("digMoreMessage", null);
      } 
    },
    imgSrc(i) {
      return require(`../assets/QuestionMarks/qm${i + 1}.png`)
    },
    handlePlayButton() {
      if (this.Asolved) {
        this.$emit("solved", this.data);
      }
    },
    setArray(e) {
      this.whArray = [];
      for (let w = 0; w < e.width; w += this.range * 2) {
        for (let h = 0; h < e.height; h += this.range * 2) {
          this.whArray.push(`w:${w},h:${h}`);
        }
      }
    },
    calcArray(old) {
      var xRounded = Math.floor(old.x / this.range) * this.range;
      var yRounded = Math.floor(old.y / this.range) * this.range;
      var idx = this.whArray.indexOf(`w:${xRounded},h:${yRounded}`);
      if (idx > -1) {
        this.whArray.splice(idx, 1);
      }
      //DETERMINE IF SCRUBBED ENOUGH
      if (
        this.whArray.length < this.AAoffset &&
        this.active === document.getElementById(`canvas${this.data.i}AA`)
      ) {
        this.setArray({ width: this.width, height: this.height });
        this.AAsolved = true;
      }

      if (
        this.whArray.length < this.Aoffset &&
        this.active === document.getElementById(`canvas${this.data.i}A`)
      ) {
        this.Asolved = true;
      }

      if (
        this.whArray.length < this.Aoffset &&
        this.active === document.getElementById(`canvas${this.data.i}B`)
      ) {
        this.Bsolved = true;
      }

       if (
        this.whArray.length < this.AAoffset &&
        this.active === document.getElementById(`canvas${this.data.i}C`)
      ) {
        this.Csolved = true;
      }
    },
    dig() {
      if (this.data.data) {
        var urlA = this.data.data.a.url;
        var urlB = this.data.data.b.url;
        if (this.data.data.c.url) var urlC = this.data.data.c.url;
      } else {
        urlA = this.image;
      }

      var canvasA = document.getElementById(`canvas${this.data.i}A`);
      var canvasB = document.getElementById(`canvas${this.data.i}B`);
      var canvasAA = document.getElementById(`canvas${this.data.i}AA`);

      var ctxA = canvasA.getContext("2d");
      var ctxB = canvasB.getContext("2d");
      var ctxAA = canvasAA.getContext("2d");

      if (this.data.data.c.url) {
        var canvasC = document.getElementById(`canvas${this.data.i}C`);
        var ctxC = canvasC.getContext("2d");
        var imgC = new Image();
        imgC.src = urlC;
        this.imgC = imgC.src;
      }

      var imgA = new Image();
      var imgB = new Image();
      var imgAA = new Image();

      imgA.src = urlA;
      imgB.src = urlB;
      this.imgA = imgA.src;
      this.imgB = imgB.src;
      imgAA.src = this.data.data.cover.url;

      var A = new Promise((resolve) => {
        imgA.onload = () => {
          this.width = (window.innerHeight / 2 / imgA.height) * imgA.width;
          this.height = window.innerHeight / 2;
          canvasA.width = this.width;
          canvasA.height = this.height;
          ctxA.drawImage(imgA, 0, 0, this.width, this.height);
          this.lightboxImage = this.imgA;

          resolve({ width: this.width, height: this.height });
        };
      })
      var AA = new Promise((resolve) => {
        imgAA.onload = () => {
          // console.log(imgAA.width);
          this.width = (window.innerHeight / 2 / imgAA.height) * imgAA.width;
          this.height = window.innerHeight / 2;
          canvasAA.width = this.width;
          canvasAA.height = this.height;
          ctxAA.drawImage(imgAA, 0, 0, this.width, this.height);

          resolve({ width: this.width, height: this.height });
        };
      })
      var B = new Promise((resolve) => {
        imgB.onload = () => {
          this.width = (window.innerHeight / 2 / imgB.height) * imgB.width;
          this.height = window.innerHeight / 2;
          canvasB.width = this.width;
          canvasB.height = this.height;
          ctxB.drawImage(imgB, 0, 0, this.width, this.height);

          resolve({ width: this.width, height: this.height });
        };
      })
      

      Promise.all([A, AA, B]).then((e) => {
        // console.log("e", e);
        this.setArray(e[0]);
        this.width = e.width;
        this.height = e.height;
        this.mouseEvents();

      });

      if (this.data.data.c.url)  imgC.onload = function () {
        this.width = (window.innerHeight / 2 / imgC.height) * imgC.width;
        this.height = window.innerHeight / 2;
        canvasC.width = this.width;
        canvasC.height = this.height;
        ctxC.drawImage(imgC, 0, 0, this.width, this.height);
      };
    },
    mouseEvents() {
      this.ctx = this.active.getContext("2d");
      this.active.addEventListener("mousedown", this.mousedown);
      this.active.addEventListener("mouseup", this.mouseup);
    },
    handlePlayButtonUnclickable() {
    // When you have to light tool, don't let play button get in the way
      if (this.tool.digType === "Reveal" && this.activei === this.i) {
        this.playButtonNoClick = true;
      }
    },
    mousedown(e) {
      this.handleMouseDown();
      
      this.$store.commit("isDigging", true);
      if (this.active === document.getElementById(`canvas${this.data.i}AA`) && !this.AAsolved) {
        this.active.addEventListener("mousemove", this.mousemove);
        console.log("should not be seeing this");
      } else {
        var x = e.offsetX;
        var y = e.offsetY;
        this.ctx.globalCompositeOperation = "destination-out";

        this.ctx.beginPath();
        if (this.tool.digType) {
          this.ctx.moveTo(this.old.x, this.old.y);
          this.ctx.lineTo(x, y);
          this.ctx.stroke();

          this.old = { x: x, y: y };
          this.calcArray(this.old);
        }
      }
      
      this.isPress = true;
      this.old = { x: e.offsetX, y: e.offsetY };
        this.$store.commit("mouse", {mouseevent: "mousedown", e: e});

      
    },
    
    mouseup(e) {
      this.isPress = false;
      this.$store.commit("isDigging", false);
      this.$store.commit("mouse", {mouseevent: "mouseup", e: e});

    },
    mouseout() {
      // this.$store.commit("mouse", {mouseevent: "mouseup", e: "none"})
    },
    mousemove(e) {
      if (this.isPress) {
        this.$store.commit("mouse", {mouseevent: "mousemove", e: e});

        var x = e.offsetX;
        var y = e.offsetY;
        this.ctx.globalCompositeOperation = "destination-out";

        this.ctx.beginPath();

        // ---- Spirals
        if (this.tool.digType === "Spirals") {
          this.ctx.lineWidth = 5;
          this.ctx.arc(x, y, this.range, 0, 2 * Math.PI);
        }

        // ---- Circle
        if (this.tool.digType === "Magnify" || this.tool.digType === "Reveal") {
          this.ctx.arc(x, y, this.range, 0, 2 * Math.PI);
          this.ctx.fill();
        }

        // ---- Etch
        if (this.tool.digType === "Etch") {
          this.ctx.rect(x - 40, y - 25, 80, 50);
          this.ctx.fill();
        }

        // ---- Sponge
        if (this.tool.digType === "Sponge") {
          this.ctx.lineWidth = 30;
        }

        // ---- Snip
        if (this.tool.digType === "Snip") {
          this.ctx.moveTo(this.old.x - 30, this.old.y - 30);
          this.ctx.lineTo(x + 30, y + 30);
          this.ctx.lineWidth = 5;
          this.ctx.stroke();
        }

        // ---- Axe
        if (this.tool.digType === "Axe") {
          this.ctx.rotate(Math.PI / 5);
          this.ctx.lineWidth = 100;
        }

        // ---- Paint
        if (this.tool.digType === "Paint") {
          this.ctx.moveTo(x + 5 - 30, y + 9);
          this.ctx.lineTo(x + 5 - 30, y + 9);
          this.ctx.lineTo(x + 5 - 30, y + 9);
          this.ctx.lineTo(x + 5 - 30, y + 7);
          this.ctx.lineTo(x + 5 - 30, y + 7);
          this.ctx.lineTo(x + 5 - 30, y + 4);
          this.ctx.lineTo(x + 5 - 30, y + 4);
          this.ctx.lineTo(x + 5 - 30, y + 3);
          this.ctx.lineTo(x + 5 - 30, y + 7);
          this.ctx.lineTo(x + 6 - 30, y + 9);
          this.ctx.lineTo(x + 6 - 30, y + 11);
          this.ctx.lineTo(x + 7 - 30, y + 20);
          this.ctx.lineTo(x + 7 - 30, y + 21);
          this.ctx.lineTo(x + 11 - 30, y + 12);
          this.ctx.lineTo(x + 14 - 30, y + 5);
          this.ctx.lineTo(x + 15 - 30, y + 5);
          this.ctx.lineTo(x + 15 - 30, y + 10);
          this.ctx.lineTo(x + 15 - 30, y + 12);
          this.ctx.lineTo(x + 15 - 30, y + 14);
          this.ctx.lineTo(x + 15 - 30, y + 20);
          this.ctx.lineTo(x + 15 - 30, y + 19);
          this.ctx.lineTo(x + 18 - 30, y + 8);
          this.ctx.lineTo(x + 20 - 30, y + 5);
          this.ctx.lineTo(x + 21 - 30, y + 7);
          this.ctx.lineTo(x + 22 - 30, y + 12);
          this.ctx.lineTo(x + 22 - 30, y + 12);
          this.ctx.lineTo(x + 22 - 30, y + 12);
          this.ctx.lineTo(x + 22 - 30, y + 12);
          this.ctx.lineTo(x + 23 - 30, y + 7);
          this.ctx.lineTo(x + 23 - 30, y + 6);
          this.ctx.lineTo(x + 24 - 30, y + 6);
          this.ctx.lineTo(x + 25 - 30, y + 11);
          this.ctx.lineTo(x + 25 - 30, y + 16);
          this.ctx.lineTo(x + 25 - 30, y + 16);
          this.ctx.lineTo(x + 26 - 30, y + 14);
          this.ctx.lineTo(x + 28 - 30, y + 6);
          this.ctx.lineTo(x + 30 - 30, y + 5);
          this.ctx.lineTo(x + 30 - 30, y + 5);
          this.ctx.lineTo(x + 30 - 30, y + 11);
          this.ctx.lineTo(x + 30 - 30, y + 13);
          this.ctx.lineTo(x + 30 - 30, y + 19);
          this.ctx.lineTo(x + 30 - 30, y + 19);
          this.ctx.lineTo(x + 30 - 30, y + 20);
          this.ctx.lineTo(x + 30 - 30, y + 21);
          this.ctx.lineTo(x + 31 - 30, y + 21);
          this.ctx.lineTo(x + 36 - 30, y + 21);
          this.ctx.lineTo(x + 42 - 30, y + 21);
          this.ctx.lineTo(x + 43 - 30, y + 21);
          this.ctx.lineTo(x + 40 - 30, y + 21);
          this.ctx.lineTo(x + 38 - 30, y + 21);
          this.ctx.lineTo(x + 35 - 30, y + 22);
          this.ctx.lineTo(x + 33 - 30, y + 24);
          this.ctx.lineTo(x + 35 - 30, y + 24);
          this.ctx.lineTo(x + 46 - 30, y + 25);
          this.ctx.lineTo(x + 51 - 30, y + 25);
          this.ctx.lineTo(x + 46 - 30, y + 26);
          this.ctx.lineTo(x + 39 - 30, y + 27);
          this.ctx.lineTo(x + 37 - 30, y + 28);
          this.ctx.lineTo(x + 37 - 30, y + 28);
          this.ctx.lineTo(x + 37 - 30, y + 29);
          this.ctx.lineTo(x + 47 - 30, y + 31);
          this.ctx.lineTo(x + 49 - 30, y + 31);
          this.ctx.lineTo(x + 52 - 30, y + 32);
          this.ctx.lineTo(x + 52 - 30, y + 32);
          this.ctx.lineTo(x + 51 - 30, y + 32);
          this.ctx.lineTo(x + 44 - 30, y + 33);
          this.ctx.lineTo(x + 43 - 30, y + 33);
          this.ctx.lineTo(x + 43 - 30, y + 33);
          this.ctx.lineTo(x + 42 - 30, y + 33);
          this.ctx.lineTo(x + 50 - 30, y + 35);
          this.ctx.lineTo(x + 56 - 30, y + 36);
          this.ctx.lineTo(x + 55 - 30, y + 36);
          this.ctx.lineTo(x + 44 - 30, y + 37);
          this.ctx.lineTo(x + 40 - 30, y + 37);
          this.ctx.lineTo(x + 52 - 30, y + 39);
          this.ctx.lineTo(x + 54 - 30, y + 39);
          this.ctx.lineTo(x + 64 - 30, y + 39);
          this.ctx.lineTo(x + 66 - 30, y + 39);
          this.ctx.lineTo(x + 50 - 30, y + 39);
          this.ctx.lineTo(x + 41 - 30, y + 39);
          this.ctx.lineTo(x + 41 - 30, y + 39);
          this.ctx.lineTo(x + 41 - 30, y + 40);
          this.ctx.lineTo(x + 44 - 30, y + 40);
          this.ctx.lineTo(x + 57 - 30, y + 42);
          this.ctx.lineTo(x + 60 - 30, y + 42);
          this.ctx.lineTo(x + 53 - 30, y + 42);
          this.ctx.lineTo(x + 51 - 30, y + 42);
          this.ctx.lineTo(x + 42 - 30, y + 41);
          this.ctx.lineTo(x + 39 - 30, y + 41);
          this.ctx.lineTo(x + 39 - 30, y + 41);
          this.ctx.lineTo(x + 39 - 30, y + 41);
          this.ctx.lineTo(x + 39 - 30, y + 41);
          this.ctx.lineTo(x + 36 - 30, y + 41);
          this.ctx.lineTo(x + 35 - 30, y + 41);
          this.ctx.lineTo(x + 35 - 30, y + 42);
          this.ctx.lineTo(x + 35 - 30, y + 43);
          this.ctx.lineTo(x + 35 - 30, y + 61);
          this.ctx.lineTo(x + 35 - 30, y + 63);
          this.ctx.lineTo(x + 35 - 30, y + 74);
          this.ctx.lineTo(x + 35 - 30, y + 75);
          this.ctx.lineTo(x + 35 - 30, y + 75);
          this.ctx.lineTo(x + 32 - 30, y + 62);
          this.ctx.lineTo(x + 32 - 30, y + 60);
          this.ctx.lineTo(x + 32 - 30, y + 58);
          this.ctx.lineTo(x + 31 - 30, y + 51);
          this.ctx.lineTo(x + 31 - 30, y + 50);
          this.ctx.lineTo(x + 31 - 30, y + 51);
          this.ctx.lineTo(x + 31 - 30, y + 54);
          this.ctx.lineTo(x + 31 - 30, y + 58);
          this.ctx.lineTo(x + 29 - 30, y + 73);
          this.ctx.lineTo(x + 28 - 30, y + 78);
          this.ctx.lineTo(x + 27 - 30, y + 72);
          this.ctx.lineTo(x + 27 - 30, y + 71);
          this.ctx.lineTo(x + 26 - 30, y + 64);
          this.ctx.lineTo(x + 26 - 30, y + 63);
          this.ctx.lineTo(x + 26 - 30, y + 63);
          this.ctx.lineTo(x + 26 - 30, y + 64);
          this.ctx.lineTo(x + 26 - 30, y + 80);
          this.ctx.lineTo(x + 25 - 30, y + 86);
          this.ctx.lineTo(x + 25 - 30, y + 86);
          this.ctx.lineTo(x + 21 - 30, y + 78);
          this.ctx.lineTo(x + 19 - 30, y + 68);
          this.ctx.lineTo(x + 19 - 30, y + 67);
          this.ctx.lineTo(x + 19 - 30, y + 67);
          this.ctx.lineTo(x + 19 - 30, y + 78);
          this.ctx.lineTo(x + 19 - 30, y + 81);
          this.ctx.lineTo(x + 19 - 30, y + 83);
          this.ctx.lineTo(x + 19 - 30, y + 83);
          this.ctx.lineTo(x + 19 - 30, y + 83);
          this.ctx.lineTo(x + 17 - 30, y + 77);
          this.ctx.lineTo(x + 15 - 30, y + 62);
          this.ctx.lineTo(x + 15 - 30, y + 61);
          this.ctx.lineTo(x + 15 - 30, y + 60);
          this.ctx.lineTo(x + 15 - 30, y + 62);
          this.ctx.lineTo(x + 15 - 30, y + 64);
          this.ctx.lineTo(x + 15 - 30, y + 65);
          this.ctx.lineTo(x + 14 - 30, y + 70);
          this.ctx.lineTo(x + 13 - 30, y + 71);
          this.ctx.lineTo(x + 12 - 30, y + 58);
          this.ctx.lineTo(x + 12 - 30, y + 55);
          this.ctx.lineTo(x + 12 - 30, y + 44);
          this.ctx.lineTo(x + 12 - 30, y + 41);
          this.ctx.lineTo(x + 12 - 30, y + 41);
          this.ctx.lineTo(x + 11 - 30, y + 41);
          this.ctx.lineTo(x + 9 - 30, y + 41);
          this.ctx.lineTo(x + 9 - 30, y + 41);
          this.ctx.lineTo(x + -2 - 30, y + 40);
          this.ctx.lineTo(x + -1 - 30, y + 40);
          this.ctx.lineTo(x + 1 - 30, y + 40);
          this.ctx.lineTo(x + 3 - 30, y + 40);
          this.ctx.lineTo(x + 3 - 30, y + 40);
          this.ctx.lineTo(x + 8 - 30, y + 40);
          this.ctx.lineTo(x + 8 - 30, y + 40);
          this.ctx.lineTo(x + 8 - 30, y + 40);
          this.ctx.lineTo(x + 9 - 30, y + 39);
          this.ctx.lineTo(x + 9 - 30, y + 38);
          this.ctx.lineTo(x + 6 - 30, y + 35);
          this.ctx.lineTo(x + 3 - 30, y + 34);
          this.ctx.lineTo(x + 4 - 30, y + 34);
          this.ctx.lineTo(x + 4 - 30, y + 34);
          this.ctx.lineTo(x + 6 - 30, y + 34);
          this.ctx.lineTo(x + 9 - 30, y + 34);
          this.ctx.lineTo(x + 10 - 30, y + 34);
          this.ctx.lineTo(x + 10 - 30, y + 34);
          this.ctx.lineTo(x + 11 - 30, y + 33);
          this.ctx.lineTo(x + 10 - 30, y + 32);
          this.ctx.lineTo(x + 5 - 30, y + 31);
          this.ctx.lineTo(x + 3 - 30, y + 30);
          this.ctx.lineTo(x + 7 - 30, y + 29);
          this.ctx.lineTo(x + 8 - 30, y + 29);
          this.ctx.lineTo(x + 12 - 30, y + 28);
          this.ctx.lineTo(x + 13 - 30, y + 28);
          this.ctx.lineTo(x + 12 - 30, y + 27);
          this.ctx.lineTo(x + 10 - 30, y + 27);
          this.ctx.lineTo(x + 2 - 30, y + 24);
          this.ctx.lineTo(x + 2 - 30, y + 24);
          this.ctx.lineTo(x + 3 - 30, y + 24);
          this.ctx.lineTo(x + 5 - 30, y + 24);
          this.ctx.lineTo(x + 8 - 30, y + 24);
          this.ctx.lineTo(x + 9 - 30, y + 23);
          this.ctx.lineTo(x + 8 - 30, y + 23);
          this.ctx.lineTo(x + 4 - 30, y + 23);
          this.ctx.lineTo(x + 1 - 30, y + 22);
          this.ctx.lineTo(x + 1 - 30, y + 22);
          this.ctx.lineTo(x + 1 - 30, y + 22);
          this.ctx.lineTo(x + 3 - 30, y + 22);
          this.ctx.lineTo(x + 7 - 30, y + 22);
          this.ctx.lineTo(x + 8 - 30, y + 22);
          this.ctx.lineTo(x + 8 - 30, y + 22);
          this.ctx.lineTo(x + 9 - 30, y + 21);
          this.ctx.lineTo(x + 9 - 30, y + 21);
          this.ctx.lineTo(x + 9 - 30, y + 20);
          this.ctx.lineTo(x + 9 - 30, y + 19);
          this.ctx.lineTo(x + 8 - 30, y + 16);
          this.ctx.lineTo(x + 8 - 30, y + 13);
          this.ctx.lineTo(x + 7 - 30, y + 10);
          this.ctx.lineTo(x + 7 - 30, y + 8);
          this.ctx.lineTo(x + 7 - 30, y + 7);
          this.ctx.lineTo(x + 7 - 30, y + 7);
          this.ctx.lineTo(x + 7 - 30, y + 6);
          this.ctx.lineTo(x + 7 - 30, y + 6);
          this.ctx.lineTo(x + 7 - 30, y + 6);
          this.ctx.lineTo(x + 7 - 30, y + 5);
          this.ctx.lineTo(x + 6 - 30, y + 5);
          this.ctx.fill();
        }

        // ---- Dig
        if (this.tool.digType === "Dig") {
          this.ctx.moveTo(x + 25 - 30, y + 39);
          this.ctx.lineTo(x + 25 - 30, y + 39);
          this.ctx.lineTo(x + 25 - 30, y + 38);
          this.ctx.lineTo(x + 25 - 30, y + 36);
          this.ctx.lineTo(x + 28 - 30, y + 32);
          this.ctx.lineTo(x + 31 - 30, y + 31);
          this.ctx.lineTo(x + 37 - 30, y + 30);
          this.ctx.lineTo(x + 41 - 30, y + 26);
          this.ctx.lineTo(x + 42 - 30, y + 22);
          this.ctx.lineTo(x + 41 - 30, y + 16);
          this.ctx.lineTo(x + 41 - 30, y + 15);
          this.ctx.lineTo(x + 37 - 30, y + 10);
          this.ctx.lineTo(x + 31 - 30, y + 8);
          this.ctx.lineTo(x + 27 - 30, y + 8);
          this.ctx.lineTo(x + 26 - 30, y + 8);
          this.ctx.lineTo(x + 26 - 30, y + 6);
          this.ctx.lineTo(x + 26 - 30, y + 6);
          this.ctx.lineTo(x + 26 - 30, y + 5);
          this.ctx.lineTo(x + 26 - 30, y + 3);
          this.ctx.lineTo(x + 24 - 30, y + 1);
          this.ctx.lineTo(x + 20 - 30, y + 0);
          this.ctx.lineTo(x + 15 - 30, y + 0);
          this.ctx.lineTo(x + 10 - 30, y + 1);
          this.ctx.lineTo(x + 10 - 30, y + 1);
          this.ctx.lineTo(x + 6 - 30, y + 4);
          this.ctx.lineTo(x + 2 - 30, y + 7);
          this.ctx.lineTo(x + -1 - 30, y + 34);
          this.ctx.lineTo(x + 4 - 30, y + 36);
          this.ctx.lineTo(x + 6 - 30, y + 37);
          this.ctx.lineTo(x + 8 - 30, y + 38);
          this.ctx.lineTo(x + 8 - 30, y + 38);
          this.ctx.lineTo(x + 9 - 30, y + 38);
          this.ctx.lineTo(x + 9 - 30, y + 39);
          this.ctx.lineTo(x + 9 - 30, y + 39);
          this.ctx.lineTo(x + 9 - 30, y + 43);
          this.ctx.lineTo(x + 9 - 30, y + 44);
          this.ctx.lineTo(x + 9 - 30, y + 46);
          this.ctx.lineTo(x + 9 - 30, y + 48);
          this.ctx.lineTo(x + 9 - 30, y + 48);
          this.ctx.lineTo(x + 10 - 30, y + 49);
          this.ctx.lineTo(x + 11 - 30, y + 50);
          this.ctx.lineTo(x + 11 - 30, y + 50);
          this.ctx.lineTo(x + 12 - 30, y + 50);
          this.ctx.lineTo(x + 14 - 30, y + 50);
          this.ctx.lineTo(x + 17 - 30, y + 50);
          this.ctx.lineTo(x + 19 - 30, y + 50);
          this.ctx.lineTo(x + 19 - 30, y + 50);
          this.ctx.lineTo(x + 21 - 30, y + 48);
          this.ctx.lineTo(x + 22 - 30, y + 48);
          this.ctx.lineTo(x + 23 - 30, y + 48);
          this.ctx.lineTo(x + 24 - 30, y + 47);
          this.ctx.lineTo(x + 24 - 30, y + 47);
          this.ctx.lineTo(x + 25 - 30, y + 47);
          this.ctx.lineTo(x + 25 - 30, y + 47);
          this.ctx.lineTo(x + 25 - 30, y + 47);
          this.ctx.lineTo(x + 25 - 30, y + 46);
          this.ctx.lineTo(x + 25 - 30, y + 46);
          this.ctx.lineTo(x + 25 - 30, y + 45);
          this.ctx.lineTo(x + 25 - 30, y + 45);
          this.ctx.lineTo(x + 25 - 30, y + 43);
          this.ctx.lineTo(x + 25 - 30, y + 42);
          this.ctx.lineTo(x + 25 - 30, y + 42);
          this.ctx.lineTo(x + 25 - 30, y + 41);
          this.ctx.lineTo(x + 25 - 30, y + 40);
          this.ctx.lineTo(x + 25 - 30, y + 39);
          this.ctx.lineTo(x + 25 - 30, y + 39);
          this.ctx.lineTo(x + 25 - 30, y + 38);
          this.ctx.lineTo(x + 25 - 30, y + 38);
          this.ctx.lineTo(x + 25 - 30, y + 38);
          this.ctx.fill();
        }

        if (this.tool.digType) {
          this.ctx.moveTo(this.old.x, this.old.y);
          this.ctx.lineTo(x, y);
          this.ctx.stroke();

          this.old = { x: x, y: y };
          this.calcArray(this.old);
        }
      }
    },
  },
  mounted() {
    this.active = document.getElementById(`canvas${this.data.i}AA`);
    this.dig();
    if (this.i < this.$store.state.activePiece.i) {
      this.$refs.a.style="opacity: 0; pointer-events: none;";
      this.$refs.aa.style="opacity: 0; pointer-events: none;";
      this.showPreviewText = true;
      this.preventPopup = true;
      this.AAsolved = true;
      this.Asolved = true;
      this.Csolved = true;
    }
    this.$store.commit("AAsolved", false);
    this.$store.commit("puzzleScreenOpen", false);
    // this.$store.commit("donePuzzle", true); //temp
  },
};
</script>
<style scoped lang="scss">
@import "../main.scss";

.digging {
  position: relative;
}
.solved {
  position: absolute;
  color: white;
  left: 0;
  bottom: 0;
  width: calc(100% - 20px);
  padding: 10px;
  z-index: 2;
}
.a,
.aa {
  // background: black;
  position: absolute;
  left: 0;
  margin-left: 1px;
}
.aa {
  z-index: 4;
  width: calc(100% - 2px);
  // background: black;
}
.c {
  position: absolute;
  left: 1px;
  z-index: -1;
}
.b {
  cursor: pointer;
}
.a,
.b,
.aa, .c {
  height: 50vh;
}
.playbutton {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 40px;
  height: 40px;
  opacity: 0.25;
  transform: translateX(-50%) translateY(-50%);
}
#icon {
  fill: white;
  width: 20px;
  display: inline-block;
  vertical-align: bottom;
  cursor: pointer;
}
.blurb {
  padding: 0 0 0 10px;
  display: inline-block;
  vertical-align: top;
  font-size: 10px;
  width: calc(100% - 30px);
  max-height: 0%;
}

.blurb-enter-active {
  max-height: 100%;
  transition: max-height 0.5s ease;
}
.previewtext {
  color: white;

  // height: 100%;
  z-index: 10;
  pointer-events: none;
  user-select: none;
  text-shadow: 0px 0px 10px rgba(0,0,0,1);
  font-size: 12px;
  // font-weight: bold;
  width: 80%;
  text-align: center;

}
  .text {
    margin: 0;
    position: absolute;
    width: 90%;
    top: 10%;
    left: 50%;
    font-family: $gh !important;
    position: absolute;
    left: 50%;
    z-index: 7;
    transform: translateX(-50%);
    color: white;
    text-align: center;
    pointer-events: none;
  }
.questionmark {
  font-size: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  left: 50%;
  z-index: 7;
 img {
    width: 50px
 }
}
.digging {
  // border: 1px solid grey;
  -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.46); 
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.46);
  padding: 1px;
}
.mg {
  // opacity: .5;
   &:hover {
    transition: opacity .25s ease;
    opacity: 1;
  }
}
.lightbox {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 5;
  color: white;
  transition: opacity .25s ease;
  cursor: pointer;
 
  img {
    width: 20px;
    height: 20px;
    padding: 10px;
  }
}
.lightboximage {
  position: fixed;
  z-index: 100;
  top: 0;
  background: rgb(0,0,0,.75);
  max-width: 100vw;
  width: 100%;
  left: 0;
  height: 100%;
   .lightboximage-inner {
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: calc(100vh * 1.52);
  }
  .info {
    // top: 50%;
    pointer-events: none;
    p {
      color: white;
    }
    max-width: 40%;
    white-space: wrap;
    word-wrap: break-word;
    display: inline-block;
    vertical-align: middle;
    padding: 40px;
  }
  .lightboximageinner {
    vertical-align: middle;
    display: inline-block;
    // position: fixed;
     max-height: 100vh;
     position: relative;
    padding: 20px;
    width: 40%;
    // max-width: 100vw;
    // transform:  translateY(-50%);
  }
  img {
    // height: 600px;
   max-width: 100%;
    display: inline-block;

  }
  .x {
    display: inline-block;
    right: 0;
    top: 10%;
    color: white;
    font-size: 60px;
    vertical-align: top;
    position: absolute;
    // right: 0;
    right: 10%;
    font-family: Helvetica !important;

    // transform: translateX(100%) translateY(-100%);
    cursor: pointer;
  }
}
.glow {
  position: absolute;
  // left: -30px;
  // top: -30px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 0;
  width: 120px !important;
  height: 120px !important;
  // mix-blend-mode: difference;
}
.nopointer {
  pointer-events: none;
}
.tooltip {
  background: white;
  padding: 1px 5px;
  border: 1px solid black;
  // margin-top: 80px;
  font-family: Helvetica !important;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(110%) translateX(-50%);
}
</style>
