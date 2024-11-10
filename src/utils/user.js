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

export async function getUserLinks(authToken) {
  try {
    const response = await axios.get(
      "/user/links",
      {},
      { "x-auth-token": authToken || store.getters.getToken }
    );

    if (response.links) {
      return { links: response.links, errors: null };
    } else {
      return { links: [], errors: response.errors };
    }
  } catch (error) {
    return {
      links: [],
      errors: "Error fetching user videos",
    };
  }
}

export async function getVideoURL(videoId, authToken) {
  try {
    const response = await axios.get(
      `/video/${videoId}`,
      {},
      { "x-auth-token": authToken || store.getters.getToken }
    );
    if (response.videoURL) {
      return {
        videoURL: response.videoURL,
        errors: null,
      };
    } else {
      return {
        videoURL: null,
        errors: "Error fetching video URL",
      };
    }
  } catch (error) {
    return {
      videoURL: null,
      errors: "Error fetching video URL",
    };
  }
}
