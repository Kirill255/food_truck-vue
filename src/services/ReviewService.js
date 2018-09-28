import { api } from "@/services/Api";

export default {
  getReview(id) {
    return api.get("api/foodtruck/rewiews/" + id);
  },

  addReview(id, body) {
    return api.post("api/foodtruck/rewiews/" + id, body);
  }
};
