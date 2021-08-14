<template>
  <div class="digging" ref="digging">
    <div class="previewtext" v-if="!hidePreviewTextAltogether">
      <span v-if="showPreviewText">{{
        $cms.textField(data.data.puzzle_preview_message)
      }}</span>
      <span class="questionmark" v-else>?</span>
    </div>
    <canvas
      :id="`canvas${data.i}B`"
      class="b"
      :style="`${Asolved ? `opacity: 1;` : ``}`"
    />
    <canvas
      :id="`canvas${data.i}A`"
      class="a"
      :style="`${Asolved ? `opacity: 0; pointer-events: none;` : ``}`"
    />
    <!-- <div class="playbutton" :style="`${Asolved ? `opacity: 1; cursor: pointer;` : `pointer-events: none`}`" @click="handlePlayButton"></div> -->
    <span @mousedown="handlePlayButton">
      <Playbutton
        :fill="$cms.textField(this.data.data.playbuttom_color)"
        :style="`${
          Asolved ? `opacity: .75; cursor: pointer;` : `pointer-events: none`
        }`"
      />
    </span>
    <canvas
      :id="`canvas${data.i}AA`"
      class="aa"
      :style="`${AAsolved ? `opacity: 0; pointer-events: none;` : ``}`"
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
      isPress: false,
      ctx: null,
      old: null,
      showBlurb: false,
      active: null,
      Aprohibited: true,
      digType: null,
      showPreviewText: false,
      hidePreviewTextAltogether: false,
      offset: 1000
    };
  },
  computed: {
    ...mapState(["tool"]),
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
      if (this.activei === this.tool.i && this.i === this.tool.i) {
        this.digType = this.$store.state.tool.digType;
        this.showPreviewText = true;
        this.$refs.digging.style = "pointer-events: auto";
      } else {
        this.$refs.digging.style = "pointer-events: none";
        // { emit nudge move }
      }
    },
    AAsolved() {
      if (this.AAsolved) {
        //Remove previous mouse listeners
        this.active.removeEventListener("mousedown", this.mousedown);
        this.active.removeEventListener("mousemove", this.mousemove);
        this.active.removeEventListener("mouseup", this.mouseup);
        //update the active canvas
        this.active = document.getElementById(`canvas${this.data.i}A`);
        //re-introduce moue listener to the new active canvas
        this.mouseEvents();
        this.$store.commit("digMoreMessage", true);
      this.$store.commit("mouse", {mouseevent: "mouseup", e: "none"});

      }
    },
    Asolved() {
      if (this.Asolved) {
        this.active.removeEventListener("mousedown", this.mousedown);
        this.active.removeEventListener("mousemove", this.mousemove);
        this.active.removeEventListener("mouseup", this.mouseup);
        this.$store.commit("isDigging", false);
        this.$store.commit("pressPlayMessage", true);
        this.$store.commit("mouse", {mouseevent: "mouseup", e: "none"});
        if (this.data.i=== 7) {
          this.$store.commit("donePuzzle", true);
        }

        //   this.$emit('solved', this.data.i)
      }
    },
  },
  methods: {
    handlePlayButton() {
      this.$emit("solved", this.data);
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
        this.whArray.length < this.offset &&
        this.active === document.getElementById(`canvas${this.data.i}AA`)
      ) {
        console.log("width and height", this.width, this.height);
        this.setArray({ width: this.width, height: this.height });
        this.AAsolved = true;
      }

      if (
        this.whArray.length < this.offset &&
        this.active === document.getElementById(`canvas${this.data.i}A`)
      ) {
        this.Asolved = true;
      }
    },
    dig() {
      if (this.data.data) {
        var urlA = this.data.data.a.url;
        var urlB = this.data.data.b.url;
      } else {
        urlA = this.image;
      }
      var canvasA = document.getElementById(`canvas${this.data.i}A`);
      var canvasB = document.getElementById(`canvas${this.data.i}B`);
      var canvasAA = document.getElementById(`canvas${this.data.i}AA`);

      var ctxA = canvasA.getContext("2d");
      var ctxB = canvasB.getContext("2d");
      var ctxAA = canvasAA.getContext("2d");

      var imgA = new Image();
      var imgB = new Image();
      var cover = new Image();

      imgA.src = urlA;
      imgB.src = urlB;
      cover.src = this.data.data.cover.url;

      new Promise((resolve) => {
        imgA.onload = function () {
          this.width = (window.innerHeight / 2 / imgA.height) * imgA.width;
          this.height = window.innerHeight / 2;

          canvasA.width = this.width;
          canvasA.height = this.height;

          ctxA.drawImage(imgA, 0, 0, this.width, this.height);

          //-------- Establishing the AA canvas here
          // canvasAA.width = this.width;
          // canvasAA.height = this.height;
          // ctxAA.fillStyle = "rgba(255, 255, 255, 0)";
          // ctxAA.fillRect(0, 0, this.width, this.height);
            canvasAA.width = this.width;
            canvasAA.height = this.height;
            ctxAA.drawImage(cover, 0, 0, this.width, this.height);
          

          resolve({ width: this.width, height: this.height });
        };
      }).then((e) => {
        this.setArray(e);
        this.width = e.width;
        this.height = e.height;
      });
      imgB.onload = function () {
        this.width = (window.innerHeight / 2 / imgB.height) * imgB.width;
        this.height = window.innerHeight / 2;
        canvasB.width = this.width;
        canvasB.height = this.height;
        ctxB.drawImage(imgB, 0, 0, this.width, this.height);
      };
      

      //   console.log(this.width, this.height);

      this.mouseEvents();
    },
    mouseEvents() {
      this.ctx = this.active.getContext("2d");

      this.active.addEventListener("mousedown", this.mousedown);
      this.active.addEventListener("mouseup", this.mouseup);
    },
    mousedown(e) {
      this.hidePreviewTextAltogether = true;
      this.$store.commit("isDigging", true);
      this.active.addEventListener("mousemove", this.mousemove);
      this.isPress = true;
      this.old = { x: e.offsetX, y: e.offsetY };
        this.$store.commit("mouse", {mouseevent: "mousedown", e: e});

      
    },
    
    mouseup(e) {
      this.isPress = false;
      this.$store.commit("isDigging", false);
      this.$store.commit("mouse", {mouseevent: "mouseup", e: e});

    },
    mousemove(e) {
      if (this.isPress) {
        this.$store.commit("mouse", {mouseevent: "mousemove", e: e});

        var x = e.offsetX;
        var y = e.offsetY;
        this.ctx.globalCompositeOperation = "destination-out";

        this.ctx.beginPath();

        // ---- Spirals
        if (this.digType === "Spirals") {
          this.ctx.lineWidth = 5;
          this.ctx.arc(x, y, this.range, 0, 2 * Math.PI);
        }

        // ---- Circle
        if (this.digType === "Circle") {
          this.ctx.arc(x, y, this.range, 0, 2 * Math.PI);
          this.ctx.fill();
        }

        // ---- Etch
        if (this.digType === "Etch") {
          this.ctx.rect(x - 40, y - 25, 80, 50);
          this.ctx.fill();
        }

        // ---- Sponge
        if (this.digType === "Sponge") {
          this.ctx.lineWidth = 30;
        }

        // ---- Snip
        if (this.digType === "Snip") {
          this.ctx.moveTo(this.old.x - 30, this.old.y - 30);
          this.ctx.lineTo(x + 30, y + 30);
          this.ctx.lineWidth = 5;
          this.ctx.stroke();
        }

        // ---- Axe
        if (this.digType === "Axe") {
          this.ctx.rotate(Math.PI / 5);
          this.ctx.lineWidth = 100;
        }

        // ---- Paint
        if (this.digType === "Paint") {
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
        if (this.digType === "Dig") {
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

        if (this.digType) {
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
    console.log(this.data.i);
  },
};
</script>
<style scoped lang="scss">
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
  // background: black;
}
.b {
  opacity: 0.7;
}
.a,
.b,
.aa {
  height: 50vh;
}
.playbutton {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 70px;
  height: 70px;
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
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 10;
  pointer-events: none;
  user-select: none;
}
.questionmark {
  font-size: 40px;
}
.digging {
  // border: 1px solid grey;
  -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.46); 
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.46);
  padding: 1px;
}
</style>
