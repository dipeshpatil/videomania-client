import axios from "axios";

class AxiosHelper {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // GET request
  async get(url, params = {}, headers = {}) {
    try {
      const response = await this.client.get(url, { params, headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // POST request
  async post(url, data = {}, headers = {}) {
    try {
      const response = await this.client.post(url, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // PUT request
  async put(url, data = {}, headers = {}) {
    try {
      const response = await this.client.put(url, data, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // DELETE request
  async delete(url, headers = {}) {
    try {
      const response = await this.client.delete(url, { headers });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Handle error
  handleError(error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Error Response:", error.response.data);
      console.error("Error Status:", error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error:", error.message);
    }
  }
}

export default AxiosHelper;
