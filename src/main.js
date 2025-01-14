import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);
router.push("/login");
app.mount("#app");
