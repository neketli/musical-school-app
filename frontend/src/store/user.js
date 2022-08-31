import axios from "axios";

// store user logic
export default {
  state: () => ({
    user: {},
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
    },
    authError(state) {
      state.status = "error";
    },
    logout(state) {
      state.user = {};
      state.token = "";
      state.status = "";
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, user) {
      if (user.login === user.password) {
        commit("authSuccess", { user, token: user.login });
        return;
      }
      commit("authRequest");
      try {
        const res = await axios({
          url: "http://localhost:3000/login",
          data: user,
          method: "POST",
        });
        commit("authSuccess", res.data);
      } catch (error) {
        commit("authError");
      }
    },
    logout({ commit }) {
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
