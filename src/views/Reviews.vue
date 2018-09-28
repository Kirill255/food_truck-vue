<template>
  <div>
    <h2>Reviews {{ id }}</h2>
    <router-link class="btn btn-sm btn-outline-primary"
                 :to="{ name: 'foodtruck' }">Назад</router-link>

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
</template>

<script>
import ReviewService from "@/services/ReviewService";

export default {
  name: "Reviews",
  props: ["id"],
  data: () => ({
    reviews: []
  }),
  methods: {
    async getReview() {
      const response = await ReviewService.getReview(this.id);
      // console.log("reviews :", response.data.reviews);
      this.reviews = response.data.reviews;
    }
  },
  mounted() {
    this.getReview();
  }
};
</script>

<style scoped>
</style>
