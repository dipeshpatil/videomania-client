import AxiosHelper from "../helpers/axios-helper";
import store from "../store";

const axios = new AxiosHelper("http://localhost:3000");

export async function loginUserAndAuthenticateToken(email, password) {
  try {
    const response = await axios.post("/auth/login", { email, password }, {});
    if (response.token) {
      return { token: response.token, errors: null };
    } else {
      return { token: null, errors: response.errors };
    }
  } catch (error) {
    return {
      token: null,
      errors: { msg: "Invalid Credentials!" },
    };
  }
}

export async function getUserDetails(authToken) {
  try {
    const response = await axios.get(
      "/user",
      {},
      { "x-auth-token": authToken || store.getters.getToken }
    );
    if (response.user) {
      return { user: response.user, errors: null };
    } else {
      return { user: null, errors: response.errors };
    }
  } catch (error) {
    return {
      user: null,
      errors: "Error fetching user details",
    };
  }
}
