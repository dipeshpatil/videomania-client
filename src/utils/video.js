import AxiosHelper from "../helpers/axios-helper";
import store from "../store";

const axios = new AxiosHelper("http://localhost:3000");

export async function uploadVideoDetails(file, authToken) {
  try {
    const response = await axios.post("/video/upload", file, {
      "x-auth-token": authToken || store.getters.getToken,
      "Content-Type": "multipart/form-data",
    });
    if (response.title) {
      return { errors: null, status: 200 };
    } else {
      return { errors: "Upload Error!", status: 400 };
    }
  } catch (error) {
    return {
      status: 400,
      errors: "Upload Error!",
    };
  }
}

export async function generateShareLink({ videoId, expiryTime }, authToken) {
  try {
    const response = await axios.post(
      `/video/share/${videoId}`,
      { expiryDuration: expiryTime },
      {
        "x-auth-token": authToken || store.getters.getToken,
      }
    );
    if (response.message.includes("generated successfully")) {
      const { message, url, expiresAt, link } = response;
      return { errors: null, status: 200, message, url, expiresAt, link };
    } else {
      return {
        errors: "Upload Error!",
        status: 400,
        message,
        url,
        expiresAt,
        link,
      };
    }
  } catch (error) {
    return {
      status: 400,
      errors: "Share Error!",
    };
  }
}

export async function renameVideoTitle({ videoId, videoName }, authToken) {
  try {
    const response = await axios.put(
      `/video/rename/${videoId}`,
      { videoName },
      {
        "x-auth-token": authToken || store.getters.getToken,
      }
    );
    if (response.msg.includes("Update Success")) {
      return {
        errors: null,
        status: 200,
      };
    } else {
      return {
        errors: response.error,
        status: 400,
      };
    }
  } catch (error) {
    return {
      status: 400,
      errors:
        "Rename Error!, Check if Video with the specified name already exists ",
    };
  }
}

export async function trimVideo({ startTime, endTime, videoId }, authToken) {
  try {
    const response = await axios.post(
      `/video/trim/${videoId}`,
      { start: startTime, end: endTime },
      {
        "x-auth-token": authToken || store.getters.getToken,
      }
    );
    if (response.title.includes("trim")) {
      return { ...response, status: 200 };
    } else {
      return {
        status: 400,
        errors: "Trim Error!",
      };
    }
  } catch (error) {
    return {
      status: 400,
      errors: "Trim Error!",
    };
  }
}
