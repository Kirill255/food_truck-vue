import { api } from "@/services/Api";

export default {
  fetchFoodtruck() {
    return api.get("api/foodtruck");
  },

  addFoodtruck(params) {
    return api.post("api/foodtruck", params);
  },

  getFoodtruck(id) {
    return api.get("api/foodtruck/" + id);
  },

  updateFoodtruck(id, params) {
    return api.put("api/foodtruck/" + id, params);
  },

  deleteFoodtruck(id) {
    return api.delete("api/foodtruck/" + id);
  }
};
