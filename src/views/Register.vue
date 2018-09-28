<template>
  <div>
    <h1>Register page</h1>
    <div v-if=message>{{message}}</div>

    <form class="form-sign"
          @submit.prevent="createAccount">
      <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
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

      <button class="btn btn-lg btn-primary btn-block"
              type="submit">Sign up</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>

  </div>
</template>

<script>
import Auth from "@/services/Auth";

export default {
  name: "Register",
  data: () => ({
    account: {
      email: "",
      password: ""
    },
    message: ""
  }),
  methods: {
    async createAccount() {
      // console.log("object :", this.account);
      await Auth.registering(this.account)
        .then(res => {
          console.log("res ", res);
          this.message = res.data.message;

          setTimeout(() => {
            this.account.email = "";
            this.account.password = "";
            this.message = "";

            this.$router.push({ name: "login" });
          }, 1000);
        })
        .catch(err => {
          console.log("err :", err.response);
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>

<style scoped>
</style>
