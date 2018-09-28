import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/main.css";

import Vue from "vue";
import VueCookie from "vue-cookie";
Vue.use(VueCookie);

import App from "./App.vue";

import { router } from "./router";
import { store } from "./store";

Vue.config.productionTip = false;

const checkAuthentication = store => {
  const token = Vue.cookie.get("token");

  // console.log("this.token :", token);
  // console.log("store :", store);

  // console.log("auth :", store.getters["auth"]);
  // console.log("token :", store.getters["token"]);
  if (token) {
    store.dispatch("setToken", token);
  }
  // console.log("auth :", store.getters["auth"]);
  // console.log("token :", store.getters["token"]);
};

if (localStorage.getItem("rememberme")) {
  checkAuthentication(store);
} else {
  Vue.cookie.delete("token");
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
