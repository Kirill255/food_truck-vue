<template>
  <div>
    <h2>Edit</h2>
    <router-link class="btn btn-sm btn-outline-primary"
                 :to="{ name: 'foodtruck' }">Назад</router-link>

    <div v-if="!isOldFoodtruckEmpty">
      <foodtruck :foodtruck="oldFoodtruck"></foodtruck>
    </div>

    <button class="btn btn-lg btn-outline-primary btn-block"
            type="submit"
            @click="editOneFoodtruck">Edit</button>
  </div>
</template>

<script>
import Foodtruck from "@/components/Foodtruck.vue";
import FoodtruckService from "@/services/FoodtruckService";

export default {
  name: "EditFoodtruck",
  components: { Foodtruck },
  data: () => ({
    oldFoodtruck: {}
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
    isOldFoodtruckEmpty() {
      return Object.keys(this.oldFoodtruck).length === 0;
    }
  },
  created() {
    this.getOneFoodtruck();
  },
  methods: {
    async getOneFoodtruck() {
      const response = await FoodtruckService.getFoodtruck(this.id);
      // console.log(response.data.foodtruck);
      this.oldFoodtruck = response.data.foodtruck;
    },
    async editOneFoodtruck() {
      if (this.oldFoodtruck) {
        await FoodtruckService.updateFoodtruck(this.id, this.oldFoodtruck)
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
