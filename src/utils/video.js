import AxiosHelper from "../helpers/axios-helper";
import store from "../store";

const axios = new AxiosHelper("http://localhost:3000");

export async function getUserVideos(authToken) {
  try {
    const response = await axios.get(
      "/user/videos",
      {},
      { "x-auth-token": authToken || store.getters.getToken }
    );
    if (response.videos) {
      return { videos: response.videos, errors: null };
    } else {
      return { videos: [], errors: response.errors };
    }
  } catch (error) {
    return {
      videos: [],
      errors: "Error fetching user videos",
    };
  }
}
