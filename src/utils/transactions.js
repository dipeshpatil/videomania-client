import AxiosHelper from "../helpers/axios-helper";
import store from "../store";

const axios = new AxiosHelper("http://localhost:3000");

export async function getTransactions(authToken) {
  try {
    const response = await axios.get(
      "/user/transactions",
      {},
      { "x-auth-token": authToken || store.getters.getToken }
    );
    if (response.transactions) {
      return { error: null, transactions: response.transactions };
    } else {
      return {
        error: "Error getting transactions",
        transactions: [],
      };
    }
  } catch (error) {
    return {
      transactions: [],
      error: "Error getting transactions",
    };
  }
}
