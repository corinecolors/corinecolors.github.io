<template>
  <div class="puzzle-wrapper">
      <table class="empty">
        <tr v-for="(item, i) in dimensions" :key="i">
            <td class="box" :ref="`box-${i + j + (i * (dimensions - 1))}`" v-for="(jtem, j) in dimensions" :key="j">   
            </td>
        </tr>
      </table>
      <div class="pieces" ref="pieces">
        <div class="piece" :ref="`piece-${i}`" :style="pieceRandomPos()" v-for="(item, i) in dimensions * dimensions" :key="i">
            <img class="pieceimg" src="../assets/puzzle.jpg" :style="coverPos(i)"/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Puzzle',
 data() {
   return {
     dimensions: 3,
     targetpiece: null,
     offsetX: 0,
     offsetY: 0,
     placedPieces: [],
     boxPos: [],
     lastPuzzlePos: {},
     threshold: 20,
     win: false,
   }
 },
 methods: {
  getBoxPos() {
    for (let i = 0; i < this.dimensions * this.dimensions; i++) {
      this.boxPos.push({
        x: this.$refs[`box-${i}`][0].getBoundingClientRect().x,
        y: this.$refs[`box-${i}`][0].getBoundingClientRect().y
      })
    }

  },
   clickndrag() {
    this.$refs.pieces.addEventListener("mousedown", e => {
      if (e.target.className === "piece") {
        
        this.offsetX = e.clientX - e.target.getBoundingClientRect().x;
        this.offsetY = e.clientY - e.target.getBoundingClientRect().y;
        this.targetpiece = e.target;
        this.$refs.pieces.addEventListener("mousemove", this.move);

      }
     
    })
   },
   move(e) {
     this.lastPuzzlePos = {x: e.clientX - this.offsetX, y: e.clientY  - this.offsetY};
      this.targetpiece.style.transform = `translate(${this.lastPuzzlePos.x}px, ${this.lastPuzzlePos.y}px)`;
   },
   release() {
     this.$refs.pieces.addEventListener("mouseup", () => {
       this.$refs.pieces.removeEventListener("mousemove", this.move);
       this.checkIfPlacedRight();
     });
   },
   checkIfPlacedRight() {
     this.boxPos.find((i, item) => {
       if (Math.abs(this.lastPuzzlePos.x - i.x) < this.threshold && Math.abs(this.lastPuzzlePos.y - i.y) < this.threshold) {
        this.targetpiece.style.transform = `translate(${this.boxPos[item].x}px, ${this.boxPos[item].y}px)`;
        this.placedPieces[item] = this.targetpiece;
        this.checkIfWon(); 
        return;
       }
     })
   },
   checkIfWon() {
    //  console.log(this.placedPieces, this.placedPieces.indexOf(false));
      console.log(this.placedPieces);
   },
   pieceRandomPos() {
      var randomX = (Math.random() * window.innerWidth) + 1;
      var randomY = (Math.random() * window.innerHeight) + 1;
      return `transform: translate(${randomX}px, ${randomY}px)`;
     },

   coverPos(i) {
     var top = ((Math.floor(i / this.dimensions + 0.01)) * 100) * -1;
     var left = (i % this.dimensions) * 100;
     var width = this.dimensions * 100;
     return `left: -${left}%; top:${top}px; width: ${width}%;`;
   }
 },
 mounted() {
   this.clickndrag();
   this.release();
   this.getBoxPos();
  for (let i = 0; i < this.dimensions * this.dimensions; i++) {
    this.placedPieces[i] = null;
  }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box {
  width: 96px;
  height: 96px;
  border: 1px solid grey;
  display: inline-block;

}
.empty {
    border-spacing: 0;
    border-collapse: collapse;
}

.piece {
  width: 100px;
  height: 100px;
  display: inline-block;
  overflow: hidden;
  position: absolute;
  transform-origin: center;
}

.pieceimg {
  position: absolute;
  pointer-events: none;
}
.pieces {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
}
.win {
  position: absolute;
  left: 50%;
}
</style>
