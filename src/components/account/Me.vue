<template>
  <div>
    Me
    <div v-if="me.id">
      <div>
        Me.id {{ me.id }}
      </div>
      <div>
        Me.iat {{ me.iat }}
      </div>
      <div>
        Me.exp {{ me.exp }}
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/services/Auth";

export default {
  name: "Me",
  data: () => ({
    me: {
      id: "",
      iat: "",
      exp: ""
    }
  }),
  created() {
    this.getMe();
  },
  methods: {
    async getMe() {
      await Auth.getMe()
        .then(res => {
          console.log("res ", res);

          this.me.id = res.data.id;
          this.me.iat = res.data.iat;
          this.me.exp = res.data.exp;

          // let token = res.data.token;

          // this.setToken(token);
          // this.$cookie.set("token", token);
          // api().defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // this.$router.push({ name: "foodtruck" });
        })
        .catch(err => {
          console.log("err :", err);
          // this.errors = err.response.data.errors;
          this.errors = err.message;
        });
    }
  }
};
</script>

<style scoped>
</style>
