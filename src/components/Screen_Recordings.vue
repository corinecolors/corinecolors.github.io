<template>
  <div class="screen email">
      <Closebar @close="close"/>
      <div class="screeninner">
      
      </div>

  </div>
</template>

<script>
import Closebar from "./Closebar.vue";

export default {
  name: "Screen_Email",
  components: {
Closebar
  },
  data() {
    return {
      menuitems: [
        {
          title: "Inbox",
          src: require('../assets/inbox.png')
        },
        {
          title: "Starred",
          src: require('../assets/starred.png')
        },
        {
          title: "Sent",
          src: require('../assets/sent.png')
        },
        {
          title: "Drafts",
          src: require('../assets/drafts.png')
        },
        {
          title: "Trash",
          src: require('../assets/trash.png')
        },
      ],
      currentEmail: null,
      
    };
  },
  props: {},
  watch: {},
  methods: {
    activeEmail(email, i) {
      this.currentEmail = email;

      if (this.$store.state.emailsRead[i] === false) {
        this.$store.commit("emailsRead", {idx: i, boole: true});
      }
    },
    close(i) {
      this.$emit("close", i)
    }
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.screeninner {
    overflow: scroll;
    height: 70vh;
    position: relative;
}
.screen {
    position: fixed;
    width: 70vw;
    height: 70vh;
    background: white;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 5px;
    overflow: hidden;
    padding-bottom: 22px;
}
.logo {
  h1, img {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    width: 50px;
    padding-right: 10px;
  }
}
.sidebar {
  background: lightgray;
  width: 25%;
  height: 100%;
  position: fixed;
  z-index: 10;
}
.sidebar, .thread {
  display: inline-block;
}
.thread {
  width: 75%;
  position: absolute;
  top: 0;
  margin-left: 25%;
}
.menu {
  p {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
    display: inline-block;
    width: 25px;
    padding: 0 10px 5px;
  }
}
p {
    color: black;
}
.headline {
  width: 35%;
}
table {
  width: 100%;
  border-spacing: 0;
}
.row p {
  padding: 10px 0;
}
td {
  padding: 0;
}
.row{
 
  background: white;
  transition: background .25s ease;
  cursor: pointer;
  &:hover {
    background: lightgray;
    transition: background .25s ease;
  }
    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-bottom: 1px solid lightgray;
      pointer-events: none;
    }
    &:first-child:after {
      border-top: 1px solid lightgray; 
    }
}
.emailthread-enter-to, .emailthread-leave{
  transform: translateX(0%);
  transition: transform .5s ease;
}
.emailthread-enter, .emailthread-leave-to {
  transform: translateX(-100%);
  transition: transform .5s ease;
}
.openedemail {
  position: absolute;
  padding: 20px;
  transform: translateX(0%);
  width: calc(100% - 40px);
  top: 0;
}
.openedemail-enter-to {
  transform: translateX(0%);
  transition: transform .5s ease;
}
.openedemail-enter, .openedemail-leave-to, .openedemail-leave {
  transform: translateX(100%);
  transition: transform .5s ease;
}
.back {
  cursor: pointer;
  padding-bottom: 20px;
  display: inline-block;
}
.senderinfo {
  padding-left: 10px;
}
.senderInformation {
  position: relative;
  .dp {
    vertical-align: middle;
    display: inline-block;
    height: 50px;
    width: 50px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 100px;
  }
  p {
    display: inline-block;
    vertical-align: middle;
  }
  .icons {
    position: absolute;
    right: 0;
    top: 0;
    img {
      width: 15px;
      padding: 0 10px;
    }
  }
}
.starredthread {
  img {
    width: 20px;
    padding-left: 20px;
  }
}
.bg {
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
}
</style>
