<template>
  <div class="emailNotif">
    <div class="bgg"/>
    <div class="img col">
      <img src="../assets/Email.png"/>
      </div>
    <div class="left col">
      <p><b>New Email from Corine Colors</b></p>
      <p class="small">from Email Thread</p>
      <p class="small">from Email Thread</p>

      </div>
      <div class="right col">
        <p @click="handleClose">Close</p>
        <p @click="openEmail">Show</p>
      </div>
  </div>
</template>

<script>
export default {
  name: "EmailNotif",
  data() {
    return {};
  },
  props: {},
  watch: {},
  methods: {
    handleClose() {
      this.$emit("closeNotif", true);
    },
    openEmail() {
      this.$emit("openEmail", true);
    }
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.col {
  display: inline-block;
  height: 100%;
  // vertical-align: top;
  vertical-align: middle;

}
.left {
  width: calc(80% - 85px);
  border-right: 1px solid white;
  padding: 10px;
  height: 60px;
  p {
    color: black;
    margin: 5px 0;
   
  }
  p:not(.small) {
     font-size: 13px;
  }
}
.right {
  width: calc(20% - 1px);
  text-align: center;

  p {
    display: block;
    cursor: pointer;
    height: 20px;
    padding: 10px 0;
    &:first-child {
      border-bottom: 1px solid white;
    }
  }
}
.bgg {
  background: white;
  opacity: .5;
  z-index: -1;
}
.bgg, .emailNotif {
  width: 350px;
  height: 80px;
  border-radius: 10px;
  position: fixed;
  top: 10px;
  overflow: hidden;
  // right: 0;
} 
.emailNotif {
  z-index: 1000;
  padding-top: 10px;
  padding-right: 10px;
}
.small {
  font-size: 12px;
}
img {
  display: inline-block;
  width: 40px;
}
.img {
  height: auto;
  padding: 0 10px 0 15px;
}
</style>
