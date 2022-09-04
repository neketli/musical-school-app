import axios from "axios";

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
      if (user.login === user.password) {
        commit("authSuccess", { user, token: user.login });
        return;
      }
      commit("authRequest");
      try {
        const res = await axios({
          url: `${process.env.BASE_URL}/auth`,
          data: user,
          method: "POST",
        });
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
