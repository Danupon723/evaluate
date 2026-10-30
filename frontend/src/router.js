import { createRouter, createWebHistory } from "vue-router";
import { state, logout } from "./api";

const admin = { role: "admin" };

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: () => import("./pages/loginPage.vue") },

  // ทุก role
  { path: "/password", component: () => import("./pages/PasswordPage.vue") },
  { path: "/profile", component: () => import("./pages/ProfilePage.vue") },

  // admin
  { path: "/dashbord", component: () => import("./pages/DashbordPage.vue"), meta: admin },
  { path: "/users", component: () => import("./pages/UsersPage.vue"), meta: admin },
  { path: "/periods", component: () => import("./pages/Preiods.vue"), meta: admin },
  { path: "/assign", component: () => import("./pages/AssignPage.vue"), meta: admin },
  { path: "/track", component: () => import("./pages/TrackPage.vue"), meta: admin },
  { path: "/backup", component: () => import("./pages/BackupPage.vue"), meta: admin },

  // evaluatee
  { path: "/self", component: () => import("./pages/SelfPage.vue"), meta: { role: "evaluatee" } },

  // evaluator
  { path: "/evaluate", component: () => import("./pages/EvalustePage.vue"), meta: { role: "evaluator" } },
];

const homes = { admin: "/dashbord", evaluatee: "/self", evaluator: "/evaluate" };

export const homeOf = (user) =>
  user.must_change_password ? "/password" : homes[user.role];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to) => {
  const { user } = state;
  const token = localStorage.getItem("token");

  if (!user || !token) {
    if (user || token) logout();
    return to.path === "/login" || "/login";
  }

  const home = homeOf(user);
  if (!home) return logout(), "/login";

  if (user.must_change_password && to.path !== "/password") return "/password";
  if (to.path === "/login" || (to.meta.role && to.meta.role !== user.role)) return home;
});

export default router;