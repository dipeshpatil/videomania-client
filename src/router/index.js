import { createRouter, createWebHistory } from "vue-router";

import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";

import Home from "../components/Home.vue";
import Profile from "../components/Profile.vue";
import Videos from "../components/Videos.vue";
import Links from "../components/Links.vue";
import Upgrade from "../components/Upgrade.vue";

const routes = [
  { path: "/upgrade", name: "Upgrade", component: Upgrade },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/videos",
    name: "Videos",
    component: Videos,
    meta: { requiresAuth: true },
  },
  {
    path: "/links",
    name: "Links",
    component: Links,
    meta: { requiresAuth: true },
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check token existence
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
