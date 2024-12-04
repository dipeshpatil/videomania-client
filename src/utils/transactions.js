import AxiosHelper from "../helpers/axios-helper";
import store from "../store";

const axios = new AxiosHelper("http://localhost:3000");

export async function getTransactions(options = {}, authToken) {
  try {
    const { limit, pageNumber } = options;
    const response = await axios.get(
      limit && pageNumber
        ? `/user/transactions?limit=${limit}&pageNumber=${pageNumber}`
        : "/user/transactions",
      {},
      { "x-auth-token": authToken || store.getters.getToken }
    );
    if (response.transactions) {
      return {
        error: null,
        transactions: response.transactions,
        itemCount: response.itemCount,
      };
    } else {
      return {
        error: "Error getting transactions",
        transactions: [],
        itemCount: 0,
      };
    }
  } catch (error) {
    return {
      transactions: [],
      error: "Error getting transactions",
      itemCount: 0,
    };
  }
}
