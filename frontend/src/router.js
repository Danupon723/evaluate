import { createRouter, createWebHistory } from "vue-router";
import { state, logout } from "./api";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: () => import("./pages/loginPage.vue") },

  //admin
  {path:'/dashbord' , component:()=> import('./pages/DashbordPage.vue')},
  {path:'/usres' , component:()=> import('./pages/UsersPage.vue')},
  {path:'/periods' , component:()=> import('./pages/Preiods.vue')},
  {path:'/assign' , component:()=> import('./pages/AssignPage.vue')},
  {path:'/track' , component:() => import('./pages/TrackPage.vue')},
  {path:'/backup' , component:() => import('./pages/BackupPage.vue')},

  //evaluatee
  {path:'/self' , component:() => import('./pages/SelfPage.vue')},
  //evaluator
  {path:'/evaluate' , component:() => import('./pages/EvalustePage.vue')},
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