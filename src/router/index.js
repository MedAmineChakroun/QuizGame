import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

// Define routes
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/lobby",
    name: "lobby",
    component: () => import(/* webpackChunkName: "lobby" */ "../views/LobbyView.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import(/* webpackChunkName: "categories" */ "../views/CategoriesView.vue"),
  },
  {
    path: "/game",
    name: "game",
    component: () => import(/* webpackChunkName: "game" */ "../views/GameView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import(/* webpackChunkName: "settings" */ "../views/SettingsView.vue"),
  },
  {
    path: "/profil",
    name: "profil",
    component: () => import(/* webpackChunkName: "profil" */ "../views/PlayerProfilView.vue"),
  }
];

// Create router instance
const router = createRouter({
  history: createWebHashHistory(), // Using hash mode for history
  routes,
});

export default router;
