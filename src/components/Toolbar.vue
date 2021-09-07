<template>
  <div class="toolbar">
      <div class="bar" ref="bar">
          <div class="bg"/>
          <!-- <div class="tools" v-if="randomizedpieces.length">
            <div class="tool"  v-for="(item, i) in randomizedpieces" :key="i">
                <img 
                :style="$store.state.activePiece === $puzzle.piece[item] ? `opacity: 1` : `opacity: .25; pointer-events: none;`"
                :src="$puzzle.piece[item].tool.url" 
                @click="assignTool({src: $puzzle.piece[item].tool.url, i: item, digType: $puzzle.piece[item].reveal_type})"/>
            </div>
        </div> -->
             <div class="tools">
            <div class="tool">
                <!-- :style="$store.state.activePiece === $puzzle.piece[item] ? `opacity: 1` : `opacity: .25; pointer-events: none;`" -->
                
                <!-- Etch -->
                <img 
                :style="!$store.state.AAsolved ? `opacity: 1` : `opacity: .25; pointer-events: none;`"
                :src="$puzzle.scraper.url" 
                @click="assignTool({src: $puzzle.scraper.url,  digType: etch})"/>
                <p>Unmasking Tool</p>

                <!-- Reveal -->
                <img 
                :style="$store.state.AAsolved ? `opacity: 1` : `opacity: .25; pointer-events: none;`"
                :src="$puzzle.revealer.url" 
                @click="assignTool({src: $puzzle.revealer.url,  digType: reveal})"/>
                <p>Light Tool</p>

            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
        randomizedpieces: [],
        etch: 'Etch',
        reveal: "Reveal"
    };
  },
  computed: {
  },
  props: {},
  watch: {},
  methods: {
      assignTool(obj) {
          this.$store.commit("tool", obj);
      },
      hover(){
          this.$refs.bar.addEventListener("mouseover", () => {
              this.$refs.bar.style = `left: 0`;
          })
          this.$refs.bar.addEventListener("mouseout", () => {
              this.$refs.bar.style = `left: -60px`;
          })
      }
  },
  mounted() {
    //   this.hover();
      while (this.randomizedpieces.length < 8) {
          var num = Math.floor((Math.random() * 8));
          if (this.randomizedpieces.indexOf(num) < 0) {
            this.randomizedpieces.push(num);
          }
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bar {
    // position: fixed;
    overflow: hidden;
    border-radius: 0 20px 20px 0;
    /* left: -50px; */
    // left: -60px;
    left: 0px;

    border: .5px solid black;
    width: 80px;
    height: 80vh;
    transform: translateY(0);
    -webkit-box-shadow: 0px 0px 18px 0px rgba(0,0,0,0.25); 
    box-shadow: 0px 0px 18px 0px rgba(0,0,0,0.25);
    margin: 10vh 0;
    transition: left .5s ease;
}
.bg {
    // background: white;
    background: url('../assets/Toolbar.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    opacity: .6;
    z-index: -100;
    position: absolute;
}
.toolbar {
    position: fixed;
}
.tool img{
    width: 80px;
    padding: 80px 0 0;
}
.tool {
    z-index: 2;
    cursor: pointer;
}
.tools {
    margin-top: 40vh;
    transform: translateY(-50%);
}
p {
    color: white;
    font-size: 10px;
    text-align: center;
    padding: 0 0 80px;
}
</style>
