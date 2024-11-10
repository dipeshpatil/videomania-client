import AxiosHelper from "../helpers/axios-helper";
import store from "../store";

const axios = new AxiosHelper("http://localhost:3000");

export async function generatePlanToken({ userId, planType }, authToken) {
  try {
    const response = await axios.post(
      "/plan/generate",
      { userId, planType },
      { "x-auth-token": authToken || store.getters.getToken }
    );
    if (response.token) {
      return { msg: response.msg, token: response.token };
    } else {
      return { msg: null, error: "Error generating token", token: null };
    }
  } catch (error) {
    return {
      msg: "",
      error: "Error generating token",
      token: null,
    };
  }
}

export async function commitPlanPurchaseTransaction({ token }, authToken) {
  try {
    const response = await axios.post(
      "/plan/commit",
      { token },
      { "x-auth-token": authToken || store.getters.getToken }
    );
    if (response.msg === "Transaction Successful!") {
      return { msg: response.msg, status: "PLAN_PURCHASE_OK" };
    } else {
      return {
        msg: null,
        error: "Error generating token",
        status: "PLAN_PURCHASE_ERROR",
      };
    }
  } catch (error) {
    return {
      msg: "",
      status: "PLAN_PURCHASE_ERROR",
      error: "Error generating token",
    };
  }
}
