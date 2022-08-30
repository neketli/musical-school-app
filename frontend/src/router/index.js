import { createRouter, createWebHistory } from "vue-router";
import { AuthView, HomeView, ErrorView } from "@/views";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/404",
      name: "error",
      component: ErrorView,
    },
  ],
});

export default router;
