import CryptoJS from "crypto-js";
import { defineStore } from "pinia";

// store user logic
export const useUserStore = defineStore("userStore", {
  persist: {
    storage: persistedState.localStorage,
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
      this.status = "success";
      this.user = user;
      this.token = token;
      const { $api } = useNuxtApp();
      $api.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    async login(user) {
      this.status = "loading";
      const { $api } = useNuxtApp();
      try {
        const { data } = await $api.post(`/login`, {
          ...user,
          password: CryptoJS.MD5(user.password).toString(),
        });
        this.authSuccess(data);
      } catch (error) {
        this.status = "error";
        console.error(error);
      }
    },
    logout() {
      this.$reset();
      const { $api } = useNuxtApp();
      delete $api.defaults.headers.common.Authorization;
    },
  },
});
