import ApiClient from "./ApiClient";

export default class PandaApi {
  constructor() {
    this.apiClient = ApiClient.instance;
  }

  async getPanda() {
    return this.apiClient.get("/panda");
  }

  async feed(items) {
    return this.apiClient.post("/panda/feed", items);
  }
}
