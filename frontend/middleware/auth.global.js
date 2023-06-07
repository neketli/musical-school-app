import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return;
  const { token } = useUserStore();
  const { $api } = useNuxtApp();

  if (process.client && !token && to.path !== "/auth") {
    return navigateTo(`/auth`);
  }
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
});
