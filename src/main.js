import { createApp } from "vue";
import "./style.css";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import AppComposition from "./AppComposition.vue";
import router from "./router.js";

createApp(AppComposition)
    .use(createPinia().use(piniaPluginPersistedState))
    .use(router)
  .mount("#app");
