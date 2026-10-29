import { createRouter, createWebHistory } from "vue-router";
import { state } from "./api";

const routes = [
  { path: "/login", component: () => import("./pages/loginPage.vue") },
//   { path: "/password", component: () => import("./pages/passwordPage.vue") },
//   { path: "/dashbord", component: () => import("./pages/dashboardPage.vue"), meta: { role: "admin" } },
//   { path: "/self", component: () => import("./pages/selfPage.vue"), meta: { role: "evaluatee" } },
//   { path: "/evaluate", component: () => import("./pages/evaluatePage.vue"), meta: { role: "evaluator" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function homeOf(user) {
  if (user.must_change_password) return "/password";
  return { admin: "/dashbord", evaluatee: "/self", evaluator: "/evaluate" }[user.role];
}

router.beforeEach((to) => {
  const user = state.user;
  if (!user) return to.path === "/login" ? true : "/login";
  if (user.must_change_password && to.path !== "/password") return "/password";
  if (to.path === "/login") return homeOf(user);
  if (to.meta.role && to.meta.role !== user.role) return homeOf(user);
  return true;
});

export default router;