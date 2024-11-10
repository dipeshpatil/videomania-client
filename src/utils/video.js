import AxiosHelper from "../helpers/axios-helper";
import store from "../store";

const axios = new AxiosHelper("http://localhost:3000");

export async function uploadVideoDetails(file, authToken) {
  console.log(file);

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
