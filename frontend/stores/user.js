import axios from "axios";
import CryptoJS from "crypto-js";
import { defineStore } from "pinia";

// store user logic
export const useUserStore = defineStore("userStore", {
  persist: {
    enabled: true,
  },
  state: () => ({
    user: {},
    token: "",
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
    logout() {
      this.$reset();
    },
  },
});
