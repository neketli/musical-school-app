import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/index.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.config.globalProperties.$axios = axios;
const token = localStorage.getItem("token");
if (token) {
  app.config.globalProperties.$axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
}

app.mount("#app");
