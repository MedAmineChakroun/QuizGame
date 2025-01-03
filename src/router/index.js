import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

// Define routes
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/lobby",
    name: "lobby",
    component: () =>
      import(/* webpackChunkName: "lobby" */ "../views/LobbyView.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () =>
      import(
        /* webpackChunkName: "categories" */ "../views/CategoriesView.vue"
      ),
  },
  {
    path: "/game/:partieId",
    name: "game",
    component: () =>
      import(/* webpackChunkName: "game" */ "../views/GameView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/SettingsView.vue"),
  },
  {
    path: "/profil",
    name: "profil",
    component: () =>
      import(/* webpackChunkName: "profil" */ "../views/PlayerProfilView.vue"),
  },
  {
    path: "/shop",
    name: "shop",
    component: () =>
      import(/* webpackChunkName: "shop" */ "../views/ShopView.vue"),
  },
  {
    path: "/victory",
    name: "victory",
    component: () =>
      import(/* webpackChunkName: "victory" */ "../views/victoryView.vue"),
  },
  {
    path: "/defeat",
    name: "defeat",
    component: () =>
      import(/* webpackChunkName: "defeat" */ "../views/LosingView.vue"),
  },
];

// Create router instance
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
