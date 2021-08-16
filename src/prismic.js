import Vue from "vue";
import Vuex from "vuex";
var PrismicDOM = require("prismic-dom");

Vue.use(Vuex);

export default new (class Prismic {
  constructor() {
    this.p = require("@prismicio/client").default;
    this.eng = {};
    this.arabic = {};
    this.emails = [
      {
        headline: "important email!",
        subject: "Wow look at this",
        to: "rebecca@rebecca.com",
        from: "lady@lady.com",
        sender: "Lady",
        sendee: "Rebecca",
        body:
          "in sem. Aliquam erat volutpat. Mauris a risus eu purus porttitor blandit in sit amet nulla. Nulla sed scelerisque ipsum. In in leo augue. Sed quis hendrerit orci, lobortis consequat quam. Pellentesque porta augue egestas, auctor dui consectetur, scelerisque ligula. Aliquam ",
        dp:
          "https://i2.wp.com/digital-photography-school.com/wp-content/uploads/2016/02/Headshot-Photography-London-1052.jpeg?fit=750%2C500&ssl=1",
      },
    ];
  }
  //temp hardcoded
  all() {
    return new Promise((res) => {
      Promise.all([this.Emails(), this.prismic()]).then(() => res());
    });
  }
  Emails() {
    return new Promise((res) => {
      Vue.prototype.$emails = this.emails;
      res(Vue.prototype.$emails);
    });
  }
  prismic() {
    return new Promise((res) => {
      const client = this.p.client("https://firstlady.cdn.prismic.io/api/v2");
      client.query("").then((resp) => {
        console.log(resp.results);
        Vue.prototype.$puzzle = resp.results.find(
          (e) => e.type === "puzzle"
        ).data;

        //Assign to Eng object- --------–––––––––––––––––––––––––––––––––––––––––––––

        this.eng.disclaimer = resp.results.find(
          (e) => e.type === "intro"
        ).data.disclaimer;
        this.eng.desktop = resp.results
          .find((e) => e.type === "desktop")
          .data.desktop_links.map((e) => {
            return {
              icon: e.icon,
              label: e.label,
              link: e.link,
            };
          });
        this.eng.introvid = resp.results.find(
          (e) => e.type === "intro"
        ).data.intro_video;
        this.eng.postdisclaimervid = resp.results.find(
          (e) => e.type === "intro"
        ).data.post_disclaimer_video;
        this.eng.disclaimervoice = resp.results.find(
          (e) => e.type === "intro"
        ).data.disclaimer_voice_eng;
        Vue.prototype.$eng = this.eng;

        //Assign to Arabic object- --------–––––––––––––––––––––––––––––––––––––––––––––
        this.arabic.disclaimer = resp.results.find(
          (e) => e.type === "intro"
        ).data.disclaimer_arabic;
        this.arabic.desktop = resp.results
          .find((e) => e.type === "desktop")
          .data.desktop_links.map((e) => {
            return {
              icon: e.icon,
              label: e.label_arabic,
              link: e.link_arabic,
            };
          });

        Vue.prototype.$arabic = this.arabic;

        res();
      });
    });
  }
})();

Vue.prototype.$cms = new (class CMSModule {
  text(field) {
    return PrismicDOM.RichText.asText(this.fields[field]);
  }

  textField(field) {
    return PrismicDOM.RichText.asText(field);
  }

  html(field) {
    return PrismicDOM.RichText.asHtml(this.fields[field]);
  }

  htmlField(field) {
    return PrismicDOM.RichText.asHtml(field);
  }
})();
