import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const localData = JSON.parse(localStorage.getItem("vuex"));

const store = createStore({
  state: {
    token: localData.token || null,
    user: localData.user || null,
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem("token", token);
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
    setUser(state, user) {
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  actions: {
    saveToken({ commit }, token) {
      commit("setToken", token);
    },
    logout({ commit }) {
      commit("clearToken");
      commit("clearUser");
    },
    saveUser({ commit }, user) {
      commit("setUser", user);
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getUser: (state) => state.user,
  },
  plugins: [
    createPersistedState(), // Enable persisted state
  ],
});

export default store;
