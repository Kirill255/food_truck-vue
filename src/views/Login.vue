<template>
  <div>
    <h1>Login page</h1>
    <!-- <div v-if=user>{{user}}</div>
    <div v-if=token>{{token}}</div> -->

    <form class="form-sign"
          @submit.prevent="loginAccount">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <div class="form-group">
        <label for="inputEmail">Email address</label>
        <input type="email"
               class="form-control"
               id="inputEmail"
               aria-describedby="emailHelp"
               placeholder="Enter email"
               required
               autofocus
               v-model="account.email">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input type="password"
               class="form-control"
               id="inputPassword"
               placeholder="Password"
               required
               v-model="account.password">
      </div>
      <div class="form-group form-check">
        <input type="checkbox"
               class="form-check-input"
               id="inputCheckbox"
               v-model="rememberme">
        <label class="form-check-label"
               for="inputCheckbox">Remember me</label>
      </div>

      <button class="btn btn-lg btn-outline-primary btn-block"
              type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Auth from "@/services/Auth";

export default {
  name: "Login",
  data: () => ({
    account: {
      email: "",
      password: ""
    },
    rememberme: false
    // user: "",
    // token: ""
  }),
  watch: {
    rememberme: "setRememberMe"
  },
  methods: {
    ...mapActions(["setToken"]),
    async loginAccount() {
      await Auth.login(this.account)
        .then(res => {
          console.log("res ", res);

          // this.user = res.data.email;
          // this.token = res.data.token;

          let token = res.data.token;

          this.setToken(token);
          this.$cookie.set("token", token);

          this.$router.push({ name: "foodtruck" });
        })
        .catch(err => {
          console.log("err :", err);
          // this.errors = err.response.data.errors;
          this.errors = err.message;
        });
    },
    setRememberMe() {
      console.log(this.rememberme);
      if (this.rememberme) {
        let value = JSON.stringify(this.rememberme);
        localStorage.setItem("rememberme", value);
      } else {
        localStorage.removeItem("rememberme");
      }
      return;
    }
  }
};
</script>

<style scoped>
</style>
