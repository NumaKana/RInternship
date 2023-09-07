import ApiClient from "./ApiClient";

export default class FoodApi {
  constructor() {
    this.apiClient = ApiClient.instance;
  }

  async registerFood(food) {
    return this.apiClient.post("/foods/", food);
  }

  async getFoods() {
    return this.apiClient.get("/foods/");
  }

  async consumeFood(id) {
    return this.apiClient.post(`/foods/${id}/`);
  }

  async editFood(id, food) {
    return this.apiClient.put(`/foods/${id}/`, food);
  }

  async deleteFood(id) {
    return this.apiClient.delete(`/foods/${id}/`);
  }
}
