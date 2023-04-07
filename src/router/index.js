import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../pages/Home.vue"),
  },
  {
    path: "/welcome",
    component: () => import("../pages/Welcome.vue"),
  },
];

export const createRouter = () =>
  _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory("/")
      : createWebHistory("/"),
    routes,
  });
