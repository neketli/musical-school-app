import axios from "axios";
export default defineNuxtPlugin(({ $config }) => {
  const api = axios.create({
    baseURL: $config.public.API_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return {
    provide: {
      api,
    },
  };
});
