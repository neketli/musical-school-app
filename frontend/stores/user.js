import axios from "axios";
import CryptoJS from "crypto-js";
import { defineStore } from "pinia";

// store user logic
export const useAuthUserStore = defineStore({
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    status: "",
  }),
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
  actions: {
    authSuccess({ user, token }) {
      this.status = "logged";
      this.user = user;
      this.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ login: user.login, role: user.role, rid: user.rid })
      );
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    async login(user) {
      this.status = "loading";

      try {
        const { data } = await axios.post(
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
        this.authSuccess(data);
      } catch (error) {
        this.status = "error";
      }
    },
    async logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      this.$reset();
    },
  },
});
