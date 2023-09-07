import axios from "axios";

class ApiClient {
  constructor() {
    this.baseUrl = "http://localhost:8000";
  }

  async get(path) {
    const url = this.baseUrl + path;
    const response = await axios.get(url);
    return response.data;
  }

  async post(path, data) {
    const url = this.baseUrl + path;
    const response = await axios.post(url, data);
    return response.data;
  }

  async delete(path) {
    const url = this.baseUrl + path;
    const response = await axios.delete(url);
    return response.data;
  }

  async put(path, data) {
    const url = this.baseUrl + path;
    const response = await axios.put(url, data);
    return response.data;
  }
}

ApiClient.instance = new ApiClient();
export default ApiClient;
