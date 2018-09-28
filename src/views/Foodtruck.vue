<template>
  <div>
    <h1>Foodtrucks List</h1>
    <router-link v-if="auth"
                 class="btn btn-sm btn-outline-primary"
                 :to="{ name: 'addFoodtruck' }">Add foodtruck</router-link>
    <div v-if="foodtrucks.length">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">foodtype</th>
            <th scope="col">avgcost</th>
            <th scope="col">coordinates</th>
            <th scope="col">reviews</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(foodtruck, index) in foodtrucks"
              :key="index">
            <th>
              <router-link class=""
                           :to="{ name: 'oneFoodtruck', params: { id: foodtruck._id } }">{{foodtruck._id}}</router-link>
            </th>
            <td>{{foodtruck.name}}</td>
            <td>{{foodtruck.foodtype}}</td>
            <td>{{foodtruck.avgcost}}</td>
            <td>( {{foodtruck.geometry.coordinates.latitude}};{{foodtruck.geometry.coordinates.longitude}} )</td>
            <td>
              <router-link class=""
                           :to="{ name: 'reviews', params: { id: foodtruck._id } }">Отзывы</router-link>
            </td>
            <td>
              <template v-if="auth">
                <router-link class="btn btn-sm btn-outline-primary"
                             :to="{ name: 'editFoodtruck', params: { id: foodtruck._id } }">Edit</router-link>

                <button class="btn btn-sm btn-outline-primary"
                        type="button"
                        @click="deleteFoodtruck(foodtruck._id)">Del</button>
              </template>
              <template v-else>
                <router-link :to="{name:'login' }">Sign In</router-link>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Нет записей</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FoodtruckService from "@/services/FoodtruckService";

export default {
  name: "Foodtruck",
  data: () => ({
    foodtrucks: []
  }),
  created() {
    this.getAllFoodtruck();
  },
  computed: {
    ...mapGetters(["auth"])
  },
  methods: {
    async getAllFoodtruck() {
      const response = await FoodtruckService.fetchFoodtruck();
      // console.log("response :", response);
      console.log("foodtrucks :", response.data.foodtrucks);
      this.foodtrucks = response.data.foodtrucks;
    },
    async deleteFoodtruck(id) {
      const confirmed = confirm("Are you sure?");
      if (!confirmed) return;
      await FoodtruckService.deleteFoodtruck(id)
        .then(res => {
          this.getAllFoodtruck();
        })
        .catch(err => {
          // console.log("err :", err.response);
          this.errors = err.response.data.errors;
        });
    }
  }
};
</script>

<style scoped>
</style>
