import axios from "axios";
import CryptoJS from "crypto-js";

// store user logic
export default {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    status: "",
  }),
  mutations: {
    authRequest(state) {
      state.status = "loading";
    },
    authSuccess(state, { user, token }) {
      state.status = "logged";
      state.user = user;
      state.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ login: user.login, user_group: user.user_group })
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    authError(state) {
      state.status = "error";
    },
    logout(state) {
      state.user = {};
      state.token = "";
      state.status = "";
    },
  },
  actions: {
    async login({ commit }, user) {
      commit("authRequest");
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/login`,
          {
            ...user,
            password: CryptoJS.MD5(user.password).toString(),
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        commit("authSuccess", res.data);
      } catch (error) {
        commit("authError");
      }
    },
    async logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      commit("logout");
    },
  },
  getters: {
    getUserInfo(state) {
      return state.user;
    },
    getStatus(state) {
      return state.status;
    },
    isLogged(state) {
      return !!state.token;
    },
  },
};
