<template>
  <div>
    <h2>Add</h2>
    <router-link class="btn btn-sm btn-outline-primary"
                 :to="{ name: 'foodtruck' }">Назад</router-link>

    <foodtruck :foodtruck="newFoodtruck"></foodtruck>

    <button class="btn btn-lg btn-outline-primary btn-block"
            type="submit"
            @click="addPost">Add</button>
  </div>
</template>

<script>
import Foodtruck from "@/components/Foodtruck.vue";
import FoodtruckService from "@/services/FoodtruckService";

export default {
  name: "AddFoodtruck",
  components: { Foodtruck },
  data: () => ({
    newFoodtruck: {
      name: "",
      foodtype: "",
      avgcost: "",
      geometry: {
        coordinates: {
          latitude: "",
          longitude: ""
        }
      }
    }
  }),
  methods: {
    async addPost() {
      if (this.newFoodtruck) {
        await FoodtruckService.addFoodtruck(this.newFoodtruck)
          .then(res => {
            // console.log("res ", res);
            this.$router.push({ name: "foodtruck" });
          })
          .catch(err => {
            // console.log("err :", err.response);
            this.errors = err.response.data.errors;
          });
      } else {
        alert("Empty fields!");
      }
    }
  }
};
</script>

<style scoped>
</style>
