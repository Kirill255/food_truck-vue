<template>
  <div>
    <div v-if="foodtruck">
      <h2>OneFoodtruck id {{ id }}</h2>
      <router-link class="btn btn-sm btn-outline-primary"
                   :to="{ name: 'foodtruck' }">Назад</router-link>

      <div>
        <h3>Name: {{foodtruck.name}}</h3>
        <p>Foodtype: {{foodtruck.foodtype}}</p>
        <p>Avgcost: {{foodtruck.avgcost}}</p>
        <p>Geometry type: {{foodtruck.geometry.type}}</p>
        <p>Coordinates: ( {{foodtruck.geometry.coordinates.latitude}};{{foodtruck.geometry.coordinates.longitude}} )</p>
        <p>Created_date: {{foodtruck.created_date}}</p>
        <h4>Отзывы:</h4>

        <div v-if="reviews.length">
          <div v-for="(review, index) in reviews"
               :key="index">
            <p>{{ review.created_date }}</p>
            <h3>{{ review.title }}</h3>
            <p>{{ review.message }}</p>
            <hr>
          </div>
          </div>
          <div v-else>
            <p>Нет отзывов</p>
          </div>
        </div>

        <div>
          <form @submit.prevent="addReview"
                class="form-sign">
            <h4 class="h4 mb-3 font-weight-normal">Добавить отзыв:</h4>
            <div class="form-group">
              <label for="inputTitle">Review title</label>
              <input type="text"
                   class="form-control"
                   id="inputTitle"
                   placeholder="Enter title"
                   v-model="review.title"
                   required>
          </div>
              <div class="form-group">
                <label for="textareaMessage">Review message</label>
                <textarea class="form-control"
                          id="textareaMessage"
                          placeholder="Enter message"
                          rows="3"
                          v-model="review.message"
                          required></textarea>
              </div>
              <button type="submit"
                      class="btn btn-primary">Add</button>
          </form>
        </div>

      </div>
      <div v-else>
        <p>Нет записи</p>
      </div>

    </div>
</template>

<script>
import FoodtruckService from "@/services/FoodtruckService";
import ReviewService from "@/services/ReviewService";

export default {
  name: "OneFoodtruck",
  props: ["id"],
  data: () => ({
    foodtruck: null,
    reviews: [],
    review: {
      title: "",
      message: ""
    }
  }),
  methods: {
    async getFoodtruck() {
      const response = await FoodtruckService.getFoodtruck(this.id);
      // console.log("foodtruck :", response.data.foodtruck);
      this.foodtruck = response.data.foodtruck;
    },
    async getReview() {
      const response = await ReviewService.getReview(this.id);
      // console.log("reviews :", response.data.reviews);
      this.reviews = response.data.reviews;
    },
    async addReview() {
      if (this.review) {
        await ReviewService.addReview(this.id, this.review)
          .then(res => {
            // console.log("res ", res);
            this.review.title = "";
            this.review.message = "";

            this.getFoodtruck();
            this.getReview();
          })
          .catch(err => {
            // console.log("err :", err.response);
            this.errors = err.response.data.errors;
          });
      } else {
        alert("Empty fields!");
      }
    }
  },
  mounted() {
    this.getFoodtruck();
    this.getReview();
  }
};
</script>

<style scoped>
</style>
