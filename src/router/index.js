// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

import ProtectedRoute from "../components/auth/ProtectedRoute.vue";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import Home from "../components/Home.vue";

const routes = [
  {
    path: "/",
    component: ProtectedRoute,
    children: [
      {
        path: "",
        component: Home, // Display the Home component if authenticated
      },
    ],
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
