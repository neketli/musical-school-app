import { createRouter, createWebHistory } from "vue-router";
import { AuthView, HomeView, SetupView, ErrorView } from "@/views";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
      meta: {
        notAuthorized: true,
      },
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/setup",
      name: "setup",
      component: SetupView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/404",
      name: "error",
      component: ErrorView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLogged) {
      to.path === "/auth" ? next("/") : next();
      return;
    }
    next("/auth");
  } else {
    if (to.matched.length === 0) {
      next("/404");
    }
    next();
  }
});

export default router;
