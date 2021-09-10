<template>
  <div class="screen email">
      <Closebar @close="close"/>
      <div class="screeninner">
        <div class="sidebar">
          <div class="logo">
            <img src="../assets/Email.png"/>
            <h1>Email</h1>
          </div>
          <div class="menu">
            <div v-for="(item, i) in menuitems" :key="i" class="menuitem">
              <img :src="item.src"/>
              <p>{{item.title}}</p>
              </div>
            </div>
        </div>
        <div class="thread">
          <transition appear name="emailthread" v-if="!currentEmail">
            <div class="threadlist" >
              <div class="bg"/>
              <table v-if="$desktopcontent.screenemail.items  && $desktopcontent.screenemail.items.length">
                <transition>
                  v-for="(item, i) in $desktopcontent.screenemail.items " :key="i"
                  <tr class="row" :style="$store.state.emailsRead[0] === true ? `background: lightgrey;` : ``" @click="activeEmail($desktopcontent.screenemail.items[0], 0)">
                    <td class="starredthread">
                      <img src='../assets/starred.png'/>
                    </td>
                    <td class="headline">
                      <p>{{$cms.textField($desktopcontent.screenemail.items[0].email_title)}}</p>
                    </td>
                    <td class="subject">
                      <p>{{$cms.textField($desktopcontent.screenemail.items[0].email_body)}}</p>
                    </td>
                  </tr>
                </transition>
              </table>
            </div>
            </transition>
            <transition name="openedemail" appear>
                  <div  class="openedemail"  v-if="currentEmail">
                      <div class="back" @click="currentEmail = null">
                          <img src='../assets/back.png'/>
                        </div>

                        <div class="thread_singular" v-for="(item, i) in $desktopcontent.screenemail.items" :key="i">
                          <div class="senderInformation">
                            <div class="dp" :style="`background-image: url(${item.sender_image.url})`">
                            </div>
                            <p class="senderinfo">Sent from <b>{{$cms.textField(item.sender_name)}}</b> &lt;{{$cms.textField(item.sender_email)}}&gt;
                            <br/>
                              <span class="smol">To {{$cms.textField(item.to_who)}}</span>
                            </p>
                            <div class="icons">
                              <img src='../assets/forward.png'/>
                              <img src='../assets/starred.png'/>
                              <img src='../assets/more.png'/>
                            </div>

                          </div>
                            <h2 v-if="item.email_title.length">{{$cms.textField(item.email_title)}}</h2>
                            <p class="emailBody" v-html="$cms.htmlField(item.email_body)"></p>
                      </div>
                        <div class="link">
                          <div class="linkinner" @click="handleClick">The Deep State Files</div>
                        </div>
                      </div>
                </transition>
          </div>
          <!-- <div v-else class="thread empty">
            Your inbox is clean!
            </div> -->
          
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
        // {
        //   title: "Starred",
        //   src: require('../assets/starred.png')
        // },
        // {
        //   title: "Sent",
        //   src: require('../assets/sent.png')
        // },
        // {
        //   title: "Drafts",
        //   src: require('../assets/drafts.png')
        // },
        // {
        //   title: "Trash",
        //   src: require('../assets/trash.png')
        // },
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
    },
    handleClick() {
      this.$store.commit('screens', {what: "showPuzzle", bool: true});
      this.$store.commit('screens', {what: "Toolbar", bool: true});
    }
  },
  mounted() {
    this.$store.commit("showEmailThread", true);
    this.$store.commit("emailNotif", true);
  },
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
h2 {
  margin: 20px 0 10px;
}
.logo {
  h2,  h1, img {
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
  z-index: 11;
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
  padding-left: 20px;
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
.thread_singular {
  padding-bottom: 40px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(231, 231, 231);
}
.link {
  padding-bottom: 50px;
  padding-left: 0;
}
.linkinner {
  background: black;
  padding: 20px;
  color: white;
    transition: background .5s ease;
  border-radius: 20px;
  &:hover {
    background: grey;
    transition: background .5s ease;
  }
}
.empty {
  text-align: center;
  padding-top: 20px;
}
.subject p {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  width: 400px;
  margin: 20px;
  padding: 0;
}
.emailBody {
   &::v-deep p {
      color: black !important;
      margin-bottom: 10px !important;
    }
}
</style>
