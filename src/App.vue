<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <span class="navbar-brand">Vue food truck</span>
      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExampleDefault"
              aria-controls="navbarsExampleDefault"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse"
           id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link"
                         to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link"
                         to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link"
                         to="/foodtruck">Foodtruck</router-link>
          </li>
          <li v-if="auth"
              class="nav-item">
            <router-link class="nav-link"
                         to="/account/me">Me</router-link>
          </li>
        </ul>
        <div v-if="!auth">
          <router-link class="btn btn-sm btn-outline-primary mr-1"
                       to="/login">Sign In</router-link>
          <router-link class="btn btn-sm btn-primary"
                       to="/register">Sign up for free</router-link>
        </div>
        <div v-else>
          <button class="btn btn-sm btn-outline-primary"
                  @click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <main role="main"
          class="container">

      <div>
        <router-view />
      </div>

    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Auth from "@/services/Auth";

export default {
  name: "App",
  data: () => ({
    // auth: false
  }),
  computed: {
    ...mapGetters(["auth", "token"])
  },
  methods: {
    ...mapActions(["resetToken"]),
    logout() {
      Auth.logout()
        .then(res => {
          // console.log("res ", res);

          setTimeout(() => {
            this.$cookie.delete("token");
            localStorage.removeItem("rememberme");
            this.resetToken();
            this.$router.push({ name: "home" });
          }, 1000);
        })
        .catch(err => {
          // console.log("err :", err);
          // this.errors = err.response.data.errors;
          this.errors = err.message;
        });
    }
  }
};
</script>


<style>
</style>
