import { useUserStore } from "~/stores/user";

export default function (to) {
  const store = useUserStore();
  if (!store.token && to.path !== "/auth") {
    return navigateTo(`/auth`);
  }
}
